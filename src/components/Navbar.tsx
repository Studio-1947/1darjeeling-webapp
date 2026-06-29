import type { TabType } from '../App';

interface NavbarProps {
  activeTab: TabType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'stays', label: 'Homestays', icon: '/homestay.svg' },
  { id: 'drivers', label: 'Drivers', icon: '/driver.svg' },
  { id: 'routes', label: 'Jeep Routes', icon: '/routes.svg' },
  { id: 'cafes', label: 'Cafes', icon: '/cafe.svg' },
  { id: 'attractions', label: 'Experiences', icon: '/experiences.svg' }
] as const;

export default function Navbar({ activeTab, searchQuery, onSearchChange, onTabChange }: NavbarProps) {
  return (
    <>
      {/* ─── AIRBNB NAV HEADER ─── */}
      <header className="sticky top-0 z-40 bg-canvas/70 backdrop-blur-md border-b border-canvas-softer px-6 py-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Airbnb Style Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#" className="flex items-center gap-2.5 text-primary font-bold text-2xl tracking-tight">
            <img src="/logo.png" alt="1darjeeling logo" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span>1darjeeling</span>
          </a>
          <span className="text-xs bg-canvas-soft px-2.5 py-1 rounded-full border border-canvas-softer font-medium md:hidden">
            Airbnb Clone
          </span>
        </div>

        {/* Airbnb Floating Search Bar */}
        <div className="flex items-center bg-canvas border border-canvas-softer shadow-md hover:shadow-lg rounded-pill px-4 py-2 w-full md:w-auto max-w-lg transition-all cursor-pointer">
          <div className="flex-1 text-left px-2">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold outline-none border-none placeholder:text-body-text"
            />
          </div>
          <button className="border-none bg-transparent p-0 outline-none cursor-pointer flex items-center justify-center">
            <img src="/search.svg" alt="search" className="w-5 h-5 object-contain" />
          </button>
        </div>
      </header>

      {/* ─── AIRBNB CATEGORIES BAR ─── */}
      <div className="sticky top-[73px] z-30 bg-canvas/70 backdrop-blur-md border-b border-canvas-softer py-4 px-6 md:px-20 flex items-center justify-start md:justify-center overflow-x-auto hide-scrollbar gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              onTabChange(tab.id);
              onSearchChange('');
            }}
            className={`flex flex-col items-center gap-2 pb-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all outline-none ${
              activeTab === tab.id
                ? 'border-ink text-ink'
                : 'border-transparent text-body-text hover:text-ink hover:border-canvas-softer'
            }`}
          >
            <img 
              src={tab.icon} 
              alt={tab.label} 
              className={`w-15 h-15 object-contain transition-all ${
                activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`} 
            />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
