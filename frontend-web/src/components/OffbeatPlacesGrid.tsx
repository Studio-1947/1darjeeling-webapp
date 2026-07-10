import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { offbeatPlaces as offbeatPlacesData } from '../data/offbeat';
import type { OffbeatPlace } from '../data/offbeat';
export type { OffbeatPlace } from '../data/offbeat';

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

