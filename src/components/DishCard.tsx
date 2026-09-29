import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Dish, Rating } from "@/lib/types";
import RatingSummary from "./RatingSummary";

export default function DishCard({
  dish,
  rating,
  restaurantName,
}: {
  dish: Dish;
  rating: Rating;
  /** Shown when the card appears outside its restaurant's page. */
  restaurantName?: string;
}) {
  return (
    <Link
      href={`/dishes/${dish.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={dish.imageUrl}
          alt={dish.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold leading-snug group-hover:text-brand">{dish.name}</h3>
          {dish.price !== undefined && (
            <span className="shrink-0 text-sm font-semibold">{formatPrice(dish.price)}</span>
          )}
        </div>
        {restaurantName && <p className="text-sm text-muted">{restaurantName}</p>}
        <div className="mt-auto pt-1">
          <RatingSummary rating={rating} />
        </div>
      </div>
    </Link>
  );
}
