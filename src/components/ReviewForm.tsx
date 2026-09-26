"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhotoUpload from "./PhotoUpload";
import { StarInput } from "./StarRating";
import { addReview } from "@/lib/data";
import type { Dish, Restaurant } from "@/lib/types";

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

export default function ReviewForm({ dish, restaurant }: { dish: Dish; restaurant: Restaurant }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [authorName, setAuthorName] = useState("");
  const [errors, setErrors] = useState<{ rating?: string; text?: string; save?: string }>({});

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (rating === 0) next.rating = "Please choose a star rating.";
    if (text.trim().length < MIN_LENGTH) next.text = `Tell us a bit more (at least ${MIN_LENGTH} characters).`;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      addReview({
        dishId: dish.id,
        rating,
        text: text.trim(),
        photoUrl,
        authorName: authorName.trim() || "DishUp diner",
      });
    } catch (err) {
      setErrors({ save: (err as Error).message });
      return;
    }
    router.push(`/dishes/${dish.id}?posted=1`);
  }

  return (
    <div className="bg-band">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <form onSubmit={onSubmit} noValidate className="rounded-lg border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4 border-b border-line pb-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
              <Image src={dish.imageUrl} alt={dish.name} fill sizes="64px" className="object-cover" />
            </div>
            <div>
              <p className="text-sm text-muted">You&apos;re reviewing</p>
              <h1 className="text-xl font-extrabold">{dish.name}</h1>
              <p className="text-sm text-muted">{restaurant.name} · {restaurant.city}</p>
            </div>
          </div>

          <fieldset className="mt-6">
            <legend className="font-bold">How was it?</legend>
            <div className="mt-2">
              <StarInput
                value={rating}
                onChange={(v) => {
                  setRating(v);
                  setErrors((e) => ({ ...e, rating: undefined }));
                }}
              />
            </div>
            {errors.rating && <p className="mt-1 text-sm text-brand">{errors.rating}</p>}
          </fieldset>

          <div className="mt-6">
            <label htmlFor="review-text" className="font-bold">Your review</label>
            <textarea
              id="review-text"
              value={text}
              onChange={(e) => {
                const v = e.target.value.slice(0, MAX_LENGTH);
                setText(v);
                if (v.trim().length >= MIN_LENGTH) setErrors((prev) => ({ ...prev, text: undefined }));
              }}
              rows={5}
              placeholder="What did it taste like? Was it worth the price? Would you order it again?"
              className="mt-2 w-full rounded-md border border-line p-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
            <div className="flex justify-between text-xs">
              <span className="text-brand">{errors.text}</span>
              <span className="text-muted">{text.length}/{MAX_LENGTH}</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-bold">Add a photo <span className="font-normal text-muted">(optional)</span></p>
            <div className="mt-2">
              <PhotoUpload value={photoUrl} onChange={setPhotoUrl} />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="review-name" className="font-bold">
              Your name <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id="review-name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value.slice(0, 40))}
              placeholder="e.g. Alex S."
              className="mt-2 h-11 w-full rounded-md border border-line px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          {errors.save && <p className="mt-6 rounded-md bg-brand-soft p-3 text-sm text-brand-dark">{errors.save}</p>}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href={`/dishes/${dish.id}`}
              className="flex h-12 items-center justify-center rounded-md border border-line px-6 font-bold hover:bg-band"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="h-12 rounded-md bg-brand px-8 font-bold text-white transition-colors hover:bg-brand-dark"
            >
              Post review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
