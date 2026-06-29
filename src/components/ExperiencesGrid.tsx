import type { Attraction } from '../data/attractions';

interface ExperiencesGridProps {
  items: Attraction[];
  onSelect: (experience: Attraction) => void;
}

export default function ExperiencesGrid({ items, onSelect }: ExperiencesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {items.map((att) => (
        <div
          key={att.id}
          onClick={() => onSelect(att)}
          className="group cursor-pointer flex flex-col space-y-2"
        >
          <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
            <img 
              src={att.photo} 
              alt={att.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          <div className="text-sm space-y-0.5">
            <div className="flex justify-between items-center font-semibold text-ink">
              <span className="truncate pr-2">{att.name}</span>
              <span className="font-normal text-xs whitespace-nowrap">{att.distance}</span>
            </div>
            <p className="text-body-text text-xs">{att.category}</p>
            <p className="text-mute text-xs truncate">{att.blurb}</p>
            <p className="text-primary font-semibold text-xs pt-1">Read details & tips →</p>
          </div>
        </div>
      ))}
    </div>
  );
}
