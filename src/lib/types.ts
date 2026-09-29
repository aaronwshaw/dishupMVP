export type PriceLevel = 1 | 2 | 3 | 4;
export type RestaurantStyle = "fast" | "casual" | "fine";
export type Course = "appetizer" | "main" | "dessert" | "drink" | "side";

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
  /** Public Yelp average the sample reviews were tuned to match. */
  yelpRating: number;
}

export interface PhotoCredit {
  author: string;
  license: string;
  source: string;
}

export interface Dish {
  id: string;
  restaurantId: string;
  name: string;
  course: Course;
  /** Approximate menu price; omitted when we couldn't confirm it. */
  price?: number;
  imageUrl: string;
  photoCredit?: PhotoCredit;
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
  /** Seeded example review, not written by a real diner. */
  isSample?: boolean;
}

export type NewReview = Omit<Review, "id" | "createdAt" | "isSample">;

export interface Rating {
  avg: number;
  count: number;
}
