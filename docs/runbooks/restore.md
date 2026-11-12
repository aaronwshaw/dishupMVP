# Runbook: back up and restore DishUp

## What needs protecting
| Part | Where it lives | How it comes back |
|---|---|---|
| Code, pages, restaurants, dishes | GitHub (`main`) | Vercel redeploys any commit; *Instant Rollback* in Vercel |
| Hosting config | Vercel project `dishup-mvp` + env vars | Re-import the repo in Vercel and re-add env vars (`.env.example`) |
| Database schema | `supabase/migrations/*.sql` (in Git) | Run the migrations on a new Supabase project |
| **Customer reviews** | Supabase table `reviews` | **Backups below** |
| Review photos | Supabase storage bucket `review-photos` | Public URLs in each review; re-upload from the bucket if lost |

## Targets
- **RPO (data we can afford to lose): 24 hours.** Reviews are backed up nightly.
- **RTO (time to be back up): 1 hour.** New Supabase project + migration + restore + env vars.

## Backups
- **Nightly (automated):** the GitHub Actions workflow in `docs/runbooks/backup-workflow.yml`
  (copy it to `.github/workflows/backup.yml`) runs `scripts/backup-reviews.mjs` every night and
  keeps each export as a workflow artifact for 90 days.
- **On demand:**
  ```
  NEXT_PUBLIC_SUPABASE_URL=... NEXT_PUBLIC_SUPABASE_ANON_KEY=... node scripts/backup-reviews.mjs
  ```
  Writes `backups/reviews-<timestamp>.json` (git-ignored).
- **Supabase's own backups:** check Supabase → Project → Database → Backups for what your plan
  includes. Our nightly export works regardless of plan.

## Restore (tested)
1. If the project is gone, create a new Supabase project and run the SQL in
   `supabase/migrations/` (SQL editor, or `supabase db push`).
2. Download the latest backup (Actions → *Backup reviews* → newest run → artifact).
3. Generate the restore SQL and run it in the SQL editor:
   ```
   node scripts/restore-reviews.mjs backups/reviews-<timestamp>.json > restore.sql
   ```
   It keeps original ids and dates and skips rows that already exist.
4. If the project URL or key changed, update `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel and redeploy.
5. Check: the count printed at the end matches the backup's `count`, and a known review
   shows on its dish page.

## Restore test log
| Date | What | Result |
|---|---|---|
| 2026-11-12 | Backed up 3 reviews (one with a photo) → deleted all rows → ran restore SQL | 3 before, 0 after loss, 3 after restore; same ids, dates and photo URL |
