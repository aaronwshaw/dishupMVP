import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { priceLabel } from "@/lib/format";
import type { Rating, Restaurant } from "@/lib/types";
import RatingSummary from "./RatingSummary";

export default function RestaurantCard({
  restaurant,
  rating,
  dishCount,
}: {
  restaurant: Restaurant;
  rating: Rating;
  dishCount: number;
}) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="group overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-4">
        <h3 className="text-lg font-bold group-hover:text-brand">{restaurant.name}</h3>
        <RatingSummary rating={rating} />
        <p className="text-sm text-muted">
          {restaurant.cuisine} · {priceLabel(restaurant.priceLevel)} · {restaurant.city}
        </p>
        <p className="flex items-center gap-1 pt-1 text-xs font-semibold text-muted">
          <MapPin size={12} /> {restaurant.neighborhood} · {dishCount} dishes
        </p>
      </div>
    </Link>
  );
}
