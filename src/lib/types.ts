export type PriceLevel = 1 | 2 | 3 | 4;
export type RestaurantStyle = "fast" | "casual" | "fine";
export type Course = "appetizer" | "main" | "dessert" | "drink";

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  cuisine: string;
  priceLevel: PriceLevel;
  style: RestaurantStyle;
  imageUrl: string;
  description: string;
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  course: Course;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Review {
  id: string;
  dishId: string;
  rating: number; // 1–5
  text: string;
  photoUrl?: string;
  authorName: string;
  createdAt: string; // ISO date
}

export type NewReview = Omit<Review, "id" | "createdAt">;

export interface Rating {
  avg: number;
  count: number;
}
