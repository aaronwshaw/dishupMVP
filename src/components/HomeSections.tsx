"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DishCard from "./DishCard";
import RestaurantCard from "./RestaurantCard";
import {
  getAllDishes,
  getRestaurant,
  getRestaurantDishes,
  getRestaurants,
  ratingFor,
  restaurantRating,
} from "@/lib/data";
import { useReviews } from "@/lib/useReviews";

export default function HomeSections() {
  const reviews = useReviews();

  const topDishes = getAllDishes()
    .map((dish) => ({ dish, rating: ratingFor(reviews, dish.id) }))
    .filter((d) => d.rating.count > 0)
    .sort((a, b) => b.rating.avg - a.rating.avg || b.rating.count - a.rating.count)
    .slice(0, 8);

  return (
    <>
      <section id="top-dishes" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <SectionHeading title="Top-rated dishes" subtitle="Highest-rated plates so far (includes sample reviews)" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topDishes.map(({ dish, rating }) => (
            <DishCard
              key={dish.id}
              dish={dish}
              rating={rating}
              restaurantName={getRestaurant(dish.restaurantId)?.name}
            />
          ))}
        </div>
      </section>

      <section className="bg-band">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <SectionHeading
            title="Restaurants"
            subtitle="Pick a spot, then find its best dish"
            href="/restaurants"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {getRestaurants().map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                rating={restaurantRating(reviews, r.id)}
                dishCount={getRestaurantDishes(r.id).length}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ title, subtitle, href }: { title: string; subtitle: string; href?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3">
      <div>
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <p className="text-sm text-muted">{subtitle}</p>
      </div>
      {href && (
        <Link href={href} className="flex shrink-0 items-center text-sm font-bold text-brand hover:underline">
          View all <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}
