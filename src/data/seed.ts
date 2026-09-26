// Fake data for the MVP. Restaurants are fictional; dish photos come from TheMealDB
// (https://www.themealdb.com) and live in /public/images/dishes.
import type { Dish, Restaurant, Review } from "@/lib/types";

const img = (slug: string) => `/images/dishes/${slug}.jpg`;

export const restaurants: Restaurant[] = [
  {
    id: "nonnas-table",
    name: "Nonna's Table",
    city: "Provo",
    neighborhood: "Downtown Provo",
    cuisine: "Italian",
    priceLevel: 2,
    style: "casual",
    imageUrl: img("margherita-pizza"),
    description:
      "Family-style Italian with wood-fired pizza, fresh pasta made every morning, and a dessert case you'll walk past twice.",
  },
  {
    id: "little-saigon-kitchen",
    name: "Little Saigon Kitchen",
    city: "Orem",
    neighborhood: "State Street",
    cuisine: "Vietnamese",
    priceLevel: 1,
    style: "casual",
    imageUrl: img("beef-pho"),
    description:
      "A cozy noodle house simmering pho broth for 12 hours, plus crusty banh mi and street-food snacks.",
  },
  {
    id: "taqueria-el-sol",
    name: "Taqueria El Sol",
    city: "Provo",
    neighborhood: "University Ave",
    cuisine: "Mexican",
    priceLevel: 1,
    style: "fast",
    imageUrl: img("cajun-fish-tacos"),
    description:
      "Counter-service tacos, enchiladas and fresh churros. Quick, cheap and a student favorite.",
  },
  {
    id: "cedar-and-flame",
    name: "Cedar & Flame Grill",
    city: "Salt Lake City",
    neighborhood: "Sugar House",
    cuisine: "Steakhouse",
    priceLevel: 4,
    style: "fine",
    imageUrl: img("steak-diane"),
    description:
      "An upscale grill known for hand-cut steaks, cedar-plank fish and a classic New York cheesecake.",
  },
  {
    id: "harvest-bowl-co",
    name: "Harvest Bowl Co.",
    city: "Orem",
    neighborhood: "University Place",
    cuisine: "Healthy",
    priceLevel: 2,
    style: "fast",
    imageUrl: img("salmon-avocado-salad"),
    description:
      "Fast, fresh bowls and salads built on seasonal produce, with plenty of vegetarian options.",
  },
  {
    id: "sugar-loaf-bakery",
    name: "Sugar Loaf Bakery",
    city: "Salt Lake City",
    neighborhood: "9th & 9th",
    cuisine: "Bakery & Desserts",
    priceLevel: 1,
    style: "casual",
    imageUrl: img("carrot-cake"),
    description:
      "A neighborhood bakery for pies by the slice, layer cakes and cookies still warm from the oven.",
  },
];

