import type { TabType } from '../Home';

interface CategoryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSearchChange: (query: string) => void;
}

const tabs = [
  { id: 'stays', label: 'Homestays', icon: '/homestay.svg' },
  { id: 'drivers', label: 'Drivers', icon: '/driver.svg' },
  { id: 'routes', label: 'Jeep Routes', icon: '/routes.svg' },
  { id: 'cafes', label: 'Cafes', icon: '/cafe.svg' },
  { id: 'attractions', label: 'Experiences', icon: '/experiences.svg' },
  { id: 'offbeat', label: 'Offbeat Places', icon: '/offbeatplaces.svg' },
  { id: 'food', label: 'Food & Culture', icon: '/foodculture.svg' },
  { id: 'events', label: 'Events', icon: '/event.svg' },
  { id: 'sound', label: 'Sound Experience', icon: '/sound.svg' }
] as const;

export default function CategoryTabs({ activeTab, onTabChange, onSearchChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-30 bg-canvas/70 backdrop-blur-md border-b border-canvas-softer py-6 px-6 md:px-20 flex items-center justify-start md:justify-center overflow-x-auto hide-scrollbar gap-12">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            onTabChange(tab.id);
            onSearchChange('');
          }}
          className={`flex flex-col items-center gap-3 pb-2.5 border-b-2 text-sm font-semibold whitespace-nowrap transition-all outline-none cursor-pointer ${
            activeTab === tab.id
              ? 'border-ink text-ink'
              : 'border-transparent text-body-text hover:text-ink hover:border-canvas-softer'
          }`}
        >
          <img 
            src={tab.icon} 
            alt={tab.label} 
            className={`w-12 h-12 object-contain transition-all ${
              activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            }`} 
          />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
