import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, vi } from "vitest";
import { dataUrlToBlob, fetchReviews, fromRow, insertReview, type ReviewRow, toInsertRow } from "./reviewsRemote";

const row: ReviewRow = {
  id: "0f0c1d2e-0000-4000-8000-000000000001",
  dish_id: "beef-dawg",
  rating: 5,
  text: "Snappy dog and great sauce.",
  author_name: "Ella M.",
  photo_url: null,
  created_at: "2026-11-12T18:00:00.000Z",
};

/** A tiny stand-in for the Supabase client that records what was sent. */
function fakeDb(result: { data?: unknown; error?: { message: string } | null }, uploadError: { message: string } | null = null) {
  const calls: { table?: string; inserted?: unknown; uploaded?: { path: string; type: string } } = {};
  const query = {
    select: () => query,
    order: () => query,
    limit: () => Promise.resolve({ data: result.data, error: result.error ?? null }),
    insert: (values: unknown) => {
      calls.inserted = values;
      return query;
    },
    single: () => Promise.resolve({ data: result.data, error: result.error ?? null }),
  };
  const db = {
    from: (table: string) => {
      calls.table = table;
      return query;
    },
    storage: {
      from: () => ({
        upload: (path: string, blob: Blob) => {
          calls.uploaded = { path, type: blob.type };
          return Promise.resolve({ error: uploadError });
        },
        getPublicUrl: (path: string) => ({ data: { publicUrl: `https://cdn.example/${path}` } }),
      }),
    },
  };
  return { db: db as unknown as SupabaseClient, calls };
}

const PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

describe("row mapping", () => {
  it("converts database rows to app reviews", () => {
    expect(fromRow(row)).toEqual({
      id: row.id,
      dishId: "beef-dawg",
      rating: 5,
      text: "Snappy dog and great sauce.",
      authorName: "Ella M.",
      photoUrl: undefined,
      createdAt: row.created_at,
    });
  });

  it("only sends the columns visitors are allowed to set", () => {
    const insert = toInsertRow({ dishId: "beef-dawg", rating: 4, text: "Good dog here.", authorName: "Sam" }, null);
    expect(Object.keys(insert).sort()).toEqual(["author_name", "dish_id", "photo_url", "rating", "text"]);
  });
});

describe("fetchReviews", () => {
  it("returns reviews from the reviews table", async () => {
    const { db, calls } = fakeDb({ data: [row] });
    expect(await fetchReviews(db)).toEqual([fromRow(row)]);
    expect(calls.table).toBe("reviews");
  });

  it("throws a readable error when the database fails", async () => {
    const { db } = fakeDb({ error: { message: "timeout" } });
    await expect(fetchReviews(db)).rejects.toThrow("Couldn't load reviews: timeout");
  });
});

describe("insertReview", () => {
  const review = { dishId: "beef-dawg", rating: 5, text: "Snappy dog and great sauce.", authorName: "Ella M." };

  it("inserts the review and returns it as stored", async () => {
    const { db, calls } = fakeDb({ data: row });
    expect(await insertReview(db, review)).toEqual(fromRow(row));
    expect(calls.inserted).toMatchObject({ dish_id: "beef-dawg", photo_url: null });
    expect(calls.uploaded).toBeUndefined();
  });

  it("uploads the photo first and saves its public URL", async () => {
    const { db, calls } = fakeDb({ data: row });
    await insertReview(db, { ...review, photoUrl: PIXEL });
    expect(calls.uploaded?.type).toBe("image/png");
    expect(calls.uploaded?.path).toMatch(/\.png$/);
    expect(calls.inserted).toMatchObject({ photo_url: expect.stringMatching(/^https:\/\/cdn\.example\/.+\.png$/) });
  });

  it("does not save the review if the photo upload fails", async () => {
    const { db, calls } = fakeDb({ data: row }, { message: "too large" });
    await expect(insertReview(db, { ...review, photoUrl: PIXEL })).rejects.toThrow("Couldn't upload your photo: too large");
    expect(calls.inserted).toBeUndefined();
  });

  it("throws a readable error when the insert is rejected", async () => {
    const { db } = fakeDb({ error: { message: "violates check constraint" } });
    await expect(insertReview(db, review)).rejects.toThrow("Couldn't save your review: violates check constraint");
  });
});

describe("dataUrlToBlob", () => {
  it("decodes an image data URL", () => {
    const blob = dataUrlToBlob(PIXEL);
    expect(blob.type).toBe("image/png");
    expect(blob.size).toBeGreaterThan(0);
  });

  it("rejects anything that isn't an image", () => {
    expect(() => dataUrlToBlob("data:text/html;base64,PGgxPg==")).toThrow("Unsupported photo format.");
  });
});

describe("data layer with Supabase configured", () => {
  it("loads shared reviews, adds posted ones, and reports load errors", async () => {
    vi.resetModules();
    const stored = fromRow(row);
    const saved = { ...stored, id: "new-id", text: "Fresh shared review." };
    const fetchReviewsMock = vi.fn().mockResolvedValueOnce([stored]);
    vi.doMock("./reviewsRemote", () => ({
      getSupabase: () => ({}),
      fetchReviews: fetchReviewsMock,
      insertReview: vi.fn().mockResolvedValue(saved),
    }));
    const captureException = vi.fn();
    vi.doMock("@sentry/nextjs", () => ({ captureException }));
    const data = await import("./data");

    const listener = vi.fn();
    data.subscribeToReviews(listener);
    await vi.waitFor(() => expect(listener).toHaveBeenCalled());
    expect(data.getReviewsSnapshot()[0]).toEqual(stored);

    const posted = await data.addReview({ dishId: "beef-dawg", rating: 4, text: "Fresh shared review.", authorName: "" });
    expect(posted).toEqual(saved);
    expect(data.getReviewsSnapshot().slice(0, 2)).toEqual([saved, stored]);

    // A failed load keeps the page working and reports to Sentry.
    vi.resetModules();
    vi.doMock("./reviewsRemote", () => ({
      getSupabase: () => ({}),
      fetchReviews: vi.fn().mockRejectedValue(new Error("network down")),
      insertReview: vi.fn(),
    }));
    const fresh = await import("./data");
    const onChange = vi.fn();
    fresh.subscribeToReviews(onChange);
    await vi.waitFor(() => expect(onChange).toHaveBeenCalled());
    expect(captureException).toHaveBeenCalledWith(expect.objectContaining({ message: "network down" }));
    expect(fresh.getReviewsSnapshot().every((r) => r.isSample)).toBe(true);

    vi.doUnmock("./reviewsRemote");
    vi.doUnmock("@sentry/nextjs");
  });
});
