import { describe, expect, it } from "vitest";
import { formatDate, formatPrice, formatRating, licenseUrl, priceLabel, reviewCountLabel } from "./format";

describe("format helpers", () => {
  it("formats prices, ratings and price levels", () => {
    expect(formatPrice(7.5)).toBe("$7.50");
    expect(formatRating(4.666)).toBe("4.7");
    expect(priceLabel(1)).toBe("$");
    expect(priceLabel(4)).toBe("$$$$");
  });

  it("pluralizes review counts", () => {
    expect(reviewCountLabel(1)).toBe("1 review");
    expect(reviewCountLabel(3)).toBe("3 reviews");
  });

  it("dates a review by the viewer's local day (regression: evening posts showed tomorrow)", () => {
    // 9:30 pm on Oct 31 in Utah is already Nov 1 in UTC.
    process.env.TZ = "America/Denver";
    expect(formatDate("2026-11-01T03:30:00.000Z")).toBe("Oct 31, 2026");
  });

  it("keeps seed review dates on the same day in US time zones", () => {
    process.env.TZ = "America/Los_Angeles";
    expect(formatDate("2026-09-18T18:00:00.000Z")).toBe("Sep 18, 2026");
  });
});

describe("licenseUrl", () => {
  it.each([
    ["CC0", "https://creativecommons.org/publicdomain/zero/1.0/"],
    ["CC BY 2.0", "https://creativecommons.org/licenses/by/2.0/"],
    ["CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/"],
  ])("%s links to its license", (license, url) => expect(licenseUrl(license)).toBe(url));

  it("returns nothing for unknown licenses", () => {
    expect(licenseUrl("All rights reserved")).toBeUndefined();
  });
});
