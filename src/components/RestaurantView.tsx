"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, PencilLine, Tag, UtensilsCrossed } from "lucide-react";
import DishCard from "./DishCard";
import EmptyState from "./EmptyState";
import PillGroup from "./PillGroup";
import RatingSummary from "./RatingSummary";
import SearchInput from "./SearchInput";
import { ratingFor, restaurantRating } from "@/lib/data";
import { priceLabel } from "@/lib/format";
import type { Dish, Restaurant } from "@/lib/types";
import { useReviews } from "@/lib/useReviews";

const RATING_OPTIONS = [
  { value: 0, label: "All ratings" },
  { value: 3, label: "3★ & up" },
  { value: 4, label: "4★ & up" },
  { value: 4.5, label: "4.5★ & up" },
];

const STYLE_LABEL = { fast: "Fast food", casual: "Sit-down", fine: "Fine dining" } as const;

export default function RestaurantView({ restaurant, dishes }: { restaurant: Restaurant; dishes: Dish[] }) {
  const router = useRouter();
  const reviews = useReviews();
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [reviewDishId, setReviewDishId] = useState(dishes[0]?.id ?? "");

  const withRatings = dishes.map((dish) => ({ dish, rating: ratingFor(reviews, dish.id) }));
  const q = query.toLowerCase().trim();
  const visible = withRatings
    .filter(({ dish }) => !q || dish.name.toLowerCase().includes(q))
    .filter(({ rating }) => minRating === 0 || (rating.count > 0 && rating.avg >= minRating))
    .sort((a, b) => b.rating.avg - a.rating.avg);

  const banner = dishes.slice(0, 3);

  return (
    <div>
      {/* Photo banner */}
      <div className="grid h-56 grid-cols-3 gap-1 bg-hero sm:h-80">
        {banner.map((d, i) => (
          <div key={d.id} className={`relative ${i === 0 ? "col-span-3 sm:col-span-1" : "hidden sm:block"}`}>
            <Image src={d.imageUrl} alt={d.name} fill priority={i === 0} sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-t-lg bg-white pt-6 sm:-mt-10 sm:px-6">
          <nav className="mb-4 flex gap-6 border-b border-line text-sm font-bold">
            <a href="#dishes" className="border-b-2 border-brand pb-3 text-brand">Dishes</a>
            <a href="#about" className="border-b-2 border-transparent pb-3 hover:border-line">About</a>
          </nav>

          <h1 className="text-3xl font-extrabold sm:text-4xl">{restaurant.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <RatingSummary rating={restaurantRating(reviews, restaurant.id)} size={16} />
            <span className="flex items-center gap-1 text-muted"><UtensilsCrossed size={14} /> {restaurant.cuisine}</span>
            <span className="flex items-center gap-1 text-muted"><Tag size={14} /> {priceLabel(restaurant.priceLevel)} · {STYLE_LABEL[restaurant.style]}</span>
            <span className="flex items-center gap-1 text-muted"><MapPin size={14} /> {restaurant.neighborhood}, {restaurant.city}</span>
          </div>

          <section id="dishes" className="mt-8 scroll-mt-20">
            <h2 className="border-b border-line pb-3 text-xl font-extrabold">Dishes ({dishes.length})</h2>
            <div className="mt-4 flex flex-col gap-3">
              <SearchInput label="Search dishes" value={query} onChange={setQuery} placeholder={`Search dishes at ${restaurant.name}`} />
              <PillGroup label="Filter by rating" value={minRating} onChange={setMinRating} options={RATING_OPTIONS} />
            </div>
            <div className="mt-5">
              {visible.length === 0 ? (
                <EmptyState title="No dishes match" message="Try a different name or lower the rating filter." />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {visible.map(({ dish, rating }) => (
                    <DishCard key={dish.id} dish={dish} rating={rating} />
                  ))}
                </div>
              )}
            </div>
          </section>

          <section id="about" className="mt-12 mb-12 scroll-mt-20">
            <h2 className="border-b border-line pb-3 text-xl font-extrabold">About</h2>
            <p className="mt-4 leading-relaxed">{restaurant.description}</p>
            <p className="mt-4 rounded-md bg-band p-3 text-sm text-muted">
              DishUp is a class project and isn&apos;t affiliated with {restaurant.name}. The sample
              reviews here are placeholders, tuned so the average roughly matches this
              restaurant&apos;s public Yelp rating ({restaurant.yelpRating.toFixed(1)}★, Sept 2026).
              Dish photos are representative, and prices are approximate.
            </p>
          </section>
        </div>

        {/* Sidebar, like OpenTable's reservation card */}
        <aside className="mb-12 lg:mb-0">
          <div className="rounded-lg border border-line bg-white p-5 shadow-md lg:sticky lg:top-24 lg:mt-6">
            <h2 className="border-b border-line pb-3 text-center text-lg font-extrabold">Rate a dish here</h2>
            <label className="mt-4 block text-sm font-bold" htmlFor="review-dish">What did you order?</label>
            <select
              id="review-dish"
              value={reviewDishId}
              onChange={(e) => setReviewDishId(e.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-line bg-white px-3 text-sm outline-none focus:border-brand"
            >
              {dishes.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => router.push(`/dishes/${reviewDishId}/review`)}
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <PencilLine size={18} /> Write a review
            </button>
            <p className="mt-3 text-center text-xs text-muted">
              Reviews are about one dish, not the whole restaurant.{" "}
              <Link href="/restaurants" className="font-semibold text-brand hover:underline">Browse others</Link>
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
