import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface OffbeatPlace {
  name: string;
  distance: string;
  time: string;
  description: string;
  tags: string[];
}

export const offbeatPlacesData: OffbeatPlace[] = [
  {
    name: 'Tinchuley',
    distance: '32 km',
    time: '2 hours',
    description: 'Located about 32 km (2 hours) from Darjeeling, this small eco-village is famous for its tea gardens, orange orchards, and a spectacular viewpoint that offers a 360-degree view of the Teesta River and the Himalayas.',
    tags: ['Eco-village', 'Tea Gardens', 'Teesta View']
  },
  {
    name: 'Lamahatta',
    distance: '23 km',
    time: '1 hour',
    description: 'Just 23 km (1 hour) from Darjeeling, this picturesque village is renowned for its pine forests, a winding uphill trek leading to the sacred "Twin Lakes," and vibrant terraced gardens.',
    tags: ['Pine Forests', 'Twin Lakes', 'Terraced Gardens']
  },
  {
    name: 'Chatakpur',
    distance: '26 km',
    time: '1.5 hours',
    description: 'Nestled inside the Senchal Wildlife Sanctuary and located 26 km from the main town, this tiny eco-village offers incredible sunrise views over the Eastern Himalayas directly opposite Tiger Hill.',
    tags: ['Wildlife Sanctuary', 'Sunrise View', 'Tiger Hill view']
  },
  {
    name: 'Sittong',
    distance: '40 km',
    time: '2 hours',
    description: 'Known as the "Orange Valley" of the region, Sittong is about 40 km (2 hours) from Darjeeling. It is famous for its vibrant winter orange orchards, dense forests, and close-up views of Kanchenjunga.',
    tags: ['Orange Valley', 'Kanchenjunga View', 'Orchards']
  },
  {
    name: 'Tabakoshi',
    distance: '50 km',
    time: '2.5 hours',
    description: 'Situated near Mirik, this peaceful settlement is surrounded by the Gopaldhara Tea Estate and is perfect for nature walks beside the Rangbhang River.',
    tags: ['Mirik nearby', 'Tea Estate', 'River Walk']
  }
];

interface OffbeatPlacesGridProps {
  searchQuery: string;
}

export default function OffbeatPlacesGrid({ searchQuery }: OffbeatPlacesGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredPlaces = offbeatPlacesData.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
      <div className="border-l-4 border-primary pl-4 py-1">
        <h2 className="text-2xl md:text-3xl font-bold text-ink">Offbeat Destinations</h2>
        <p className="text-sm text-body-text mt-1">Discover hidden gems, serene eco-villages, and pristine view points away from the tourist crowd.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPlaces.map((place) => (
          <div 
            key={place.name}
            className="offbeat-card group relative bg-white border border-canvas-softer hover:border-primary/20 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Soft decorative background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-200">{place.name}</h3>
                <span className="text-xs bg-canvas-soft text-body-text px-2.5 py-1 rounded-full font-medium border border-canvas-softer">
                  📍 {place.distance} ({place.time})
                </span>
              </div>

              <p className="text-sm text-body-text leading-relaxed font-normal">
                {place.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 relative z-10">
              {place.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-xs bg-primary/5 text-primary px-2.5 py-1 rounded-md font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
