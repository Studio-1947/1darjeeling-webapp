import type { Stay } from '../data/stays';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface StaysGridProps {
  items: Stay[];
  onSelect: (stay: Stay) => void;
}

export default function StaysGrid({ items, onSelect }: StaysGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((stay) => (
        <div
          key={stay.id}
          onClick={() => onSelect(stay)}
          className="group cursor-pointer flex flex-col space-y-2"
        >
          <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
            <img 
              src={stay.photo} 
              alt={stay.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="absolute top-3 left-3 bg-canvas/90 backdrop-blur-sm text-ink text-[10px] font-bold px-2.5 py-1 rounded-md border border-canvas-softer shadow-sm">
              {stay.type}
            </span>
          </div>
          <div className="text-sm space-y-0.5">
            <div className="flex justify-between items-center font-semibold text-ink">
              <span className="truncate pr-2">{stay.name}</span>
              <span className="font-normal text-xs flex items-center gap-1">★ 4.92</span>
            </div>
            <p className="text-body-text text-xs">{stay.area}</p>
            <p className="text-mute text-xs truncate">{stay.blurb}</p>
            <p className="text-ink font-bold pt-1">
              {stay.priceRange.split('–')[0]} <span className="font-normal text-body-text text-xs">/ night</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
