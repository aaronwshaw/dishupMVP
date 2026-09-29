# DishUp MVP

Rate a specific **dish** at a restaurant, not just the restaurant. See [PLAN.md](PLAN.md) for the full build plan.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How it works (MVP)

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
- **Data:** real Provo/Orem restaurants and menu items in `src/data/seed.ts` (checked Sept 2026, prices approximate). Reviews there are labeled **sample** placeholders, with ratings tuned to each restaurant's public Yelp average.
- **Photos:** representative dish photos from Wikimedia Commons in `public/images/dishes`, credited in `src/data/photo-credits.ts` and on the `/credits` page.
- **Reviews you post** are saved in your browser's localStorage (key `dishup.reviews`), so other people can't see them yet. Clear site data to reset.
- **All data access** goes through `src/lib/data.ts`, the one file to rewrite when moving to a real backend (Phase 4).
