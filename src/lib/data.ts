// The only module that knows where data lives. Restaurants and dishes come from the
// seed file; reviews are seed reviews plus whatever the user posted (localStorage).
// Swapping to a real backend later means rewriting this file, not the pages.
import { dishes, restaurants, seedReviews } from "@/data/seed";
import type { Dish, NewReview, Rating, Restaurant, Review } from "./types";

const STORAGE_KEY = "dishup.reviews";

const norm = (s: string) => s.toLowerCase().trim();

// ---------- Restaurants & dishes ----------

export const CITIES = [...new Set(restaurants.map((r) => r.city))].sort();

export function getRestaurants({ city, query }: { city?: string; query?: string } = {}): Restaurant[] {
  const q = norm(query ?? "");
  return restaurants.filter(
    (r) =>
      (!city || r.city === city) &&
      (!q ||
        norm(r.name).includes(q) ||
        norm(r.cuisine).includes(q) ||
        getRestaurantDishes(r.id).some((d) => norm(d.name).includes(q))),
  );
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

export function searchDishes(query: string, city?: string): Dish[] {
  const q = norm(query);
  if (!q) return [];
  return dishes.filter(
    (d) => norm(d.name).includes(q) && (!city || getRestaurant(d.restaurantId)?.city === city),
  );
}

// ---------- Reviews ----------

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedReviews: Review[] = seedReviews;

function readStoredRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** All reviews (posted + seed). Returns the same array until storage changes. */
export function getReviewsSnapshot(): Review[] {
  const raw = readStoredRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    let stored: Review[] = [];
    try {
      stored = raw ? JSON.parse(raw) : [];
    } catch {
      stored = [];
    }
    cachedReviews = [...stored, ...seedReviews];
  }
  return cachedReviews;
}

/** What the server renders before the browser's saved reviews are available. */
export function getServerReviewsSnapshot(): Review[] {
  return seedReviews;
}

export function subscribeToReviews(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function addReview(input: NewReview): Review {
  const review: Review = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  let stored: Review[] = [];
  try {
    stored = JSON.parse(readStoredRaw() ?? "[]");
  } catch {
    stored = [];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([review, ...stored]));
  } catch {
    throw new Error("Couldn't save your review. Your browser storage may be full, so try a smaller photo.");
  }
  listeners.forEach((l) => l());
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
