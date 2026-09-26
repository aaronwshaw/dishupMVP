import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReviewForm from "@/components/ReviewForm";
import { getDish, getRestaurant } from "@/lib/data";

export async function generateMetadata(props: PageProps<"/dishes/[id]/review">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Review ${getDish(id)?.name ?? "a dish"} · DishUp` };
}

export default async function WriteReviewPage(props: PageProps<"/dishes/[id]/review">) {
  const { id } = await props.params;
  const dish = getDish(id);
  const restaurant = dish && getRestaurant(dish.restaurantId);
  if (!dish || !restaurant) notFound();
  return <ReviewForm dish={dish} restaurant={restaurant} />;
}
