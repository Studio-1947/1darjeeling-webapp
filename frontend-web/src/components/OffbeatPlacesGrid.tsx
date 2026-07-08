import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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

const offbeatPlacesData: OffbeatPlace[] = [
  {
    name: 'Tinchuley',
    distance: '32 km',
    time: '2 hours',
    description: 'Located about 32 km (2 hours) from Darjeeling, this small eco-village is famous for its tea gardens, orange orchards, and a spectacular viewpoint that offers a 360-degree view of the Teesta River and the Himalayas.',
    tags: ['Eco-village', 'Tea Gardens', 'Teesta View'],
    photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    altitude: '5,800 ft',
    bestTime: 'Oct - Apr',
    rating: 4.8,
    reviews: 124,
    activities: ['Sunrise Watching', 'Tea Estate Walk', 'Forest Hike']
  },
  {
    name: 'Lamahatta',
    distance: '23 km',
    time: '1 hour',
    description: 'Just 23 km (1 hour) from Darjeeling, this picturesque village is renowned for its pine forests, a winding uphill trek leading to the sacred "Twin Lakes," and vibrant terraced gardens.',
    tags: ['Pine Forests', 'Twin Lakes', 'Terraced Gardens'],
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    altitude: '5,700 ft',
    bestTime: 'Oct - Mar',
    rating: 4.7,
    reviews: 98,
    activities: ['Twin Lake Trek', 'Garden Walk', 'Bird Watching']
  },
  {
    name: 'Chatakpur',
    distance: '26 km',
    time: '1.5 hours',
    description: 'Nestled inside the Senchal Wildlife Sanctuary and located 26 km from the main town, this tiny eco-village offers incredible sunrise views over the Eastern Himalayas directly opposite Tiger Hill.',
    tags: ['Wildlife Sanctuary', 'Sunrise View', 'Tiger Hill view'],
    photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    altitude: '7,887 ft',
    bestTime: 'Oct - Apr',
    rating: 4.9,
    reviews: 86,
    activities: ['Wildlife Safari', 'Trekking', 'Himalayan Sunrise']
  },
  {
    name: 'Sittong',
    distance: '40 km',
    time: '2 hours',
    description: 'Known as the "Orange Valley" of the region, Sittong is about 40 km (2 hours) from Darjeeling. It is famous for its vibrant winter orange orchards, dense forests, and close-up views of Kanchenjunga.',
    tags: ['Orange Valley', 'Kanchenjunga View', 'Orchards'],
    photo: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    altitude: '4,000 ft',
    bestTime: 'Nov - Jan',
    rating: 4.6,
    reviews: 112,
    activities: ['Orange Plucking', 'River Crossing', 'Bamboo Bridge']
  },
  {
    name: 'Tabakoshi',
    distance: '50 km',
    time: '2.5 hours',
    description: 'Situated near Mirik, this peaceful settlement is surrounded by the Gopaldhara Tea Estate and is perfect for nature walks beside the Rangbhang River.',
    tags: ['Mirik nearby', 'Tea Estate', 'River Walk'],
    photo: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    altitude: '3,100 ft',
    bestTime: 'Sep - May',
    rating: 4.8,
    reviews: 74,
    activities: ['Riverside Camping', 'Organic Farm Visit', 'Tea Tasting']
  },
  {
    name: 'Rimbik',
    distance: '56 km',
    time: '3 hours',
    description: 'A quiet town near the Singalila National Park, famous for its trekker trails, beautiful pine forests, and serene views of the mountain ranges.',
    tags: ['Trekking Hub', 'Pine Woods', 'Mountain Views'],
    photo: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    altitude: '6,500 ft',
    bestTime: 'Mar - Jun, Oct - Dec',
    rating: 4.7,
    reviews: 45,
    activities: ['Forest Trekking', 'River Valley Walk', 'Local Culture']
  },
  {
    name: 'Lepchajagat',
    distance: '19 km',
    time: '45 minutes',
    description: 'A secluded, peaceful hamlet surrounded by dense oak, fir, and rhododendron forests, offering majestic views of Mount Kanchenjunga.',
    tags: ['Oak Forests', 'Kanchenjunga', 'Tranquility'],
    photo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    altitude: '6,956 ft',
    bestTime: 'Oct - Apr',
    rating: 4.8,
    reviews: 160,
    activities: ['Nature Walks', 'Bird Watching', 'Sunset Viewing']
  },
  {
    name: 'Takdah',
    distance: '28 km',
    time: '1.5 hours',
    description: 'A historic cantonment area from the British era, featuring old colonial bungalows, pine paths, and the famous Takdah Orchid Center.',
    tags: ['Colonial Bungalows', 'Orchid Center', 'Pine Trails'],
    photo: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    altitude: '5,100 ft',
    bestTime: 'Oct - Mar',
    rating: 4.6,
    reviews: 72,
    activities: ['Orchid Garden Visit', 'Bungalow Trail', 'Tea Garden Walk']
  },
  {
    name: 'Mirik',
    distance: '49 km',
    time: '2.5 hours',
    description: 'A picturesque tourist town centered around the serene Sumendu Lake, lined by pine trees and connected by a footbridge.',
    tags: ['Sumendu Lake', 'Pine Trees', 'Boating'],
    photo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Mirik_lake_panorama.jpg',
    altitude: '4,900 ft',
    bestTime: 'Sep - Jun',
    rating: 4.5,
    reviews: 240,
    activities: ['Boating', 'Horse Riding', 'Tea Garden Views']
  }
];

