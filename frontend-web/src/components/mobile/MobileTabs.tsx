export type MobileCategory = 'stays' | 'drivers' | 'routes' | 'attractions' | 'culture';

interface MobileTabsProps {
  active: MobileCategory;
  onChange: (cat: MobileCategory) => void;
}

const tabs: { id: MobileCategory; label: string }[] = [
  { id: 'stays', label: 'Homestays' },
  { id: 'drivers', label: 'Drivers' },
  { id: 'routes', label: 'Routes' },
  { id: 'attractions', label: 'Attractions' },
  { id: 'culture', label: 'Culture' },
];

/**
 * Sticky, horizontally scrollable pill tabs that switch the primary category screen.
 * Sits directly under the fixed header.
 */
export default function MobileTabs({ active, onChange }: MobileTabsProps) {
  return (
    <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-md border-b border-hairline">
      <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`shrink-0 h-9 px-4 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-ink text-white'
                  : 'bg-canvas-soft text-body-text border border-hairline hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
