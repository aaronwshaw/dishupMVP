// Reads and writes reviews in Supabase (Postgres + file storage). data.ts uses this when
// the Supabase env vars are set, and falls back to browser storage when they aren't.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { NewReview, Review } from "./types";

export const REVIEWS_TABLE = "reviews";
export const PHOTO_BUCKET = "review-photos";

export interface ReviewRow {
  id: string;
  dish_id: string;
  rating: number;
  text: string;
  author_name: string;
  photo_url: string | null;
  created_at: string;
}

export function fromRow(row: ReviewRow): Review {
  return {
    id: row.id,
    dishId: row.dish_id,
    rating: row.rating,
    text: row.text,
    authorName: row.author_name,
    photoUrl: row.photo_url ?? undefined,
    createdAt: row.created_at,
  };
}

export function toInsertRow(review: NewReview, photoUrl: string | null) {
  return {
    dish_id: review.dishId,
    rating: review.rating,
    text: review.text,
    author_name: review.authorName,
    photo_url: photoUrl,
  };
}

let client: SupabaseClient | null | undefined;

/** The shared client, or null when Supabase isn't configured (local dev, tests). */
export function getSupabase(): SupabaseClient | null {
  if (client === undefined) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  }
  return client;
}

export async function fetchReviews(db: SupabaseClient): Promise<Review[]> {
  const { data, error } = await db
    .from(REVIEWS_TABLE)
    .select("id, dish_id, rating, text, author_name, photo_url, created_at")
    .order("created_at", { ascending: false })
    .limit(1000);
  if (error) throw new Error(`Couldn't load reviews: ${error.message}`);
  return (data as ReviewRow[]).map(fromRow);
}

/** Turns the form's resized photo (a data: URL) into a file for upload. */
export function dataUrlToBlob(dataUrl: string): Blob {
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!match) throw new Error("Unsupported photo format.");
  const bytes = Uint8Array.from(atob(match[2]), (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: match[1] });
}

async function uploadPhoto(db: SupabaseClient, dataUrl: string): Promise<string> {
  const blob = dataUrlToBlob(dataUrl);
  const ext = blob.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await db.storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: blob.type });
  if (error) throw new Error(`Couldn't upload your photo: ${error.message}`);
  return db.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** Saves an already-validated review (and its photo, if any) and returns it as stored. */
export async function insertReview(db: SupabaseClient, review: NewReview): Promise<Review> {
  const photoUrl = review.photoUrl ? await uploadPhoto(db, review.photoUrl) : null;
  const { data, error } = await db
    .from(REVIEWS_TABLE)
    .insert(toInsertRow(review, photoUrl))
    .select("id, dish_id, rating, text, author_name, photo_url, created_at")
    .single();
  if (error) throw new Error(`Couldn't save your review: ${error.message}`);
  return fromRow(data as ReviewRow);
}
