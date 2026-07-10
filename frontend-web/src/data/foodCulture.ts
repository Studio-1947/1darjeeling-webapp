export type FoodCategory = 'community' | 'delicacy' | 'beverage' | 'landmark';

export interface FoodItem {
  slug: string;
  name: string;
  category: FoodCategory;
  categoryLabel: string;
  description: string;
  photo: string;
  /** Short badge, e.g. a community tag. */
  tag?: string;
  /** A labelled highlight, e.g. "Best paired with" / "Where to try" / "Must order". */
  noteLabel?: string;
  note?: string;
}

export const CATEGORY_LABEL: Record<FoodCategory, string> = {
  community: 'Cultural Influence',
  delicacy: 'Local Delicacy',
  beverage: 'Mountain Beverage',
  landmark: 'Culinary Landmark',
};

export const CATEGORY_ICON: Record<FoodCategory, string> = {
  community: '/tags.svg',
  delicacy: '/price.svg',
  beverage: '/established.svg',
  landmark: '/location.svg',
};

export const foodItems: FoodItem[] = [
  // ---- Cultural influences ----
  {
    slug: 'gorkhas-and-nepalese',
    name: 'The Gorkhas and Nepalese',
    category: 'community',
    categoryLabel: CATEGORY_LABEL.community,
    description:
      'The majority population brings ethnic Nepali staples. Traditional meals feature Dal Bhaat (lentils and rice) accompanied by spicy meat curries, Gundruk Ko Achar (fermented mustard leaf pickle), and Sel Roti on celebratory occasions.',
    photo: 'https://media.easy-peasy.ai/80e6c8e3-a04d-4ba3-92c0-902d4a874a90/c144a1b2-036f-433b-94ba-081f616111c7_medium.webp',
    tag: 'Ethnic Gorkha',
  },
  {
    slug: 'the-tibetans',
    name: 'The Tibetans',
    category: 'community',
    categoryLabel: CATEGORY_LABEL.community,
    description:
      'Migrants from across the border have heavily influenced local street food culture. Hearty, cold-weather staples like Thukpa (warm noodle soup), Shaphaley (crispy beef/veg stuffed bread), and steamed Momos are central to the high-altitude diet.',
    photo: 'https://data.tibettravel.org/assets/images/tibet/polyandry-in-tibet-thumbnail.jpg',
    tag: 'Tibetan Highlands',
  },
  {
    slug: 'lepchas-and-bhutias',
    name: 'The Indigenous Lepchas & Bhutias',
    category: 'community',
    categoryLabel: CATEGORY_LABEL.community,
    description:
      'The original guardians of the hills introduced wild, foraged, fermented, and fresh mountain ingredients. Their food habits emphasize organic farming, forest greens, mushrooms, and traditional home-brewed millet beers.',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_BPmVnFq3QrPVWR68lmjhnRdQylTvZ6Yqo__FrUZD4YuYV8NPFqjtuMA&s=10',
    tag: 'Native Tribes',
  },
  {
    slug: 'plains-and-british-planters',
    name: 'Plains & British Planters',
    category: 'community',
    categoryLabel: CATEGORY_LABEL.community,
    description:
      "The influx of tourists and colonial settlers introduced high-tea customs, European bakes, and breakfast houses (like Keventer's), while plains migrants added tangier, spicier Indian street foods like Aloo Dum and Puchka.",
    photo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/1933_British_Everest_Expedition_in_Darjeeling.jpg',
    tag: 'Colonial & Plains',
  },

  // ---- Delicacies ----
  {
    slug: 'momos',
    name: 'Momos',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      'The undisputed king of Darjeeling street food. Hand-rolled wheat dumplings stuffed with juicy minced chicken, pork, or vegetables, steamed to perfection and served with a spicy regional red tomato-chilli sauce.',
    photo: 'https://static.india.com/wp-content/uploads/2024/12/FEATURE-2024-12-15T174448.090.jpg?impolicy=Medium_Widthonly&w=350&h=263',
    noteLabel: 'Best paired with',
    note: 'Fiery tomato-chilli chutney',
  },
  {
    slug: 'thukpa',
    name: 'Thukpa',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      "A comforting Tibetan-style noodle soup packed with fresh local greens, shredded meat or vegetables, simmered in a piping-hot, aromatic ginger-garlic broth. The perfect antidote to Darjeeling's misty, chilly evenings.",
    photo: 'https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/4x3/4x3-veg-thukpa-soup.jpg',
    noteLabel: 'Best paired with',
    note: 'Shaphaley (stuffed fried bread)',
  },
  {
    slug: 'aloo-dum',
    name: 'Aloo Dum',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      'Spicy, slow-cooked baby potatoes tossed in a rich gravy of ground red chillies, mustard oil, and local spices. It is often served alongside Poori (puffed bread) or topped with Bhujia (crispy chickpea noodles) as a popular street snack.',
    photo: 'https://www.cookingcarnival.com/wp-content/uploads/2016/04/Kashmiri-Dum-Aloo-4.jpg',
    noteLabel: 'Best paired with',
    note: 'Bhujia and chopped onions',
  },
  {
    slug: 'sel-roti',
    name: 'Sel Roti',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      'A crispy, sweet rice-flour ring bread, mildly flavored with cardamom and ghee. It is traditionally prepared by hand during Tihar (Diwali) and other festive seasons, eaten warm with spicy potato curries.',
    photo: 'https://delishglobe.com/wp-content/uploads/2025/05/Sel-Roti-Nepali-Rice-Doughnut.png',
    noteLabel: 'Best paired with',
    note: 'Aloo Dum or hot milk tea',
  },
  {
    slug: 'churpee',
    name: 'Churpee',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      'A traditional, hard Himalayan cheese made from yak or cow milk. It is famously known for its long-lasting chewiness and is a popular snack that locals chew to keep warm in the freezing mountain weather.',
    photo: 'https://thebuddhistshop.in/cdn/shop/products/kalimpongchurpi.jpg?v=1630734983&width=1445',
    noteLabel: 'Enjoyed as',
    note: 'A snack or grated into soups',
  },
  {
    slug: 'gundruk',
    name: 'Gundruk',
    category: 'delicacy',
    categoryLabel: CATEGORY_LABEL.delicacy,
    description:
      'Fermented, sun-dried leafy mustard or radish greens that are deeply aromatic and tangy. It is a legendary staple cooked into a sour soup or served as a pickle (Ko Achar) with traditional meals.',
    photo: 'https://m.media-amazon.com/images/I/61NNzjkRVgL.jpg',
    noteLabel: 'Best paired with',
    note: 'Steamed rice and local ghee',
  },

  // ---- Beverages ----
  {
    slug: 'darjeeling-tea',
    name: 'Darjeeling Tea',
    category: 'beverage',
    categoryLabel: CATEGORY_LABEL.beverage,
    description:
      'Globally celebrated as the "Champagne of Teas," this light-bodied, highly aromatic brew features distinct muscatel grape notes. Best enjoyed without milk or sugar, direct from single-estate first or second flushes.',
    photo: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Where to try',
    note: 'Makaibari, Happy Valley, or Castleton estates',
  },
  {
    slug: 'tongba',
    name: 'Tongba',
    category: 'beverage',
    categoryLabel: CATEGORY_LABEL.beverage,
    description:
      'A traditional Limbu alcoholic brew made of fermented whole millet. Served warm in a tall wooden vessel, filled with hot water and sipped slowly through a perforated bamboo straw as it continually infuses.',
    photo: 'https://thebuzznepal.com/wp-content/uploads/2024/04/1592137659880.jpeg',
    noteLabel: 'Where to try',
    note: 'Local mountain taverns (Bhattis)',
  },

  // ---- Culinary landmarks ----
  {
    slug: 'glenarys-bakery-pub',
    name: "Glenary's Bakery & Pub",
    category: 'landmark',
    categoryLabel: CATEGORY_LABEL.landmark,
    description:
      'A landmark colonial white-fronted building. The ground floor bakery offers legendary pastries, meat pies, and Darjeeling tea, while the upper floor features a lively British-style pub and restaurant with mountain views.',
    photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Apple Pie, Cinnamon Buns, & Hot Chocolate',
  },
  {
    slug: 'kunga-restaurant',
    name: 'Kunga Restaurant',
    category: 'landmark',
    categoryLabel: CATEGORY_LABEL.landmark,
    description:
      'A small, cozy, family-run eatery right on Gandhi Road, famous for serving the most authentic Tibetan food in the hills. Known for its rich, thick broths, handmade noodles, and generous momo plates.',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Chicken Steamed Momos & Gyathuk noodle soup',
  },
  {
    slug: 'keventers',
    name: "Keventer's",
    category: 'landmark',
    categoryLabel: CATEGORY_LABEL.landmark,
    description:
      'Established in 1911, this open-air terrace joint is famous for its classic English breakfast platter. Grab a seat on the rooftop balcony and enjoy a view of the mountains over a pot of tea.',
    photo: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Pork Sausage platter, Fried Eggs, & Milkshakes',
  },
];

export function foodByCategory(category: FoodCategory): FoodItem[] {
  return foodItems.filter((i) => i.category === category);
}

export function findFoodBySlug(slug: string): FoodItem | undefined {
  return foodItems.find((i) => i.slug === slug);
}
