// Rules for a new review, shared by the form (to show errors) and the data layer (so
// nothing invalid is ever saved, whatever calls it).
import type { NewReview } from "./types";

export const REVIEW_LIMITS = { minText: 10, maxText: 1000, maxName: 40 } as const;
export const DEFAULT_AUTHOR = "DishUp diner";

export interface ReviewErrors {
  rating?: string;
  text?: string;
  authorName?: string;
}

export interface ReviewInput {
  dishId: string;
  rating: number;
  text: string;
  authorName?: string;
  photoUrl?: string;
}

export type ReviewValidation =
  | { ok: true; review: NewReview }
  | { ok: false; errors: ReviewErrors };

/** Checks and cleans a review. On success, text and name are trimmed and a default name is filled in. */
export function validateReview(input: ReviewInput): ReviewValidation {
  const errors: ReviewErrors = {};
  const text = input.text.trim();
  const authorName = (input.authorName ?? "").trim();

  if (!Number.isInteger(input.rating) || input.rating < 1 || input.rating > 5) {
    errors.rating = "Please choose a star rating.";
  }
  if (text.length < REVIEW_LIMITS.minText) {
    errors.text = `Tell us a bit more (at least ${REVIEW_LIMITS.minText} characters).`;
  } else if (text.length > REVIEW_LIMITS.maxText) {
    errors.text = `Please keep it under ${REVIEW_LIMITS.maxText} characters.`;
  }
  if (authorName.length > REVIEW_LIMITS.maxName) {
    errors.authorName = `Names can be up to ${REVIEW_LIMITS.maxName} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return {
    ok: true,
    review: {
      dishId: input.dishId,
      rating: input.rating,
      text,
      authorName: authorName || DEFAULT_AUTHOR,
      photoUrl: input.photoUrl,
    },
  };
}