export const dishes: Dish[] = [
  // Nonna's Table
  { id: "margherita-pizza", restaurantId: "nonnas-table", name: "Margherita Pizza", course: "main", price: 14, imageUrl: img("margherita-pizza"), description: "San Marzano tomato, fresh mozzarella and basil on a blistered wood-fired crust." },
  { id: "classic-lasagne", restaurantId: "nonnas-table", name: "Classic Lasagne", course: "main", price: 18, imageUrl: img("classic-lasagne"), description: "Layers of fresh pasta, slow-cooked beef ragù, béchamel and parmesan." },
  { id: "spaghetti-carbonara", restaurantId: "nonnas-table", name: "Spaghetti Carbonara", course: "main", price: 17, imageUrl: img("spaghetti-carbonara"), description: "Egg yolk, pecorino, crispy guanciale and plenty of black pepper." },
  { id: "salmon-prawn-risotto", restaurantId: "nonnas-table", name: "Salmon & Prawn Risotto", course: "main", price: 24, imageUrl: img("salmon-prawn-risotto"), description: "Creamy arborio rice with flaked salmon, prawns and lemon." },
  { id: "strawberry-tart", restaurantId: "nonnas-table", name: "Strawberry Tart", course: "dessert", price: 8, imageUrl: img("strawberry-tart"), description: "Buttery pastry, vanilla custard and glazed fresh strawberries." },

  // Little Saigon Kitchen
  { id: "beef-pho", restaurantId: "little-saigon-kitchen", name: "Beef Pho", course: "main", price: 13, imageUrl: img("beef-pho"), description: "12-hour beef broth, rice noodles, sliced brisket, meatballs and fresh herbs." },
  { id: "turkey-banh-mi", restaurantId: "little-saigon-kitchen", name: "Turkey Banh Mi", course: "main", price: 10, imageUrl: img("turkey-banh-mi"), description: "Crusty baguette with lemongrass turkey, pickled veggies, jalapeño and cilantro." },
  { id: "grilled-pork-vermicelli", restaurantId: "little-saigon-kitchen", name: "Grilled Pork Vermicelli", course: "main", price: 14, imageUrl: img("grilled-pork-vermicelli"), description: "Bún thịt nướng: charred pork over rice noodles with herbs and nước chấm." },
  { id: "rice-paper-dumplings", restaurantId: "little-saigon-kitchen", name: "Rice Paper Dumplings", course: "appetizer", price: 8, imageUrl: img("rice-paper-dumplings"), description: "Pan-crisped rice paper parcels with a chili-sesame dipping sauce." },
  { id: "laksa-prawn-noodles", restaurantId: "little-saigon-kitchen", name: "Laksa Prawn Noodles", course: "main", price: 16, imageUrl: img("laksa-prawn-noodles"), description: "King prawns in a rich coconut-curry broth with thick noodles." },

  // Taqueria El Sol
  { id: "cajun-fish-tacos", restaurantId: "taqueria-el-sol", name: "Cajun Fish Tacos", course: "main", price: 11, imageUrl: img("cajun-fish-tacos"), description: "Spiced white fish, crunchy slaw and lime crema on warm tortillas." },
  { id: "chicken-enchiladas", restaurantId: "taqueria-el-sol", name: "Chicken Enchiladas", course: "main", price: 12, imageUrl: img("chicken-enchiladas"), description: "Shredded chicken rolled in corn tortillas, red sauce and melted cheese." },
  { id: "chickpea-fajitas", restaurantId: "taqueria-el-sol", name: "Chickpea Fajitas", course: "main", price: 10, imageUrl: img("chickpea-fajitas"), description: "Smoky roasted chickpeas and peppers with tortillas and salsa." },
  { id: "churros", restaurantId: "taqueria-el-sol", name: "Churros", course: "dessert", price: 5, imageUrl: img("churros"), description: "Fried to order, rolled in cinnamon sugar, with chocolate for dipping." },

  // Cedar & Flame Grill
  { id: "steak-diane", restaurantId: "cedar-and-flame", name: "Steak Diane", course: "main", price: 48, imageUrl: img("steak-diane"), description: "Peppercorn-crusted filet with a brandy-mushroom pan sauce and crispy potatoes." },
  { id: "flame-grilled-burger", restaurantId: "cedar-and-flame", name: "The Aussie Burger", course: "main", price: 22, imageUrl: img("flame-grilled-burger"), description: "Flame-grilled patty with a fried egg, beetroot, caramelized onion and cheddar." },
  { id: "honey-teriyaki-salmon", restaurantId: "cedar-and-flame", name: "Honey Teriyaki Salmon", course: "main", price: 36, imageUrl: img("honey-teriyaki-salmon"), description: "Cedar-plank salmon glazed with honey teriyaki over jasmine rice." },
  { id: "crispy-chicken-wings", restaurantId: "cedar-and-flame", name: "Crispy Chicken Wings", course: "appetizer", price: 16, imageUrl: img("crispy-chicken-wings"), description: "Twice-fried wings with house hot sauce and blue cheese dip." },
  { id: "new-york-cheesecake", restaurantId: "cedar-and-flame", name: "New York Cheesecake", course: "dessert", price: 12, imageUrl: img("new-york-cheesecake"), description: "Dense, tangy and tall, on a graham cracker crust." },

  // Harvest Bowl Co.
  { id: "salmon-avocado-salad", restaurantId: "harvest-bowl-co", name: "Salmon Avocado Salad", course: "main", price: 15, imageUrl: img("salmon-avocado-salad"), description: "Roasted salmon, avocado, greens and a lemon-herb vinaigrette." },
  { id: "noodle-bowl-salad", restaurantId: "harvest-bowl-co", name: "Noodle Bowl Salad", course: "main", price: 13, imageUrl: img("noodle-bowl-salad"), description: "Chilled noodles, crunchy vegetables, herbs and a sweet chili dressing." },
  { id: "thai-rice-noodle-salad", restaurantId: "harvest-bowl-co", name: "Thai Rice Noodle Salad", course: "main", price: 13, imageUrl: img("thai-rice-noodle-salad"), description: "Rice noodles tossed with peanuts, lime, mint and shredded veggies." },
  { id: "shakshuka", restaurantId: "harvest-bowl-co", name: "Shakshuka", course: "main", price: 12, imageUrl: img("shakshuka"), description: "Eggs poached in spiced tomato and pepper sauce, served with toast." },
  { id: "vegetarian-chilli", restaurantId: "harvest-bowl-co", name: "Vegetarian Chilli", course: "main", price: 11, imageUrl: img("vegetarian-chilli"), description: "Three-bean chilli with sweet potato, topped with yogurt and cilantro." },

  // Sugar Loaf Bakery
  { id: "apple-pie", restaurantId: "sugar-loaf-bakery", name: "Apple Pie", course: "dessert", price: 6, imageUrl: img("apple-pie"), description: "Flaky lattice crust over cinnamon-spiced apples. Sold by the slice." },
  { id: "carrot-cake", restaurantId: "sugar-loaf-bakery", name: "Carrot Cake", course: "dessert", price: 7, imageUrl: img("carrot-cake"), description: "Moist spiced cake with walnuts and cream cheese frosting." },
  { id: "key-lime-pie", restaurantId: "sugar-loaf-bakery", name: "Key Lime Pie", course: "dessert", price: 6, imageUrl: img("key-lime-pie"), description: "Tart lime custard, graham crust and whipped cream." },
  { id: "cinnamon-roll-cookies", restaurantId: "sugar-loaf-bakery", name: "Cinnamon Roll Cookies", course: "dessert", price: 3, imageUrl: img("cinnamon-roll-cookies"), description: "Swirled butter cookies with a cream cheese glaze." },
  { id: "chocolate-raspberry-brownies", restaurantId: "sugar-loaf-bakery", name: "Chocolate Raspberry Brownie", course: "dessert", price: 4, imageUrl: img("chocolate-raspberry-brownies"), description: "Fudgy dark-chocolate brownie studded with fresh raspberries." },
];

