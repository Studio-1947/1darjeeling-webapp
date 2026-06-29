export interface Cafe {
  id: string;
  name: string;
  area: string;
  rating: number;
  established: string;
  specialty: string;
  priceRange: string;
  blurb: string;
  hours: string;
  photo: string;
}

export const cafes: Cafe[] = [
  {
    id: "glenarys",
    name: "Glenary's Bakery & Pub",
    area: "Mall Road",
    rating: 4.8,
    established: "1885",
    specialty: "Apple pie, pastries, and English tea",
    priceRange: "₹200–500 for two",
    blurb:
      "A two-story colonial landmark. The ground floor houses the famous white-fronted bakery, while the upper floor features a restaurant and pub with panoramic valley views.",
    hours: "7:00 AM – 9:30 PM",
    photo: "https://thecsrjournal.in/wp-content/uploads/2025/12/Glenarys-Darjeeling.jpg",
  },
  {
    id: "keventers",
    name: "Keventer's",
    area: "Club Side, near Mall",
    rating: 4.7,
    established: "1911",
    specialty: "Sausages, bacon, and hot chocolate",
    priceRange: "₹300–600 for two",
    blurb:
      "Famous for its open-air terrace seating where you can enjoy a full English breakfast while looking at Kanchenjunga. Made famous in several Indian films.",
    hours: "8:00 AM – 6:30 PM",
    photo: "/kevs.jpg",
  },
  {
    id: "hot-stimulating-cafe",
    name: "Hot Stimulating Cafe",
    area: "Jawahar Road (on way to Zoo)",
    rating: 4.9,
    established: "1998",
    specialty: "Handmade veg momos & masala tea",
    priceRange: "₹80–150 for two",
    blurb:
      "A rustic, cozy shack perched on the hillside run by the warm host Rumba. Known for its alternative vibe, Bob Marley tunes, and guest book signed by travelers from across the globe.",
    hours: "9:00 AM – 7:00 PM",
    photo: "https://media-cdn.tripadvisor.com/media/photo-s/03/a9/5b/1e/hot-stimulating-cafe.jpg",
  },
  {
    id: "himalayan-java",
    name: "Himalayan Java Coffee",
    area: "Chowrasta Mall",
    rating: 4.6,
    established: "2015",
    specialty: "Espresso, local coffee blends, waffles",
    priceRange: "₹250–500 for two",
    blurb:
      "A modern, premium coffee shop overlooking the main Chowrasta square. Exceptional local single-origin coffee beans and reliable high-speed internet.",
    hours: "8:00 AM – 8:00 PM",
    photo: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/5b/e2/ff/photo1jpg.jpg?w=500&h=-1&s=1",
  },
  {
    id: "nanking",
    name: "Nanking Restaurant",
    area: "Laden La Road",
    rating: 4.5,
    established: "1970s",
    specialty: "Cantonese noodles and clear soups",
    priceRange: "₹250–450 for two",
    blurb:
      "One of the oldest Chinese restaurants in town, preserving old-school wooden booths and serving comforting Indo-Tibetan-Chinese plates suited for cold evenings.",
    hours: "11:30 AM – 8:30 PM",
    photo: "https://b.zmtcdn.com/data/pictures/0/18743150/90e8687d9d6f0dade1dcb4f7acfe81cf.jpg",
  },
];
