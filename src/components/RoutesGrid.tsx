import type { Route } from '../data/routes';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface RoutesGridProps {
  items: Route[];
  onSelect: (route: Route) => void;
}

export default function RoutesGrid({ items, onSelect }: RoutesGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((route) => (
        <div
          key={route.id}
          onClick={() => onSelect(route)}
          className="group cursor-pointer flex flex-col space-y-2"
        >
          <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
            <img 
              src={route.photo} 
              alt={`${route.from} to ${route.to}`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" 
            />
            <span className="absolute bottom-3 left-3 right-3 bg-canvas/95 text-center py-1.5 rounded-lg text-xs font-bold shadow-sm border border-canvas-softer leading-none text-ink">
              {route.from} ⇄ {route.to}
            </span>
          </div>
          <div className="text-sm space-y-0.5">
            <div className="flex justify-between items-center font-semibold text-ink">
              <span>{route.distance}</span>
              <span className="font-normal text-xs text-body-text">{route.duration}</span>
            </div>
            <p className="text-body-text text-xs">{route.road}</p>
            <p className="text-mute text-xs truncate">{route.note}</p>
            <p className="text-primary font-semibold text-xs pt-1">View Fare Details →</p>
          </div>
        </div>
      ))}
    </div>
  );
}
