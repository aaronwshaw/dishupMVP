"use client";

import { useState } from "react";
import DishCard from "./DishCard";
import EmptyState from "./EmptyState";
import PillGroup from "./PillGroup";
import RestaurantCard from "./RestaurantCard";
import SearchInput from "./SearchInput";
import {
  CITIES,
  getRestaurant,
  getRestaurantDishes,
  getRestaurants,
  ratingFor,
  restaurantRating,
  searchDishes,
} from "@/lib/data";
import { useReviews } from "@/lib/useReviews";

export default function RestaurantBrowser({
  initialCity,
  initialQuery,
}: {
  initialCity: string;
  initialQuery: string;
}) {
  const reviews = useReviews();
  const [city, setCity] = useState(CITIES.includes(initialCity) ? initialCity : "");
  const [query, setQuery] = useState(initialQuery);

  // Keep the URL in sync so results can be shared or refreshed.
  function update(next: { city?: string; query?: string }) {
    const c = next.city ?? city;
    const q = next.query ?? query;
    if (next.city !== undefined) setCity(c);
    if (next.query !== undefined) setQuery(q);
    const params = new URLSearchParams();
    if (c) params.set("city", c);
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `/restaurants?${qs}` : "/restaurants");
  }

  const results = getRestaurants({ city, query });
  const dishMatches = searchDishes(query, city || undefined);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">
        {city ? `Restaurants in ${city}` : "All restaurants"}
      </h1>

      <div className="mt-6 flex flex-col gap-4 rounded-lg border border-line bg-band p-4">
        <SearchInput
          label="Search restaurants"
          value={query}
          onChange={(v) => update({ query: v })}
          placeholder="Search by restaurant, cuisine or dish name"
        />
        <PillGroup
          label="Filter by location"
          value={city}
          onChange={(v) => update({ city: v })}
          options={[{ value: "", label: "All locations" }, ...CITIES.map((c) => ({ value: c, label: c }))]}
        />
      </div>

      <p className="mt-6 text-sm font-semibold text-muted">
        {results.length} {results.length === 1 ? "restaurant" : "restaurants"}
      </p>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No restaurants found"
            message="Try a different search term or choose another location."
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              rating={restaurantRating(reviews, r.id)}
              dishCount={getRestaurantDishes(r.id).length}
            />
          ))}
        </div>
      )}

      {dishMatches.length > 0 && (
        <section className="mt-12">
          <h2 className="border-b border-line pb-3 text-xl font-extrabold">
            Dishes matching &ldquo;{query.trim()}&rdquo;
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dishMatches.map((d) => (
              <DishCard
                key={d.id}
                dish={d}
                rating={ratingFor(reviews, d.id)}
                restaurantName={getRestaurant(d.restaurantId)?.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
