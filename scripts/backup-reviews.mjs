#!/usr/bin/env node
// Exports every review from Supabase to backups/reviews-<timestamp>.json.
// Reviews are public, so the anon (publishable) key is enough (no secrets needed).
//
//   NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node scripts/backup-reviews.mjs
import { mkdir, writeFile } from "node:fs/promises";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  process.exit(1);
}

const PAGE = 1000;
const reviews = [];
for (let from = 0; ; from += PAGE) {
  const res = await fetch(`${url}/rest/v1/reviews?select=*&order=created_at.asc,id.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}`, Range: `${from}-${from + PAGE - 1}` },
  });
  if (!res.ok) {
    console.error(`Backup failed: HTTP ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  const page = await res.json();
  reviews.push(...page);
  if (page.length < PAGE) break;
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const file = `backups/reviews-${stamp}.json`;
await mkdir("backups", { recursive: true });
await writeFile(file, JSON.stringify({ exportedAt: new Date().toISOString(), count: reviews.length, reviews }, null, 2));
console.log(`Backed up ${reviews.length} reviews to ${file}`);
