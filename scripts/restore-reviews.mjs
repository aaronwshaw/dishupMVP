#!/usr/bin/env node
// Turns a backup file into SQL that restores the reviews, keeping their original ids and
// dates. Rows that already exist are skipped, so it is safe to run more than once.
// Run the output in the Supabase SQL editor (or `supabase db query`) as the project owner;
// visitors can't set ids or dates, by design.
//
//   node scripts/restore-reviews.mjs backups/reviews-<timestamp>.json > restore.sql
import { readFile } from "node:fs/promises";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/restore-reviews.mjs <backup.json> > restore.sql");
  process.exit(1);
}

const { reviews } = JSON.parse(await readFile(file, "utf8"));
const sql = (value) => (value === null || value === undefined ? "null" : `'${String(value).replace(/'/g, "''")}'`);
const columns = ["id", "dish_id", "rating", "text", "author_name", "photo_url", "created_at"];

console.log(`-- Restoring ${reviews.length} reviews from ${file}`);
console.log("begin;");
for (const r of reviews) {
  const values = [sql(r.id), sql(r.dish_id), Number(r.rating), sql(r.text), sql(r.author_name), sql(r.photo_url), sql(r.created_at)];
  console.log(`insert into public.reviews (${columns.join(", ")}) values (${values.join(", ")}) on conflict (id) do nothing;`);
}
console.log("commit;");
console.log("select count(*) as reviews_after_restore from public.reviews;");
