import type { TabType } from '../App';

interface NavbarProps {
  activeTab: TabType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ activeTab, searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="absolute top-0 left-0 w-full z-40 bg-transparent px-6 py-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Airbnb Style Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <a href="#" className="flex items-center gap-2.5 text-white font-bold text-2xl tracking-tight">
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
  );
}
