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
  side: "Side",
};

/** "CC BY-SA 2.0" → its deed URL; undefined for anything unrecognized. */
export function licenseUrl(license: string): string | undefined {
  if (/^CC0/i.test(license)) return "https://creativecommons.org/publicdomain/zero/1.0/";
  const m = license.match(/^CC (BY(?:-SA)?) (\d\.\d)/i);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : undefined;
}

export const reviewCountLabel = (count: number) =>
  count === 1 ? "1 review" : `${count} reviews`;
