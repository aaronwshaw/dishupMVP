"use client";

import { useSyncExternalStore } from "react";
import { getReviewsSnapshot, getServerReviewsSnapshot, subscribeToReviews } from "./data";

/** All reviews, re-rendering whenever a new one is posted. */
export function useReviews() {
  return useSyncExternalStore(subscribeToReviews, getReviewsSnapshot, getServerReviewsSnapshot);
}
