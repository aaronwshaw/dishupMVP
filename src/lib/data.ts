// The only module that knows where data lives. Restaurants and dishes come from the
// seed file; reviews come from Supabase (or localStorage when it isn't configured).
// Pages never talk to storage directly, only to the functions here.
import { captureException } from "@sentry/nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import { dishes, restaurants, seedReviews } from "@/data/seed";
import { closestWord, indexWords, matchesAll, matchesAny, parseQuery } from "./search";
import { fetchReviews, getSupabase, insertReview } from "./reviewsRemote";
import { validateReview } from "./validation";
import type { Dish, NewReview, Rating, Restaurant, Review } from "./types";

const STORAGE_KEY = "dishup.reviews";

// Extra words people use for each cuisine, so "curry" finds Bombay House and
// "korean bbq" finds Cupbop.
const CUISINE_ALIASES: Record<string, string> = {
  Indian: "curry naan masala vegetarian",
  Japanese: "ramen noodle soup asian",
  "Native American": "southwestern navajo frybread taco",
  "Hot Dogs": "hotdog sausage",
  Burgers: "burger american fries sandwich",
  Korean: "bbq asian rice bowl noodle",
  BBQ: "bbq smoked brisket ribs",
  Hawaiian: "island polynesian plate lunch",
  "Pizza & Italian": "pizza pasta italian",
};
const STYLE_WORDS = { fast: "fast food quick", casual: "sit down casual", fine: "fine dining fancy" } as const;

const restaurantIndex = new Map(
  restaurants.map((r) => [
    r.id,
    indexWords(
      r.name, r.cuisine, r.city, r.neighborhood, r.description, CUISINE_ALIASES[r.cuisine] ?? "", STYLE_WORDS[r.style],
      ...dishes.filter((d) => d.restaurantId === r.id).flatMap((d) => [d.name, d.course]),
    ),
  ]),
);

const dishIndex = new Map(
  dishes.map((d) => {
    const r = restaurants.find((x) => x.id === d.restaurantId)!;
    return [d.id, indexWords(d.name, d.description, d.course, r.name, r.city, r.cuisine, CUISINE_ALIASES[r.cuisine] ?? "")];
  }),
);

// Words worth suggesting for typos: names and cuisines, not description filler.
const VOCABULARY = indexWords(
  ...restaurants.flatMap((r) => [r.name, r.cuisine, r.city, CUISINE_ALIASES[r.cuisine] ?? ""]),
  ...dishes.map((d) => d.name),
);

const isCheapRestaurant = (r: Restaurant) => r.priceLevel === 1;
const isCheapDish = (d: Dish) => (d.price !== undefined ? d.price <= 10 : getRestaurant(d.restaurantId)?.priceLevel === 1);

// ---------- Restaurants & dishes ----------

export const CITIES = [...new Set(restaurants.map((r) => r.city))].sort();

export interface RestaurantSearch {
  restaurants: Restaurant[];
  /** True when nothing matched every word, so these match only some of them. */
  approximate: boolean;
}

export function searchRestaurants({ city, query }: { city?: string; query?: string } = {}): RestaurantSearch {
  const { tokens, cheap } = parseQuery(query ?? "");
  const pool = restaurants.filter((r) => (!city || r.city === city) && (!cheap || isCheapRestaurant(r)));
  if (tokens.length === 0) return { restaurants: pool, approximate: false };
  const exact = pool.filter((r) => matchesAll(restaurantIndex.get(r.id)!, tokens));
  if (exact.length > 0) return { restaurants: exact, approximate: false };
  // Nothing matched everything: loosen up ("cheap tacos" still shows the taco place).
  const loose = restaurants.filter(
    (r) => (!city || r.city === city) && matchesAny(restaurantIndex.get(r.id)!, tokens),
  );
  return { restaurants: loose, approximate: loose.length > 0 };
}

export function getRestaurants(filters: { city?: string; query?: string } = {}): Restaurant[] {
  return searchRestaurants(filters).restaurants;
}

export function getRestaurant(id: string): Restaurant | undefined {
  return restaurants.find((r) => r.id === id);
}

export function getRestaurantDishes(restaurantId: string): Dish[] {
  return dishes.filter((d) => d.restaurantId === restaurantId);
}

export function getDish(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id);
}

export function getAllDishes(): Dish[] {
  return dishes;
}

