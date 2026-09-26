import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DishView from "@/components/DishView";
import { getDish, getRestaurant } from "@/lib/data";

export async function generateMetadata(props: PageProps<"/dishes/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `${getDish(id)?.name ?? "Dish"} · DishUp` };
}

export default async function DishPage(props: PageProps<"/dishes/[id]">) {
  const { id } = await props.params;
  const { posted } = await props.searchParams;
  const dish = getDish(id);
  const restaurant = dish && getRestaurant(dish.restaurantId);
  if (!dish || !restaurant) notFound();
  return <DishView dish={dish} restaurant={restaurant} justPosted={posted === "1"} />;
}
