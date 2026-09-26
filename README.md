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
- **Data:** fake restaurants, dishes and reviews in `src/data/seed.ts`. Dish photos come from [TheMealDB](https://www.themealdb.com) and are stored in `public/images/dishes`.
- **Reviews you post** are saved in your browser's localStorage (key `dishup.reviews`), so other people can't see them yet. Clear site data to reset.
- **All data access** goes through `src/lib/data.ts`, the one file to rewrite when moving to a real backend (Phase 4).
