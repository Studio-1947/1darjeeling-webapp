import { useState } from 'react';
import type { Route } from '../data/routes';
import { useCardAnimation } from '../hooks/useCardAnimation';
import RouteMap from './RouteMap';

interface RoutesGridProps {
  items: Route[];
  onSelect: (route: Route) => void;
}

interface RouteCardProps {
  route: Route;
  selected: boolean;
  onClick: () => void;
  onDetails: () => void;
}

function RouteCard({ route, selected, onClick, onDetails }: RouteCardProps) {
  return (
    <div onClick={onClick} className="group cursor-pointer flex flex-col space-y-2">
      <div
        className={`aspect-[4/3] bg-canvas-soft rounded-xl relative overflow-hidden border transition-all duration-300 ${
          selected
            ? 'border-primary ring-2 ring-primary shadow-lg'
            : 'border-canvas-softer'
        }`}
      >
        <img
          src={route.photo}
          alt={`${route.from} to ${route.to}`}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            selected ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
          }`}
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="text-primary font-semibold text-xs pt-1 cursor-pointer"
        >
          View Fare Details →
        </button>
      </div>
    </div>
  );
}

export default function RoutesGrid({ items, onSelect }: RoutesGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const leftRef = useCardAnimation();
  const rightRef = useCardAnimation();

  const mid = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, mid);
  const rightItems = items.slice(mid);
  const selected = items.find((r) => r.id === selectedId) ?? null;

  const handleCardClick = (route: Route) => {
    setSelectedId(route.id === selectedId ? null : route.id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-6 items-start">
      {/* Map — centre column on desktop, on top on mobile */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 h-[420px] lg:h-[620px] rounded-xl overflow-hidden border border-canvas-softer shadow-sm">
        <RouteMap route={selected} />
      </div>

      <div
        ref={leftRef}
        className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {leftItems.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            selected={route.id === selectedId}
            onClick={() => handleCardClick(route)}
            onDetails={() => onSelect(route)}
          />
        ))}
      </div>

      <div
        ref={rightRef}
        className="order-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {rightItems.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            selected={route.id === selectedId}
            onClick={() => handleCardClick(route)}
            onDetails={() => onSelect(route)}
          />
        ))}
      </div>
    </div>
  );
}
