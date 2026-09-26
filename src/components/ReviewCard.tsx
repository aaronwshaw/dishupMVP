import Image from "next/image";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/types";
import { StarRating } from "./StarRating";

const AVATAR_COLORS = ["bg-rose-600", "bg-sky-700", "bg-emerald-700", "bg-amber-600", "bg-violet-700", "bg-teal-700"];

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.authorName
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const color = AVATAR_COLORS[review.authorName.length % AVATAR_COLORS.length];

  return (
    <article className="flex gap-4 py-6">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}>
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <p className="font-bold">{review.authorName}</p>
          <p className="text-xs text-muted">{formatDate(review.createdAt)}</p>
        </div>
        <div className="mt-1">
          <StarRating value={review.rating} size={14} />
        </div>
        <p className="mt-2 leading-relaxed whitespace-pre-line">{review.text}</p>
        {review.photoUrl && (
          <div className="relative mt-3 h-40 w-52 overflow-hidden rounded-md">
            <Image src={review.photoUrl} alt={`Photo from ${review.authorName}`} fill unoptimized className="object-cover" />
          </div>
        )}
      </div>
    </article>
  );
}