interface OffbeatPlacesGridProps {
  searchQuery: string;
  onSelect?: (place: OffbeatPlace) => void;
}

export default function OffbeatPlacesGrid({ searchQuery, onSelect }: OffbeatPlacesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredPlaces = offbeatPlacesData.filter(place => {
    const query = searchQuery.toLowerCase();
    return (
      place.name.toLowerCase().includes(query) ||
      place.description.toLowerCase().includes(query) ||
      place.tags.some(tag => tag.toLowerCase().includes(query)) ||
      (place.altitude && place.altitude.toLowerCase().includes(query)) ||
      (place.bestTime && place.bestTime.toLowerCase().includes(query)) ||
      (place.activities && place.activities.some(act => act.toLowerCase().includes(query)))
    );
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.offbeat-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [filteredPlaces.length]);

  if (filteredPlaces.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <span className="text-5xl">🔎</span>
        <h3 className="text-xl font-bold text-ink">No offbeat places found</h3>
        <p className="text-sm text-body-text">Try modifying your search query.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map((place) => (
          <div
            key={place.name}
            onClick={() => onSelect?.(place)}
            className="offbeat-card group relative bg-white border border-canvas-softer hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Card Image Section */}
            <div className="relative h-64 w-full overflow-hidden bg-canvas-soft border-b border-canvas-softer">
              {place.photo ? (
                <img
                  src={place.photo}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20" />
              )}
              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />              {/* Distance / Time Badge */}
              <span className="absolute top-4 left-4 bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-canvas-softer">
                <img src="/location.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                {place.distance} ({place.time})
              </span>

              {/* Rating Badge */}
              {place.rating && (
                <span className="absolute top-4 right-4 bg-white text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-canvas-softer">
                  <span className="text-amber-500 text-sm">★</span>
                  {place.rating.toFixed(1)}
                  {place.reviews && <span className="text-body-text text-[10px]">({place.reviews})</span>}
                </span>
              )}

              {/* Altitude Badge */}
              {place.altitude && (
                <span className="absolute bottom-3 left-4 bg-white text-ink text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm border border-canvas-softer">
                  🏔️ {place.altitude}
                </span>
              )}
            </div>

            {/* Card Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-200">
                  {place.name}
                </h3>

                {/* Best time to visit */}
                {place.bestTime && (
                  <div className="flex items-center gap-2 text-xs text-body-text">
                    <img src="/time.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                    <span><strong>Best Time:</strong> {place.bestTime}</span>
                  </div>
                )}

                <p className="text-sm text-body-text leading-relaxed font-normal line-clamp-3">
                  {place.description}
                </p>

                {/* Highlights / Activities */}
                {place.activities && place.activities.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                      <img src="/tags.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                      Highlights
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {place.activities.map(act => (
                        <span key={act} className="text-[11px] bg-canvas-soft text-body-text px-2 py-0.5 rounded-full border border-canvas-softer">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags and Explore link */}
              <div className="pt-4 border-t border-canvas-softer flex justify-between items-center">
                <div className="flex flex-wrap gap-1.5">
                  {place.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded font-semibold uppercase tracking-wider"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                  Explore 
                  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

