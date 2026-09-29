// Real Provo/Orem restaurants and menu items (checked September 2026). Prices are
// approximate and left out where we couldn't confirm them. Photos are representative
// Wikimedia Commons images, not photos from the restaurants themselves.
//
// Reviews below are SAMPLE data, clearly labeled in the UI. Their ratings are tuned so
// each restaurant's average roughly matches its public Yelp rating (Sept 2026).
import type { Dish, Restaurant, Review } from "@/lib/types";
import { photoCredits } from "./photo-credits";

const img = (slug: string) => `/images/dishes/${slug}.jpg`;

export const restaurants: Restaurant[] = [
  {
    id: "bombay-house",
    name: "Bombay House",
    city: "Provo",
    neighborhood: "Downtown Provo",
    cuisine: "Indian",
    priceLevel: 2,
    style: "casual",
    imageUrl: img("chicken-tikka-masala"),
    yelpRating: 4.7,
    description:
      "A long-time Provo favorite for Indian food, known for rich curries, fresh naan and a menu that's easy to make vegetarian or vegan.",
  },
  {
    id: "asa-ramen",
    name: "Asa Ramen",
    city: "Orem",
    neighborhood: "State Street",
    cuisine: "Japanese",
    priceLevel: 1,
    style: "casual",
    imageUrl: img("tonkotsu-ramen"),
    yelpRating: 4.5,
    description:
      "A cozy ramen shop serving creamy tonkotsu, miso and shoyu bowls, plus Japanese small plates like karaage, gyoza and chashu buns.",
  },
  {
    id: "black-sheep-cafe",
    name: "Black Sheep Cafe",
    city: "Provo",
    neighborhood: "Downtown Provo",
    cuisine: "Native American",
    priceLevel: 2,
    style: "casual",
    imageUrl: img("green-chile-navajo-taco"),
    yelpRating: 4.2,
    description:
      "Contemporary Southwestern and Native American cooking on University Avenue, best known for its Navajo tacos and frybread.",
  },
  {
    id: "j-dawgs",
    name: "J Dawgs",
    city: "Provo",
    neighborhood: "Near BYU",
    cuisine: "Hot Dogs",
    priceLevel: 1,
    style: "fast",
    imageUrl: img("polish-dawg"),
    yelpRating: 4.2,
    description:
      "A small, famously simple hot dog spot: beef or Polish, your choice of toppings, and the special sauce everyone talks about.",
  },
  {
    id: "cubbys",
    name: "Cubby's",
    city: "Provo",
    neighborhood: "Provo",
    cuisine: "Burgers",
    priceLevel: 2,
    style: "fast",
    imageUrl: img("dragonslayer-burger"),
    yelpRating: 4.0,
    description:
      "Fast-casual burgers, sandwiches and salads built on top-sirloin patties and tri-tip, with three kinds of fries.",
  },
  {
    id: "cupbop",
    name: "Cupbop",
    city: "Provo",
    neighborhood: "Near BYU",
    cuisine: "Korean",
    priceLevel: 1,
    style: "fast",
    imageUrl: img("bulgogi-bop"),
    yelpRating: 4.0,
    description:
      "Korean BBQ in a cup: rice, cabbage and sweet potato noodles topped with your choice of meat and sauce, spiced from 1 to 10.",
  },
  {
    id: "bam-bams-bbq",
    name: "Bam Bam's BBQ",
    city: "Orem",
    neighborhood: "State Street",
    cuisine: "BBQ",
    priceLevel: 2,
    style: "casual",
    imageUrl: img("brisket-sandwich"),
    yelpRating: 4.0,
    description:
      "A Utah Valley barbecue joint known for its brisket, pulled pork, ribs and Swachos, a big pile of chips loaded with meat and cheese.",
  },
  {
    id: "mo-bettahs-orem",
    name: "Mo' Bettahs",
    city: "Orem",
    neighborhood: "State Street",
    cuisine: "Hawaiian",
    priceLevel: 1,
    style: "fast",
    imageUrl: img("kalua-pig-plate"),
    yelpRating: 3.6,
    description:
      "Hawaiian-style plate lunches: slow-roasted kalua pig, teriyaki chicken and katsu served with rice and macaroni salad.",
  },
  {
    id: "brick-oven-provo",
    name: "Brick Oven",
    city: "Provo",
    neighborhood: "Near BYU",
    cuisine: "Pizza & Italian",
    priceLevel: 2,
    style: "casual",
    imageUrl: img("buffalo-chicken-pizza"),
    yelpRating: 3.3,
    description:
      "A long-running Provo spot for pizza, pasta and house-made root beer, popular with BYU families and big groups.",
  },
];