// [dishId, rating, author, text, date]
const reviewRows: [string, number, string, string, string][] = [
  ["margherita-pizza", 5, "Jessica M.", "Perfectly charred crust and the basil tastes like it was picked this morning. Best margherita in Utah County.", "2026-09-12"],
  ["margherita-pizza", 5, "Tyler R.", "Simple and done right. The mozzarella is so fresh. I order this every single time.", "2026-08-30"],
  ["margherita-pizza", 4, "Hannah L.", "Really good, a little soggy in the middle but the flavor makes up for it.", "2026-08-02"],
  ["classic-lasagne", 5, "Marcus D.", "Huge portion and the ragù is incredible. Had leftovers for two days.", "2026-09-05"],
  ["classic-lasagne", 4, "Emily W.", "Rich and comforting. Could use a bit more sauce but I'd get it again.", "2026-07-21"],
  ["spaghetti-carbonara", 4, "Sam K.", "Authentic style with no cream, silky sauce and crispy guanciale. Slightly salty.", "2026-09-18"],
  ["spaghetti-carbonara", 3, "Olivia P.", "Good but the pasta was a touch overcooked the night I went.", "2026-08-11"],
  ["salmon-prawn-risotto", 4, "Grace T.", "Creamy and generous with the prawns. A great pick if you're not in a pasta mood.", "2026-08-25"],
  ["beef-pho", 5, "Kevin N.", "The broth is deep and clear, not greasy at all. Tastes like my grandma's.", "2026-09-20"],
  ["beef-pho", 5, "Ashley B.", "Perfect on a cold day. Load it up with the fresh herbs and lime.", "2026-09-01"],
  ["beef-pho", 4, "Jordan F.", "Great broth, wish there was a little more brisket for the price.", "2026-08-14"],
  ["turkey-banh-mi", 4, "Chris H.", "Baguette is crackly on the outside and soft inside. Pickles are the star.", "2026-09-09"],
  ["turkey-banh-mi", 5, "Megan S.", "Cheap, fast and delicious. My go-to lunch between classes.", "2026-08-19"],
  ["grilled-pork-vermicelli", 5, "Daniel V.", "Smoky pork, lots of herbs and the dipping sauce is addictive.", "2026-09-14"],
  ["grilled-pork-vermicelli", 4, "Rachel C.", "Fresh and light but still filling. Ask for extra nước chấm.", "2026-08-06"],
  ["rice-paper-dumplings", 4, "Brandon G.", "Crispy edges, chewy middle and the chili sauce has a real kick.", "2026-09-03"],
  ["laksa-prawn-noodles", 3, "Lauren A.", "Nice coconut broth but not as spicy as I hoped and only four prawns.", "2026-08-28"],
  ["laksa-prawn-noodles", 4, "Ethan Y.", "Rich and comforting. Would get it again on a rainy day.", "2026-07-30"],
  ["cajun-fish-tacos", 5, "Sofia R.", "Fish is crispy and well-seasoned, and the lime crema ties it all together. Get three.", "2026-09-22"],
  ["cajun-fish-tacos", 4, "Nate J.", "Solid tacos for the price. Slaw could use a bit more acid.", "2026-09-07"],
  ["chicken-enchiladas", 3, "Brooke E.", "Tasty sauce but it was pretty mushy. Fine for a cheap meal.", "2026-08-21"],
  ["chicken-enchiladas", 2, "Caleb M.", "Mostly cheese and not much chicken. The tacos are the better call here.", "2026-08-03"],
  ["churros", 5, "Mia Z.", "Hot, crispy and not greasy. The chocolate sauce is thick and rich. Dangerous.", "2026-09-16"],
  ["churros", 5, "Logan T.", "Worth the trip just for these.", "2026-08-27"],
  ["steak-diane", 5, "Victoria K.", "Cooked a perfect medium-rare and the pan sauce is next level. Pricey but worth it.", "2026-09-19"],
  ["steak-diane", 4, "Andrew P.", "Excellent steak, the potatoes were a little under-seasoned.", "2026-08-15"],
  ["flame-grilled-burger", 4, "Isaac L.", "Messy in the best way. The beetroot sounded weird but it totally works.", "2026-09-11"],
  ["flame-grilled-burger", 3, "Chloe D.", "Big and juicy but $22 for a burger is a lot.", "2026-08-08"],
  ["honey-teriyaki-salmon", 4, "Natalie H.", "Sweet glaze, flaky fish and a nice smoky flavor from the plank.", "2026-09-02"],
  ["crispy-chicken-wings", 5, "Tyler R.", "Shatteringly crispy. The hot sauce has real heat. Best wings in SLC.", "2026-09-13"],
  ["crispy-chicken-wings", 4, "Jenna O.", "Great crunch. I'd skip the blue cheese and go for ranch.", "2026-08-17"],
  ["new-york-cheesecake", 5, "Emily W.", "Dense, creamy and not too sweet. The real deal.", "2026-09-06"],
  ["new-york-cheesecake", 5, "Ryan B.", "Split it with the table and immediately regretted sharing.", "2026-07-25"],
  ["salmon-avocado-salad", 4, "Abby N.", "Fresh and actually filling for a salad. Salmon was cooked well.", "2026-09-17"],
  ["salmon-avocado-salad", 4, "Josh W.", "My go-to healthy lunch. Dressing is great.", "2026-08-22"],
  ["noodle-bowl-salad", 3, "Kayla F.", "Pretty good but the dressing was too sweet for me.", "2026-09-04"],
  ["thai-rice-noodle-salad", 4, "Mason R.", "Loads of peanuts and mint. Super refreshing.", "2026-08-29"],
  ["shakshuka", 5, "Leah G.", "Runny yolks, spicy sauce, great bread for dipping. A perfect brunch.", "2026-09-21"],
  ["shakshuka", 4, "Spencer C.", "Really flavorful, though I wish it came with more toast.", "2026-08-09"],
  ["vegetarian-chilli", 2, "Tanner S.", "Bland and watery the day I went. Needed a lot more spice.", "2026-08-31"],
  ["vegetarian-chilli", 3, "Maddie K.", "Hearty and healthy but nothing special.", "2026-07-28"],
  ["apple-pie", 5, "Grace T.", "The crust is unbelievably flaky. Get it warm with ice cream.", "2026-09-15"],
  ["apple-pie", 4, "Ben A.", "Classic and comforting. Apples are a little firm, which I like.", "2026-08-12"],
  ["carrot-cake", 5, "Hannah L.", "Moist, spiced perfectly and the frosting is to die for.", "2026-09-10"],
  ["carrot-cake", 5, "Marcus D.", "Best carrot cake I've ever had. Huge slice too.", "2026-08-20"],
  ["key-lime-pie", 4, "Olivia P.", "Nice and tart. The graham crust is buttery.", "2026-09-08"],
  ["cinnamon-roll-cookies", 4, "Sam K.", "Tastes like a cinnamon roll in cookie form. Great with milk.", "2026-08-26"],
  ["chocolate-raspberry-brownies", 3, "Chloe D.", "Fudgy but the raspberries made it a bit soggy.", "2026-09-12"],
  ["chocolate-raspberry-brownies", 4, "Kevin N.", "Rich and chocolatey. The tart raspberries balance the sweetness.", "2026-08-04"],
];

export const seedReviews: Review[] = reviewRows.map(
  ([dishId, rating, authorName, text, date], i) => ({
    id: `seed-${i + 1}`,
    dishId,
    rating,
    authorName,
    text,
    createdAt: `${date}T18:00:00.000Z`,
  }),
);
