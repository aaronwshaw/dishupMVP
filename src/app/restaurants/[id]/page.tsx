import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RestaurantView from "@/components/RestaurantView";
import { getRestaurant, getRestaurantDishes, getRestaurants } from "@/lib/data";

export function generateStaticParams() {
  return getRestaurants().map((r) => ({ id: r.id }));
}

export async function generateMetadata(props: PageProps<"/restaurants/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `${getRestaurant(id)?.name ?? "Restaurant"} · DishUp` };
}

export default async function RestaurantPage(props: PageProps<"/restaurants/[id]">) {
  const { id } = await props.params;
  const restaurant = getRestaurant(id);
  if (!restaurant) notFound();
  return <RestaurantView restaurant={restaurant} dishes={getRestaurantDishes(id)} />;
}
