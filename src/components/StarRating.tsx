"use client";

import { useState } from "react";
import { Star } from "lucide-react";

/** Read-only stars with partial fill, e.g. 4.3 → four full stars and a third of one. */
export function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex" aria-label={`${value.toFixed(1)} out of 5 stars`} role="img">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 fill-line text-line" strokeWidth={0} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="fill-brand text-brand" strokeWidth={0} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

const LABELS = ["", "Terrible", "Not great", "Okay", "Really good", "Amazing"];

/** Clickable 1–5 star picker for the review form. */
export function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-3">
      <div className="flex" role="radiogroup" aria-label="Your rating" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            className="p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand"
          >
            <Star
              size={36}
              strokeWidth={0}
              className={n <= shown ? "fill-brand" : "fill-line"}
            />
          </button>
        ))}
      </div>
      <span className="text-sm font-semibold text-muted">{LABELS[shown]}</span>
    </div>
  );
}
