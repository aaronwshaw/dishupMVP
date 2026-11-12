import { describe, expect, it } from "vitest";
import { DEFAULT_AUTHOR, REVIEW_LIMITS, validateReview } from "./validation";

const base = { dishId: "beef-dawg", rating: 4, text: "Snappy dog, great sauce." };

describe("validateReview", () => {
  it("accepts a normal review and trims it", () => {
    const result = validateReview({ ...base, text: "  Snappy dog, great sauce.  ", authorName: "  Ella M. " });
    expect(result).toEqual({
      ok: true,
      review: { dishId: "beef-dawg", rating: 4, text: "Snappy dog, great sauce.", authorName: "Ella M.", photoUrl: undefined },
    });
  });

  it("fills in a default name when none is given", () => {
    const result = validateReview({ ...base, authorName: "   " });
    expect(result.ok && result.review.authorName).toBe(DEFAULT_AUTHOR);
  });

  it.each([0, 6, 3.5, Number.NaN])("rejects a rating of %s", (rating) => {
    const result = validateReview({ ...base, rating });
    expect(result.ok).toBe(false);
    expect(!result.ok && result.errors.rating).toMatch(/star rating/);
  });

  it("rejects text that is too short once trimmed", () => {
    const result = validateReview({ ...base, text: "   good    " });
    expect(!result.ok && result.errors.text).toMatch(/at least 10/);
  });

  it("accepts text exactly at the limits", () => {
    expect(validateReview({ ...base, text: "a".repeat(REVIEW_LIMITS.minText) }).ok).toBe(true);
    expect(validateReview({ ...base, text: "a".repeat(REVIEW_LIMITS.maxText) }).ok).toBe(true);
  });

  it("rejects text over the maximum", () => {
    const result = validateReview({ ...base, text: "a".repeat(REVIEW_LIMITS.maxText + 1) });
    expect(!result.ok && result.errors.text).toMatch(/under 1000/);
  });

  it("rejects a name that is too long", () => {
    const result = validateReview({ ...base, authorName: "x".repeat(REVIEW_LIMITS.maxName + 1) });
    expect(!result.ok && result.errors.authorName).toBeDefined();
  });

  it("reports every problem at once", () => {
    const result = validateReview({ dishId: "x", rating: 0, text: "" });
    expect(!result.ok && Object.keys(result.errors).sort()).toEqual(["rating", "text"]);
  });
});