/** Whether a dish matches a search, using the same rules as the main search. */
export function dishMatches(dish: Dish, query: string): boolean {
  const { tokens, cheap } = parseQuery(query);
  return (!cheap || isCheapDish(dish)) && matchesAll(dishIndex.get(dish.id)!, tokens);
}

export function searchDishes(query: string, city?: string): Dish[] {
  const { tokens, cheap } = parseQuery(query);
  if (tokens.length === 0 && !cheap) return [];
  return dishes.filter((d) => dishMatches(d, query) && (!city || getRestaurant(d.restaurantId)?.city === city));
}

/** A corrected query for likely typos ("ramn" → "ramen"), or undefined if none. */
export function suggestQuery(query: string): string | undefined {
  const { tokens } = parseQuery(query);
  let changed = false;
  const fixed = tokens.map((t) => {
    if (VOCABULARY.some((w) => w.startsWith(t))) return t;
    const close = closestWord(t, VOCABULARY);
    if (close) changed = true;
    return close ?? t;
  });
  return changed ? fixed.join(" ") : undefined;
}

/** Cuisines to offer when a search comes up empty. */
export const CUISINES = [...new Set(restaurants.map((r) => r.cuisine))];

// ---------- Reviews ----------
// With Supabase configured (production), reviews are shared by everyone and backed up.
// Without it (local dev, tests), each browser keeps its own reviews in localStorage.

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

// Supabase cache
let remoteReviews: Review[] = [];
let remoteSnapshot: Review[] = seedReviews;
let remoteStatus: "idle" | "loading" | "loaded" | "error" = "idle";

function setRemote(reviews: Review[]) {
  remoteReviews = reviews;
  remoteSnapshot = [...reviews, ...seedReviews];
}

async function loadRemote(db: SupabaseClient) {
  remoteStatus = "loading";
  try {
    setRemote(await fetchReviews(db));
    remoteStatus = "loaded";
  } catch (err) {
    // Keep showing the sample reviews; Sentry gets the details.
    remoteStatus = "error";
    captureException(err);
  }
  notify();
}

// localStorage cache
let cachedRaw: string | null | undefined;
let cachedReviews: Review[] = seedReviews;

function readStoredRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function readStored(): Review[] {
  try {
    const parsed: unknown = JSON.parse(readStoredRaw() ?? "[]");
    return Array.isArray(parsed) ? (parsed as Review[]) : [];
  } catch {
    return [];
  }
}

/** All reviews (posted + sample). Returns the same array until something changes. */
export function getReviewsSnapshot(): Review[] {
  if (getSupabase()) return remoteSnapshot;
  const raw = readStoredRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedReviews = [...readStored(), ...seedReviews];
  }
  return cachedReviews;
}

/** What the server renders before the browser has loaded posted reviews. */
export function getServerReviewsSnapshot(): Review[] {
  return seedReviews;
}

export function subscribeToReviews(listener: () => void): () => void {
  listeners.add(listener);
  const db = getSupabase();
  if (db) {
    if (remoteStatus === "idle" || remoteStatus === "error") void loadRemote(db);
    return () => listeners.delete(listener);
  }
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export async function addReview(input: NewReview): Promise<Review> {
  // Re-check at the boundary so no caller can save an invalid review.
  const checked = validateReview(input);
  if (!checked.ok) throw new Error(Object.values(checked.errors).join(" "));

  const db = getSupabase();
  if (db) {
    const saved = await insertReview(db, checked.review);
    setRemote([saved, ...remoteReviews]);
    notify();
    return saved;
  }

  const review: Review = { ...checked.review, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...readStored()]));
  } catch {
    throw new Error("Couldn't save your review. Your browser storage may be full, so try a smaller photo.");
  }
  notify();
  return review;
}

export function reviewsForDish(reviews: Review[], dishId: string): Review[] {
  return reviews
    .filter((r) => r.dishId === dishId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function average(list: Review[]): Rating {
  if (list.length === 0) return { avg: 0, count: 0 };
  const sum = list.reduce((s, r) => s + r.rating, 0);
  return { avg: sum / list.length, count: list.length };
}

export function ratingFor(reviews: Review[], dishId: string): Rating {
  return average(reviews.filter((r) => r.dishId === dishId));
}

export function restaurantRating(reviews: Review[], restaurantId: string): Rating {
  const ids = new Set(getRestaurantDishes(restaurantId).map((d) => d.id));
  return average(reviews.filter((r) => ids.has(r.dishId)));
}
