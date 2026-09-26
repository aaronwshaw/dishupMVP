# DishUp — Build Plan

## Context
The repo is empty apart from `MVP Description.docx` and a README. The doc sets out the core flow:
**Select restaurant → choose dish → write review → post review.**

The goal is a good-looking, clickable MVP of that flow, styled like OpenTable but centered on **dishes** rather than reservations. The data is fake for now: a few made-up restaurants and dishes with real food photos that match each dish's name. Later phases add the doc's nice-to-have features and a real backend.

**Decisions made:** Next.js (App Router) + TypeScript + Tailwind CSS. Data comes from seed files, and posted reviews are saved in the browser's localStorage. All data access goes through one file (`lib/data.ts`), so moving to Supabase later only means rewriting that file.

---

## Phase 1 — MVP (the must-haves from the doc)

### 1.1 Scaffold
- `npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"`. The existing README and docx stay.
- Add `lucide-react` for icons. No other dependencies.
- Load the **Nunito Sans** font with `next/font` (it looks close to OpenTable's rounded sans-serif).

### 1.2 Visual style (OpenTable-inspired, but DishUp's own brand)
- Tailwind theme tokens: primary red `#DA3743` for buttons, stars and links; hero background dark charcoal `#1f2937`; page background white; `#f7f7f7` for section bands; text `#2d333f`.
- **Header:** "DishUp" wordmark on the left, links "Restaurants" and "Top dishes" on the right, and a thin bottom border.
- **Home hero:** a full-width dark band with the headline "Find the best dish, not just the best restaurant". Below it, a single search bar joining a location dropdown and a text input ("Search a restaurant or dish") to a red **Let's go** button.
- **Cards:** image on top (16:9, `object-cover`, rounded top corners), name in bold, a red star row with the review count, and muted meta text (cuisine · $$ · city). A soft shadow grows on hover.
- **Restaurant page:** wide photo banner, a name and rating block, and an in-page nav (Dishes · About), similar to an OpenTable restaurant page.
- Responsive: cards show 1 column on mobile, 2 on tablet, and 3–4 on desktop.
- No OpenTable logo, name or assets. The layout and feel only.

### 1.3 Data model — `src/lib/types.ts`
```ts
Restaurant { id, name, city, cuisine, priceLevel: 1-4, style: 'fast'|'casual'|'fine', imageUrl, description }
Dish       { id, restaurantId, name, course: 'appetizer'|'main'|'dessert'|'drink', price, imageUrl, description }
Review     { id, dishId, rating: 1-5, text, photoUrl?, authorName, createdAt }
```
Some fields (`style`, `course`, `priceLevel`) aren't used by MVP filters yet. They're included now so Phase 2 filters need no data changes.

### 1.4 Fake seed data — `src/data/seed.ts`
- **6 fictional restaurants** across 3 cities (Provo, Orem and Salt Lake City), e.g. "Cedar & Flame Grill", "Little Saigon Kitchen", "Nonna's Table", "Taqueria El Sol", "Harvest Bowl Co.", "Sugar Loaf Bakery".
- **4–5 dishes each** (about 25 total), e.g. Pho Tai, Margherita Pizza, Carne Asada Tacos, Smash Burger, Tiramisu.
- **1–3 seed reviews per dish**, so ratings and averages show up straight away.
- **Photos:** real free-licensed food photos from Unsplash/Pexels, one chosen by hand per dish to match its name. They're downloaded into `public/images/dishes/<slug>.jpg` and `public/images/restaurants/<slug>.jpg` so they never break. Each one is checked visually after download.

### 1.5 Data layer — `src/lib/data.ts` (the only file that touches storage)
- `getRestaurants({ city?, query? })`, `getRestaurant(id)`
- `getDishes(restaurantId, { query?, minRating? })`, `getDish(id)`, `searchDishes(query)`
- `getReviews(dishId)`, `getDishRating(dishId) → { avg, count }`
- `addReview(input)` saves to localStorage key `dishup.reviews`. Reads merge seed reviews with stored ones.
- A small `useReviews` hook re-renders the page after a new review is posted. Pages that read localStorage are client components.

### 1.6 Pages (App Router)
| Route | Doc feature | Contents |
|---|---|---|
| `/` | Select restaurant | Hero search (location + name), a "Top-rated dishes" row and a "Restaurants" grid |
| `/restaurants?city=&q=` | **Filter by location, search by name** | City chips/dropdown, search input, restaurant card grid, empty state |
| `/restaurants/[id]` | **Choose dish: search by name, filter by rating, view photos** | Banner, dish search box, rating filter (All · 3★+ · 4★+ · 4.5★+), dish card grid |
| `/dishes/[id]` | **View photos**, see reviews | Large photo plus a strip of review photos, avg rating, review list (newest first), red **Write a review** button |
| `/dishes/[id]/review` | **Write & post a review** | Clickable 1–5 star picker, description textarea, photo upload with preview, optional name, **Post review** button |

### 1.7 Components — `src/components/`
`Header`, `HeroSearch`, `RestaurantCard`, `DishCard`, `StarRating` (display mode and input mode), `RatingFilter`, `SearchInput`, `ReviewCard`, `ReviewForm`, `PhotoUpload`, `EmptyState`, `Toast`.

### 1.8 Review posting details
- The form checks that a rating is chosen and the description has at least 10 characters.
- Photo upload: the browser reads the file, shrinks it to about 800px wide with a `<canvas>`, and stores it as a JPEG data URL. This keeps localStorage under its roughly 5MB limit.
- After posting, the app goes back to `/dishes/[id]` and shows the "Review posted!" toast. The new review is at the top and the average rating updates.

### Phase 1 done when
A user can open the home page, pick a city, search for and open a restaurant, filter its dishes by rating, open a dish, see its photos, write a review with stars, a photo and text, and post it. The review is still there after a page refresh.

---

## Phase 2 — Discovery nice-to-haves
- Restaurant filters: food type (cuisine), price ($–$$$$), and style (fast food / sit-down / fine dining).
- Dish filters: course (appetizer / main / dessert), sort by most popular (review count), and search dishes across all restaurants.
- "Add a dish if it's not listed" form on the restaurant page (saved to localStorage too).

## Phase 3 — Review nice-to-haves
- Plate size / how filling it was (Light · Just right · Leftovers).
- "Would you order it again?" yes/no, shown on the dish page as a percentage.
- Post anonymously.
- Save a draft to finish later ("My drafts" page).
- Post to your personal collection or to the app ("My dishes" page).

## Phase 4 — Real backend (Supabase)
- Create `restaurants`, `dishes` and `reviews` tables and load the seed data into them.
- A storage bucket for review photos, plus row-level security rules (anyone can read and add reviews, and only the author can edit or delete their own).
- Rewrite `src/lib/data.ts` to use `@supabase/supabase-js`. Pages stay the same.
- Add accounts (email magic link) so drafts, collections and anonymous posting are tied to a real user.

## Phase 5 — Ship & polish
- Deploy to Vercel. Loading skeletons, a 404 page, image `alt` text, and a keyboard/accessibility pass.
- Optional: real restaurant data from the Google Places or Yelp API, and a map view for the location filter.

---

## Verification (Phase 1)
1. `npm run dev`, then walk the whole flow above on desktop and at mobile width in DevTools.
2. Check every seed image loads and matches its dish name (open `public/images/` and each page).
3. Post a review with a photo, refresh, and check it's still there with the average updated. Then clear localStorage and check the seed data still renders.
4. Check the edge cases: a search with no results shows the empty state, and posting with no stars shows an error.
5. `npm run lint` and `npm run build` both pass with no errors.
