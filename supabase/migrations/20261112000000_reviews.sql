-- DishUp reviews (OD-13). Restaurants and dishes stay in src/data/seed.ts for now;
-- only reviews, the data customers create, live in the database.

create table public.reviews (
  id          uuid primary key default gen_random_uuid(),
  dish_id     text not null check (char_length(dish_id) between 1 and 100),
  rating      smallint not null check (rating between 1 and 5),
  text        text not null check (char_length(text) between 10 and 1000),
  author_name text not null check (char_length(author_name) between 1 and 40),
  photo_url   text check (photo_url is null or char_length(photo_url) <= 500),
  created_at  timestamptz not null default now()
);

create index reviews_dish_id_created_at_idx on public.reviews (dish_id, created_at desc);

-- Row-level security: anyone can read reviews and post new ones; nobody can edit or
-- delete them through the public API (there are no update/delete policies).
alter table public.reviews enable row level security;

create policy "Reviews are public" on public.reviews
  for select to anon, authenticated using (true);

create policy "Anyone can post a review" on public.reviews
  for insert to anon, authenticated with check (true);

-- Visitors may only fill in these columns. id and created_at always come from the
-- database, so nobody can backdate a review or pick its id.
revoke insert on public.reviews from anon, authenticated;
grant insert (dish_id, rating, text, author_name, photo_url) on public.reviews to anon, authenticated;
grant select on public.reviews to anon, authenticated;

-- Review photos: public to view, uploads limited to small images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('review-photos', 'review-photos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp']);

create policy "Anyone can upload a review photo" on storage.objects
  for insert to anon, authenticated with check (bucket_id = 'review-photos');
