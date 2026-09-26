import type { Course, PriceLevel } from "./types";

export const priceLabel = (level: PriceLevel) => "$".repeat(level);

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export const formatRating = (avg: number) => avg.toFixed(1);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const courseLabel: Record<Course, string> = {
  appetizer: "Appetizer",
  main: "Main",
  dessert: "Dessert",
  drink: "Drink",
};

export const reviewCountLabel = (count: number) =>
  count === 1 ? "1 review" : `${count} reviews`;
