import type { Metadata } from "next";
import RestaurantBrowser from "@/components/RestaurantBrowser";

export const metadata: Metadata = { title: "Restaurants · DishUp" };

export default async function RestaurantsPage(props: PageProps<"/restaurants">) {
  const { city, q } = await props.searchParams;
  const initialCity = typeof city === "string" ? city : "";
  const initialQuery = typeof q === "string" ? q : "";
  // Keyed so a new search from the header/hero starts fresh instead of keeping old filters.
  return (
    <RestaurantBrowser
      key={`${initialCity}|${initialQuery}`}
      initialCity={initialCity}
      initialQuery={initialQuery}
    />
  );
}
