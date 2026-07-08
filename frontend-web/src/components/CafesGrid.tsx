import type { Cafe } from '../data/cafes';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface CafesGridProps {
  items: Cafe[];
  onSelect: (cafe: Cafe) => void;
}

export default function CafesGrid({ items, onSelect }: CafesGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((cafe) => (
        <div
          key={cafe.id}
          onClick={() => onSelect(cafe)}
          className="group relative bg-white border border-canvas-softer hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
        >
          {/* Card Image Section */}
          <div className="relative h-64 w-full overflow-hidden bg-canvas-soft border-b border-canvas-softer">
            {cafe.photo ? (
              <img
                src={cafe.photo}
                alt={cafe.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Established Badge */}
            <span className="absolute top-4 left-4 bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-canvas-softer">
              <img src="/established.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
              Est. {cafe.established}
            </span>

            {/* Rating Badge */}
            <span className="absolute top-4 right-4 bg-white text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-canvas-softer">
              <span className="text-amber-500 text-sm">★</span>
              {cafe.rating.toFixed(1)}
            </span>

            {/* Area Badge */}
            <span className="absolute bottom-3 left-4 bg-white text-ink text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm border border-canvas-softer">
              <img src="/location.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
              {cafe.area}
            </span>
          </div>

          {/* Card Content Section */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-200">
                {cafe.name}
              </h3>

              {/* Specialty */}
              <div className="flex items-center gap-2 text-xs text-body-text">
                <img src="/menu.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                <span><strong>Specialty:</strong> {cafe.specialty}</span>
              </div>

              <p className="text-sm text-body-text leading-relaxed font-normal line-clamp-3">
                {cafe.blurb}
              </p>
            </div>

            {/* Pricing / Explore Footer */}
            <div className="pt-4 border-t border-canvas-softer flex justify-between items-center">
              <div className="text-ink font-bold text-sm flex items-center gap-1.5">
                <img src="/price.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                {cafe.priceRange}
              </div>
              <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                View Cafe
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
  );
}
