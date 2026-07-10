export interface OffbeatPlace {
  name: string;
  distance: string;
  time: string;
  description: string;
  tags: string[];
  photo?: string;
  altitude?: string;
  bestTime?: string;
  rating?: number;
  reviews?: number;
  activities?: string[];
}

export const offbeatPlaces: OffbeatPlace[] = [
  {
    name: 'Tinchuley',
    distance: '32 km',
    time: '2 hours',
    description:
      'Located about 32 km (2 hours) from Darjeeling, this small eco-village is famous for its tea gardens, orange orchards, and a spectacular viewpoint that offers a 360-degree view of the Teesta River and the Himalayas.',
    tags: ['Eco-village', 'Tea Gardens', 'Teesta View'],
    photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    altitude: '5,800 ft',
    bestTime: 'Oct - Apr',
    rating: 4.8,
    reviews: 124,
    activities: ['Sunrise Watching', 'Tea Estate Walk', 'Forest Hike'],
  },
  {
    name: 'Lamahatta',
    distance: '23 km',
    time: '1 hour',
    description:
      'Just 23 km (1 hour) from Darjeeling, this picturesque village is renowned for its pine forests, a winding uphill trek leading to the sacred "Twin Lakes," and vibrant terraced gardens.',
    tags: ['Pine Forests', 'Twin Lakes', 'Terraced Gardens'],
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    altitude: '5,700 ft',
    bestTime: 'Oct - Mar',
    rating: 4.7,
    reviews: 98,
    activities: ['Twin Lake Trek', 'Garden Walk', 'Bird Watching'],
  },
  {
    name: 'Chatakpur',
    distance: '26 km',
    time: '1.5 hours',
    description:
      'Nestled inside the Senchal Wildlife Sanctuary and located 26 km from the main town, this tiny eco-village offers incredible sunrise views over the Eastern Himalayas directly opposite Tiger Hill.',
    tags: ['Wildlife Sanctuary', 'Sunrise View', 'Tiger Hill view'],
    photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    altitude: '7,887 ft',
    bestTime: 'Oct - Apr',
    rating: 4.9,
    reviews: 86,
    activities: ['Wildlife Safari', 'Trekking', 'Himalayan Sunrise'],
  },
  {
    name: 'Sittong',
    distance: '40 km',
    time: '2 hours',
    description:
      'Known as the "Orange Valley" of the region, Sittong is about 40 km (2 hours) from Darjeeling. It is famous for its vibrant winter orange orchards, dense forests, and close-up views of Kanchenjunga.',
    tags: ['Orange Valley', 'Kanchenjunga View', 'Orchards'],
    photo: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    altitude: '4,000 ft',
    bestTime: 'Nov - Jan',
    rating: 4.6,
    reviews: 112,
    activities: ['Orange Plucking', 'River Crossing', 'Bamboo Bridge'],
  },
  {
    name: 'Tabakoshi',
    distance: '50 km',
    time: '2.5 hours',
    description:
      'Situated near Mirik, this peaceful settlement is surrounded by the Gopaldhara Tea Estate and is perfect for nature walks beside the Rangbhang River.',
    tags: ['Mirik nearby', 'Tea Estate', 'River Walk'],
    photo: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    altitude: '3,100 ft',
    bestTime: 'Sep - May',
    rating: 4.8,
    reviews: 74,
    activities: ['Riverside Camping', 'Organic Farm Visit', 'Tea Tasting'],
  },
  {
    name: 'Rimbik',
    distance: '56 km',
    time: '3 hours',
    description:
      'A quiet town near the Singalila National Park, famous for its trekker trails, beautiful pine forests, and serene views of the mountain ranges.',
    tags: ['Trekking Hub', 'Pine Woods', 'Mountain Views'],
    photo: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    altitude: '6,500 ft',
    bestTime: 'Mar - Jun, Oct - Dec',
    rating: 4.7,
    reviews: 45,
    activities: ['Forest Trekking', 'River Valley Walk', 'Local Culture'],
  },
  {
    name: 'Lepchajagat',
    distance: '19 km',
    time: '45 minutes',
    description:
      'A secluded, peaceful hamlet surrounded by dense oak, fir, and rhododendron forests, offering majestic views of Mount Kanchenjunga.',
    tags: ['Oak Forests', 'Kanchenjunga', 'Tranquility'],
    photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    altitude: '6,956 ft',
    bestTime: 'Oct - Apr',
    rating: 4.8,
    reviews: 160,
    activities: ['Nature Walks', 'Bird Watching', 'Sunset Viewing'],
  },
  {
    name: 'Takdah',
    distance: '28 km',
    time: '1.5 hours',
    description:
      'A historic cantonment area from the British era, featuring old colonial bungalows, pine paths, and the famous Takdah Orchid Center.',
    tags: ['Colonial Bungalows', 'Orchid Center', 'Pine Trails'],
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    altitude: '5,100 ft',
    bestTime: 'Oct - Mar',
    rating: 4.6,
    reviews: 72,
    activities: ['Orchid Garden Visit', 'Bungalow Trail', 'Tea Garden Walk'],
  },
  {
    name: 'Mirik',
    distance: '49 km',
    time: '2.5 hours',
    description:
      'A picturesque tourist town centered around the serene Sumendu Lake, lined by pine trees and connected by a footbridge.',
    tags: ['Sumendu Lake', 'Pine Trees', 'Boating'],
    photo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Mirik_lake_panorama.jpg',
    altitude: '4,900 ft',
    bestTime: 'Sep - Jun',
    rating: 4.5,
    reviews: 240,
    activities: ['Boating', 'Horse Riding', 'Tea Garden Views'],
  },
];

/** URL-safe slug for an offbeat place (their data has no id). */
export function offbeatSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function findOffbeatBySlug(slug: string): OffbeatPlace | undefined {
  return offbeatPlaces.find((p) => offbeatSlug(p.name) === slug);
}