type DishRow = Omit<Dish, "imageUrl" | "photoCredit">;

const dishRows: DishRow[] = [
  // Bombay House
  { id: "chicken-tikka-masala", restaurantId: "bombay-house", name: "Chicken Tikka Masala", course: "main", price: 19.95, description: "Tandoor-roasted chicken in a creamy, spiced tomato sauce. Served with basmati rice." },
  { id: "chicken-makhani", restaurantId: "bombay-house", name: "Chicken Makhani", course: "main", price: 19.95, description: "Butter chicken: tender chicken in a mild, buttery tomato and cream sauce." },
  { id: "saag-paneer", restaurantId: "bombay-house", name: "Saag Paneer", course: "main", price: 16.5, description: "Soft cubes of paneer cheese simmered in seasoned creamed spinach." },
  { id: "vegetable-samosas", restaurantId: "bombay-house", name: "Vegetable Samosas", course: "appetizer", price: 7.5, description: "Crisp pastry filled with spiced potatoes and peas, with chutneys for dipping." },

  // Asa Ramen
  { id: "tonkotsu-ramen", restaurantId: "asa-ramen", name: "Tonkotsu Ramen", course: "main", price: 11.45, description: "Rich, creamy pork-bone broth with noodles, chashu pork, green onion and a marinated egg." },
  { id: "miso-ramen", restaurantId: "asa-ramen", name: "Miso Ramen", course: "main", price: 11.45, description: "Savory miso blended with house chicken broth, packed with umami." },
  { id: "karai-ramen", restaurantId: "asa-ramen", name: "Karai Ramen", course: "main", price: 11.45, description: "Spicy broth topped with Korean-style minced pork, green onion, black garlic oil and half an egg." },
  { id: "karaage", restaurantId: "asa-ramen", name: "Karaage", course: "appetizer", price: 6.45, description: "Crispy Japanese fried chicken thigh with lemon and roasted sesame sauce." },
  { id: "gyoza", restaurantId: "asa-ramen", name: "Gyoza", course: "appetizer", price: 5.95, description: "Six pan-fried pork and chicken dumplings with gyoza dipping sauce." },

  // Black Sheep Cafe
  { id: "green-chile-navajo-taco", restaurantId: "black-sheep-cafe", name: "Green Chile Pork Navajo Taco", course: "main", description: "Fresh frybread piled with green chile pork, beans, lettuce, tomato and cheese." },
  { id: "honey-lavender-frybread", restaurantId: "black-sheep-cafe", name: "Honey Lavender Frybread", course: "dessert", description: "Warm, puffy frybread finished with honey lavender butter." },
  { id: "green-chile-stew", restaurantId: "black-sheep-cafe", name: "Green Chile Stew", course: "main", description: "A hearty Southwestern stew built on roasted green chiles." },
  { id: "enchiladas", restaurantId: "black-sheep-cafe", name: "Enchiladas (Red or Green)", course: "main", description: "Enchiladas smothered in your choice of red or green chile sauce." },

  // J Dawgs
  { id: "polish-dawg", restaurantId: "j-dawgs", name: "Polish Dawg", course: "main", price: 7.5, description: "A seasoned Polish sausage in a toasted bun. Add onions, peppers and the special sauce." },
  { id: "beef-dawg", restaurantId: "j-dawgs", name: "Beef Dawg", course: "main", price: 7.5, description: "An all-beef hot dog with your choice of toppings and J Dawgs special sauce." },
  { id: "jdawgs-fries", restaurantId: "j-dawgs", name: "Fries", course: "side", price: 5, description: "A side of hot, crispy fries to go with your dawg." },

  // Cubby's
  { id: "dragonslayer-burger", restaurantId: "cubbys", name: "Dragonslayer", course: "main", price: 14.45, description: "Top-sirloin patty mixed with bleu cheese, topped with bacon, pickles, greens and creamy buffalo sauce." },
  { id: "houdini-burger", restaurantId: "cubbys", name: "Houdini", course: "main", price: 14.45, description: "Top-sirloin patty with sautéed mushrooms, bacon, smoked gouda, crispy onions and garlic aioli." },
  { id: "tri-tip-sandwich", restaurantId: "cubbys", name: "Tri-Tip Steak Sandwich", course: "main", description: "Sliced tri-tip steak on a toasted roll." },
  { id: "cockadoodledoo", restaurantId: "cubbys", name: "Cockadoodledoo", course: "main", description: "Cubby's chicken sandwich, one of the menu's most popular non-burger picks." },

  // Cupbop
  { id: "bulgogi-bop", restaurantId: "cupbop", name: "B Bop (Beef Bulgogi)", course: "main", description: "Sweet-savory marinated beef over rice, cabbage and sweet potato noodles." },
  { id: "hot-bop", restaurantId: "cupbop", name: "Hot Bop (Spicy Pork)", course: "main", description: "Spicy marinated pork over rice and noodles. Choose your heat from 1 to 10." },
  { id: "japchae", restaurantId: "cupbop", name: "Japchae", course: "main", description: "Stir-fried sweet potato glass noodles with vegetables." },
  { id: "mandoo", restaurantId: "cupbop", name: "Mandoo", course: "appetizer", description: "Korean potstickers filled with kimchi, vegetables and pork." },

  // Bam Bam's BBQ
  { id: "brisket-sandwich", restaurantId: "bam-bams-bbq", name: "Brisket Sandwich", course: "main", description: "Slow-smoked, tender brisket piled on a bun. The house specialty." },
  { id: "pulled-pork-sandwich", restaurantId: "bam-bams-bbq", name: "Pulled Pork Sandwich", course: "main", description: "Smoky pulled pork on a soft bun with barbecue sauce." },
  { id: "pork-ribs", restaurantId: "bam-bams-bbq", name: "Pork Ribs", course: "main", description: "Smoked pork ribs with a sticky barbecue glaze." },
  { id: "swachos", restaurantId: "bam-bams-bbq", name: "Swachos", course: "main", description: "Corn chips topped with nacho cheese, beans, sweet BBQ sauce and a third-pound of smoked meat." },

  // Mo' Bettahs
  { id: "kalua-pig-plate", restaurantId: "mo-bettahs-orem", name: "Kalua Pig Plate", course: "main", description: "Smoky, salty pork slow-roasted for over 10 hours, with rice and macaroni salad." },
  { id: "teriyaki-chicken-plate", restaurantId: "mo-bettahs-orem", name: "Teriyaki Chicken Plate", course: "main", description: "Grilled marinated chicken thigh drizzled with teri sauce, with rice and macaroni salad." },
  { id: "katsu-chicken-plate", restaurantId: "mo-bettahs-orem", name: "Katsu Chicken Plate", course: "main", description: "Breaded, deep-fried chicken thigh with katsu sauce, rice and macaroni salad." },

  // Brick Oven
  { id: "buffalo-chicken-pizza", restaurantId: "brick-oven-provo", name: "Buffalo Chicken Pizza", course: "main", price: 16, description: "Pizza topped with buffalo-sauced chicken (10-inch price shown)." },
  { id: "deep-dish-lasagna", restaurantId: "brick-oven-provo", name: "Deep Dish Baked Lasagna", course: "main", price: 16.75, description: "Layers of pasta, meat sauce and cheese, baked deep-dish style." },
  { id: "spinach-artichoke-dip", restaurantId: "brick-oven-provo", name: "Spinach Artichoke Dip", course: "appetizer", description: "Warm, cheesy spinach and artichoke dip for the table." },
];

