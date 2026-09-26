"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";

export default function HeroSearch({ cities }: { cities: string[] }) {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.push(qs ? `/restaurants?${qs}` : "/restaurants");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:gap-0"
    >
      <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-white sm:flex-row">
        <label className="relative flex items-center border-b border-line sm:w-52 sm:border-r sm:border-b-0">
          <MapPin size={18} className="pointer-events-none absolute left-3 text-muted" />
          <span className="sr-only">Location</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-12 w-full cursor-pointer appearance-none bg-transparent pr-4 pl-10 text-sm font-semibold text-ink outline-none"
          >
            <option value="">All locations</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="relative flex flex-1 items-center">
          <Search size={18} className="pointer-events-none absolute left-3 text-muted" />
          <span className="sr-only">Restaurant or dish</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a restaurant, cuisine or dish"
            className="h-12 w-full bg-transparent pr-4 pl-10 text-sm text-ink outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="h-12 rounded-md bg-brand px-8 text-sm font-bold text-white transition-colors hover:bg-brand-dark sm:ml-2"
      >
        Let&apos;s go
      </button>
    </form>
  );
}
