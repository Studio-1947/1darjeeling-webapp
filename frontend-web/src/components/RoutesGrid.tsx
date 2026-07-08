import type { Route } from '../data/routes';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface RoutesGridProps {
  items: Route[];
  onSelect: (route: Route) => void;
}

export default function RoutesGrid({ items, onSelect }: RoutesGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((route) => (
        <div 
          key={route.id}
          onClick={() => onSelect(route)} 
          className="group relative bg-white border border-canvas-softer hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
        >
          {/* Card Image Section */}
          <div className="relative h-64 w-full overflow-hidden bg-canvas-soft border-b border-canvas-softer">
            <img
              src={route.photo}
              alt={`${route.from} to ${route.to}`}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Route Name Badge */}
            <span className="absolute top-4 left-4 bg-white text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm max-w-[220px] truncate flex items-center gap-1.5 border border-canvas-softer">
              <img src="/route.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
              {route.from} ⇄ {route.to}
            </span>

            {/* Duration Badge */}
            <span className="absolute top-4 right-4 bg-white text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-canvas-softer">
              <img src="/time.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
              {route.duration}
            </span>

            {/* Distance Badge */}
            <span className="absolute bottom-3 left-4 bg-white text-ink text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-md shadow-sm border border-canvas-softer">
              <img src="/location.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
              {route.distance}
            </span>
          </div>

          {/* Card Content Section */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-200">
                {route.from} ⇄ {route.to}
              </h3>

              {/* Road / Via */}
              <div className="flex items-center gap-2 text-xs text-body-text">
                <img src="/route.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                <span><strong>Road:</strong> {route.road}</span>
              </div>

              <p className="text-sm text-body-text leading-relaxed font-normal line-clamp-3">
                {route.note}
              </p>
            </div>

            {/* View Fare Footer */}
            <div className="pt-4 border-t border-canvas-softer flex justify-between items-center">
              <span className="text-xs text-body-text font-medium">{route.distance} total</span>
              <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                View Fare Details
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