export const dishes: Dish[] = dishRows.map((d) => ({
  ...d,
  imageUrl: img(d.id),
  photoCredit: photoCredits[d.id],
}));

// [dishId, rating, text, date]. Ratings per restaurant average ≈ its Yelp rating.
const reviewRows: [string, number, string, string][] = [
  // Bombay House: 56/12 = 4.67 (Yelp 4.7)
  ["chicken-tikka-masala", 5, "Creamy, well-spiced sauce and tender chicken. Get extra naan to soak it all up.", "2026-09-18"],
  ["chicken-tikka-masala", 5, "The classic order here for a reason. Big portion, easy to share.", "2026-09-02"],
  ["chicken-tikka-masala", 5, "Great first dish if you're new to Indian food. Rich without being too spicy.", "2026-08-14"],
  ["chicken-makhani", 5, "Buttery and mild, a good pick for anyone who doesn't want much heat.", "2026-09-11"],
  ["chicken-makhani", 5, "Silky sauce and plenty of chicken. Pairs perfectly with garlic naan.", "2026-08-27"],
  ["chicken-makhani", 4, "Really good, though a little sweet compared to the tikka masala.", "2026-08-05"],
  ["saag-paneer", 5, "Great vegetarian option. The spinach is smooth and the paneer is soft.", "2026-09-15"],
  ["saag-paneer", 4, "Flavorful and filling. Ask for it spicier if you like heat.", "2026-08-21"],
  ["saag-paneer", 5, "Best saag I've had in Utah County.", "2026-07-30"],
  ["vegetable-samosas", 5, "Crispy shell and well-seasoned potato filling. The chutneys are great.", "2026-09-08"],
  ["vegetable-samosas", 4, "Good starter to share while you wait for curries.", "2026-08-18"],
  ["vegetable-samosas", 4, "Solid samosas, a little heavy if you're ordering a lot of food.", "2026-07-26"],

  // Asa Ramen: 67/15 = 4.47 (Yelp 4.5)
  ["tonkotsu-ramen", 5, "Rich, creamy broth, tender pork and a perfectly jammy egg.", "2026-09-20"],
  ["tonkotsu-ramen", 5, "My go-to comfort food in Orem. Great value for the price.", "2026-09-04"],
  ["tonkotsu-ramen", 5, "The broth is the star. Order the full size, you'll want it.", "2026-08-16"],
  ["miso-ramen", 4, "Savory and satisfying, a little lighter than the tonkotsu.", "2026-09-12"],
  ["miso-ramen", 5, "Lots of umami and the noodles have a great chew.", "2026-08-25"],
  ["miso-ramen", 4, "Good bowl on a cold day. Add corn if they have it.", "2026-08-02"],
  ["karai-ramen", 4, "Nice kick with the black garlic oil. Not overwhelmingly hot.", "2026-09-14"],
  ["karai-ramen", 5, "Spicy, garlicky and addictive. My favorite bowl here.", "2026-08-29"],
  ["karai-ramen", 4, "Tasty, though I wanted a little more heat.", "2026-08-09"],
  ["karaage", 5, "Super crispy and juicy. The sesame sauce is great.", "2026-09-06"],
  ["karaage", 4, "Great side to share with the table.", "2026-08-19"],
  ["karaage", 4, "Crispy and well seasoned, small-ish portion.", "2026-07-28"],
  ["gyoza", 4, "Nicely pan-fried with a crispy bottom.", "2026-09-09"],
  ["gyoza", 4, "Solid dumplings, a good add-on to any ramen.", "2026-08-22"],
  ["gyoza", 5, "Juicy filling and great dipping sauce.", "2026-08-01"],

  // Black Sheep Cafe: 50/12 = 4.17 (Yelp 4.2)
  ["green-chile-navajo-taco", 5, "The frybread is light and crisp, and the green chile pork is fantastic.", "2026-09-17"],
  ["green-chile-navajo-taco", 4, "Huge and filling. Worth the trip downtown.", "2026-08-30"],
  ["green-chile-navajo-taco", 5, "The dish to get if it's your first time here.", "2026-08-11"],
  ["honey-lavender-frybread", 5, "Warm, fluffy and the honey lavender butter is unreal. Don't skip dessert.", "2026-09-13"],
  ["honey-lavender-frybread", 5, "Perfect to split after dinner.", "2026-08-24"],
  ["honey-lavender-frybread", 4, "Sweet and delicious, a little rich to finish alone.", "2026-08-03"],
  ["green-chile-stew", 4, "Hearty and comforting with a nice roasted chile flavor.", "2026-09-07"],
  ["green-chile-stew", 4, "Great on a cold night. Get frybread on the side.", "2026-08-20"],
  ["green-chile-stew", 3, "Good, but I preferred the Navajo taco.", "2026-07-29"],
  ["enchiladas", 4, "Try them Christmas style with half red, half green.", "2026-09-10"],
  ["enchiladas", 3, "Fine, but not as memorable as the frybread dishes.", "2026-08-15"],
  ["enchiladas", 4, "Flavorful sauce and a filling portion.", "2026-07-27"],

  // J Dawgs: 38/9 = 4.22 (Yelp 4.2)
  ["polish-dawg", 5, "Get it with onions and extra special sauce. A BYU rite of passage.", "2026-09-19"],
  ["polish-dawg", 5, "Snappy, well-seasoned sausage and that sweet, tangy sauce.", "2026-09-01"],
  ["polish-dawg", 4, "Really good, just wish it was a bit bigger for the price.", "2026-08-12"],
  ["beef-dawg", 4, "Simple and tasty. The sauce makes it.", "2026-09-05"],
  ["beef-dawg", 4, "Solid hot dog. The Polish has more flavor though.", "2026-08-23"],
  ["beef-dawg", 4, "Quick, cheap lunch between classes.", "2026-08-04"],
  ["jdawgs-fries", 4, "Hot and crispy, good with a dawg.", "2026-09-16"],
  ["jdawgs-fries", 4, "Nothing fancy, but they hit the spot.", "2026-08-26"],
  ["jdawgs-fries", 4, "Dip them in the special sauce.", "2026-08-07"],

  // Cubby's: 48/12 = 4.0 (Yelp 4.0)
  ["dragonslayer-burger", 5, "Bleu cheese and buffalo sauce make this one stand out. Messy but great.", "2026-09-18"],
  ["dragonslayer-burger", 4, "Big flavor, good-quality beef.", "2026-08-31"],
  ["dragonslayer-burger", 4, "Tasty, just a bit pricey for a fast-casual burger.", "2026-08-10"],
  ["houdini-burger", 4, "Mushrooms, gouda and crispy onions work really well together.", "2026-09-12"],
  ["houdini-burger", 4, "Solid burger with a lot going on.", "2026-08-22"],
  ["houdini-burger", 5, "My favorite burger on the menu. The garlic aioli is great.", "2026-07-31"],
  ["tri-tip-sandwich", 4, "Good smoky tri-tip, filling sandwich.", "2026-09-03"],
  ["tri-tip-sandwich", 3, "Decent, but I'd come back for the burgers instead.", "2026-08-17"],
  ["tri-tip-sandwich", 4, "Nice change of pace from burgers.", "2026-07-25"],
  ["cockadoodledoo", 4, "Crispy chicken and good toppings.", "2026-09-09"],
  ["cockadoodledoo", 4, "Reliable chicken sandwich, try it with the sweet potato fries.", "2026-08-19"],
  ["cockadoodledoo", 3, "Fine, not the standout on the menu.", "2026-08-02"],

  // Cupbop: 48/12 = 4.0 (Yelp 4.0)
  ["bulgogi-bop", 4, "Sweet, savory beef and a huge portion for the price.", "2026-09-17"],
  ["bulgogi-bop", 5, "My default order. Get the sauce at a 3 or 4 spice level.", "2026-08-28"],
  ["bulgogi-bop", 4, "Fast, filling and flavorful.", "2026-08-08"],
  ["hot-bop", 5, "Spicy pork with a real kick. Great value.", "2026-09-11"],
  ["hot-bop", 4, "Tasty, but be careful with the spice level!", "2026-08-21"],
  ["hot-bop", 4, "Good heat and lots of food.", "2026-07-30"],
  ["japchae", 4, "Chewy noodles and a nice sweet-savory flavor.", "2026-09-06"],
  ["japchae", 3, "Okay on its own. Better as a side.", "2026-08-16"],
  ["japchae", 4, "Good vegetarian-friendly option.", "2026-07-28"],
  ["mandoo", 4, "Crispy potstickers, good to add to a cup.", "2026-09-02"],
  ["mandoo", 4, "Solid, especially with the sauce.", "2026-08-13"],
  ["mandoo", 3, "Fine, nothing special.", "2026-07-24"],

  // Bam Bam's BBQ: 48/12 = 4.0 (Yelp 4.0)
  ["brisket-sandwich", 5, "Super tender, flavorful brisket. The reason to come here.", "2026-09-19"],
  ["brisket-sandwich", 5, "Some of the best brisket in Utah County.", "2026-08-29"],
  ["brisket-sandwich", 4, "Great brisket, the line can get long at lunch.", "2026-08-06"],
  ["pulled-pork-sandwich", 4, "Smoky and saucy, a classic done right.", "2026-09-13"],
  ["pulled-pork-sandwich", 4, "Good sandwich, go for extra sauce.", "2026-08-23"],
  ["pulled-pork-sandwich", 4, "Reliable pick if brisket is sold out.", "2026-08-01"],
  ["pork-ribs", 4, "Tender with a nice glaze.", "2026-09-07"],
  ["pork-ribs", 3, "Good, though the brisket is the better order.", "2026-08-18"],
  ["pork-ribs", 4, "Solid ribs for Utah Valley.", "2026-07-27"],
  ["swachos", 4, "A mountain of food. Easily a meal for two.", "2026-09-04"],
  ["swachos", 4, "Messy, cheesy and fun. Get it with brisket.", "2026-08-14"],
  ["swachos", 3, "Tasty but heavy, a lot of chips.", "2026-07-26"],

  // Mo' Bettahs: 32/9 = 3.56 (Yelp 3.6)
  ["kalua-pig-plate", 4, "Salty, smoky pork that's really tender. Mix it with the mac salad.", "2026-09-15"],
  ["kalua-pig-plate", 4, "Big plate lunch for the price.", "2026-08-27"],
  ["kalua-pig-plate", 3, "Good flavor, though not the juiciest kalua pig around.", "2026-08-05"],
  ["teriyaki-chicken-plate", 4, "Sweet teri sauce and juicy chicken thigh.", "2026-09-10"],
  ["teriyaki-chicken-plate", 4, "Easy, reliable plate lunch.", "2026-08-20"],
  ["teriyaki-chicken-plate", 3, "Fine for fast food, nothing special.", "2026-07-31"],
  ["katsu-chicken-plate", 4, "Crunchy and filling, good katsu sauce.", "2026-09-05"],
  ["katsu-chicken-plate", 3, "Heavier than the other plates, but it hits the spot.", "2026-08-15"],
  ["katsu-chicken-plate", 3, "Okay. I'd go with the teriyaki next time.", "2026-07-25"],

  // Brick Oven: 30/9 = 3.33 (Yelp 3.3)
  ["buffalo-chicken-pizza", 4, "Good flavor with a mild buffalo kick.", "2026-09-14"],
  ["buffalo-chicken-pizza", 3, "Decent, though the buffalo flavor is on the mild side.", "2026-08-24"],
  ["buffalo-chicken-pizza", 4, "Pair it with the house root beer.", "2026-08-03"],
  ["deep-dish-lasagna", 3, "Filling and cheesy, but pretty average.", "2026-09-08"],
  ["deep-dish-lasagna", 3, "Okay lasagna, good for a big family dinner.", "2026-08-17"],
  ["deep-dish-lasagna", 4, "Comforting and generous portion.", "2026-07-29"],
  ["spinach-artichoke-dip", 3, "Fine starter, nothing too memorable.", "2026-09-01"],
  ["spinach-artichoke-dip", 3, "Warm and cheesy, pretty mild in flavor.", "2026-08-11"],
  ["spinach-artichoke-dip", 3, "Good for sharing, but I'd skip it next time.", "2026-07-24"],
];

export const seedReviews: Review[] = reviewRows.map(([dishId, rating, text, date], i) => ({
  id: `sample-${i + 1}`,
  dishId,
  rating,
  text,
  authorName: "DishUp sample",
  createdAt: `${date}T18:00:00.000Z`,
  isSample: true,
}));
