import { formatRating, reviewCountLabel } from "@/lib/format";
import type { Rating } from "@/lib/types";
import { StarRating } from "./StarRating";

/** Stars + "4.5 · 12 reviews", or "No reviews yet". */
export default function RatingSummary({ rating, size = 14 }: { rating: Rating; size?: number }) {
  if (rating.count === 0) {
    return <span className="text-sm text-muted">No reviews yet</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <StarRating value={rating.avg} size={size} />
      <span className="font-bold">{formatRating(rating.avg)}</span>
      <span className="text-muted">({reviewCountLabel(rating.count)})</span>
    </span>
  );
}
