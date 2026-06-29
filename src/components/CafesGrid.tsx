import type { Cafe } from '../data/cafes';

interface CafesGridProps {
  items: Cafe[];
  onSelect: (cafe: Cafe) => void;
}

export default function CafesGrid({ items, onSelect }: CafesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {items.map((cafe) => (
        <div
          key={cafe.id}
          onClick={() => onSelect(cafe)}
          className="group cursor-pointer flex flex-col space-y-2"
        >
          <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
            <img 
              src={cafe.photo} 
              alt={cafe.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <span className="absolute top-3 right-3 bg-canvas/90 backdrop-blur-sm text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-canvas-softer shadow-sm">
              Est. {cafe.established}
            </span>
          </div>
          <div className="text-sm space-y-0.5">
            <div className="flex justify-between items-center font-semibold text-ink">
              <span>{cafe.name}</span>
              <span className="font-normal text-xs">★ {cafe.rating}</span>
            </div>
            <p className="text-body-text text-xs">{cafe.area}</p>
            <p className="text-mute text-xs truncate">Specialty: {cafe.specialty}</p>
            <p className="text-ink font-bold pt-1">{cafe.priceRange}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
