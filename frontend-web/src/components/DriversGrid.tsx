import type { Driver } from '../data/drivers';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface DriversGridProps {
  items: Driver[];
  onSelect: (driver: Driver) => void;
}

export default function DriversGrid({ items, onSelect }: DriversGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((driver) => (
        <div
          key={driver.id}
          onClick={() => onSelect(driver)}
          className="group cursor-pointer flex flex-col space-y-2"
        >
          <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
            <img 
              src={driver.photo} 
              alt={driver.name} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105" 
            />
            <span className="absolute bottom-3 left-3 right-3 bg-canvas/95 text-center py-1 rounded-full text-xs font-semibold shadow-sm border border-canvas-softer text-ink">
              {driver.vehicle}
            </span>
          </div>
          <div className="text-sm space-y-0.5">
            <div className="flex justify-between items-center font-semibold text-ink">
              <span>{driver.name}</span>
              <span className="font-normal text-xs">★ {driver.rating}</span>
            </div>
            <p className="text-body-text text-xs">{driver.experienceYears} years experience</p>
            <p className="text-mute text-xs truncate">Speaks: {driver.languages?.join(', ') || ''}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
