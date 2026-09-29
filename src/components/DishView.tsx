"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, PencilLine } from "lucide-react";
import PhotoCreditLine from "./PhotoCreditLine";
import ReviewCard from "./ReviewCard";
import { StarRating } from "./StarRating";
import Toast from "./Toast";
import { ratingFor, reviewsForDish } from "@/lib/data";
import { courseLabel, formatPrice, formatRating, reviewCountLabel } from "@/lib/format";
import type { Dish, Restaurant } from "@/lib/types";
import { useReviews } from "@/lib/useReviews";

// Drop ?posted=1 so a refresh doesn't show the toast again.
const clearPostedParam = () => window.history.replaceState(null, "", window.location.pathname);

export default function DishView({
  dish,
  restaurant,
  justPosted,
}: {
  dish: Dish;
  restaurant: Restaurant;
  justPosted: boolean;
}) {
  const allReviews = useReviews();
  const reviews = reviewsForDish(allReviews, dish.id);
  const rating = ratingFor(allReviews, dish.id);
  const photos = [dish.imageUrl, ...reviews.flatMap((r) => (r.photoUrl ? [r.photoUrl] : []))];
  const [selected, setSelected] = useState(0);
  const selectedIndex = selected < photos.length ? selected : 0;
  const mainPhoto = photos[selectedIndex];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {justPosted && <Toast message="Review posted! Thanks for sharing." onDone={clearPostedParam} />}

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/restaurants" className="hover:text-brand">Restaurants</Link>
        <ChevronRight size={14} />
        <Link href={`/restaurants/${restaurant.id}`} className="hover:text-brand">{restaurant.name}</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-ink">{dish.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Photos */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-band">
            <Image
              src={mainPhoto}
              alt={dish.name}
              fill
              priority
              unoptimized={mainPhoto.startsWith("data:")}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          {photos.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {photos.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 ${
                    i === selectedIndex ? "border-brand" : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill unoptimized={src.startsWith("data:")} sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <p className="mt-2 text-xs text-muted">
            {selectedIndex === 0 && dish.photoCredit ? (
              <PhotoCreditLine credit={dish.photoCredit} />
            ) : (
              "Diner photo"
            )}
            {photos.length > 1 && ` · ${photos.length} photos`}
          </p>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-bold tracking-wider text-brand uppercase">{courseLabel[dish.course]}</p>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{dish.name}</h1>
          <p className="mt-1 text-muted">
            at{" "}
            <Link href={`/restaurants/${restaurant.id}`} className="font-semibold text-ink underline-offset-2 hover:text-brand hover:underline">
              {restaurant.name}
            </Link>{" "}
            · {restaurant.city}
            {dish.price !== undefined && <> · about {formatPrice(dish.price)}</>}
          </p>
          <p className="mt-4 leading-relaxed">{dish.description}</p>

          <div className="mt-6 rounded-lg border border-line p-5">
            {rating.count === 0 ? (
              <p className="text-sm text-muted">No reviews yet. Be the first to rate this dish!</p>
            ) : (
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-5xl font-extrabold">{formatRating(rating.avg)}</p>
                  <StarRating value={rating.avg} size={16} />
                  <p className="mt-1 text-xs text-muted">{reviewCountLabel(rating.count)}</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((n) => {
                    const c = reviews.filter((r) => r.rating === n).length;
                    return (
                      <div key={n} className="flex items-center gap-2 text-xs">
                        <span className="w-2 font-semibold">{n}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-band">
                          <div className="h-full rounded-full bg-brand" style={{ width: `${(c / rating.count) * 100}%` }} />
                        </div>
                        <span className="w-4 text-right text-muted">{c}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <Link
              href={`/dishes/${dish.id}/review`}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand font-bold text-white transition-colors hover:bg-brand-dark"
            >
              <PencilLine size={18} /> Write a review
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-12 mb-12">
        <h2 className="border-b border-line pb-3 text-xl font-extrabold">
          What diners are saying {reviews.length > 0 && <span className="text-muted">({reviews.length})</span>}
        </h2>
        {reviews.length === 0 ? (
          <p className="py-8 text-muted">Nobody has reviewed this dish yet.</p>
        ) : (
          <div className="divide-y divide-line">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
