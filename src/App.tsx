import { useState, useMemo } from 'react';
import { stays } from './data/stays';
import { drivers } from './data/drivers';
import { routes } from './data/routes';
import { cafes } from './data/cafes';
import { attractions } from './data/attractions';

import StaysGrid from './components/StaysGrid';
import DriversGrid from './components/DriversGrid';
import RoutesGrid from './components/RoutesGrid';
import CafesGrid from './components/CafesGrid';
import ExperiencesGrid from './components/ExperiencesGrid';
import BookingModal from './components/BookingModal';

type TabType = 'stays' | 'drivers' | 'routes' | 'cafes' | 'attractions';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [searchQuery, setSearchQuery] = useState('');
  


  // Modal & Booking States
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<TabType | null>(null);

  // Search Filter
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'stays':
        return stays.filter(
          s => s.name.toLowerCase().includes(query) || s.area.toLowerCase().includes(query) || s.type.toLowerCase().includes(query)
        );
      case 'drivers':
        return drivers.filter(
          d => d.name.toLowerCase().includes(query) || d.vehicle.toLowerCase().includes(query)
        );
      case 'routes':
        return routes.filter(
          r => r.from.toLowerCase().includes(query) || r.to.toLowerCase().includes(query)
        );
      case 'cafes':
        return cafes.filter(
          c => c.name.toLowerCase().includes(query) || c.area.toLowerCase().includes(query) || c.specialty.toLowerCase().includes(query)
        );
      case 'attractions':
        return attractions.filter(
          a => a.name.toLowerCase().includes(query) || a.category.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  }, [activeTab, searchQuery]);

  // Open Details Modal
  const handleOpenDetails = (item: any, type: TabType) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  // Close Modal
  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-canvas relative overflow-x-hidden">
      


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
              onChange={(e) => setSearchQuery(e.target.value)}
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
        {(
          [
            { id: 'stays', label: 'Homestays', icon: '/homestay.svg' },
            { id: 'drivers', label: 'Drivers', icon: '/driver.svg' },
            { id: 'routes', label: 'Jeep Routes', icon: '/routes.svg' },
            { id: 'cafes', label: 'Cafes', icon: '/cafe.svg' },
            { id: 'attractions', label: 'Experiences', icon: '/experiences.svg' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchQuery('');
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

    

      {/* ─── MAIN LISTINGS GRID (Airbnb Grid style) ─── */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12 relative z-10">
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <span className="text-5xl">🔎</span>
            <h3 className="text-xl font-bold text-ink">No properties found</h3>
            <p className="text-sm text-body-text">Try modifying your search or select another category above.</p>
          </div>
        ) : (
          <>
            {activeTab === 'stays' && (
              <StaysGrid items={filteredItems as any} onSelect={(stay) => handleOpenDetails(stay, 'stays')} />
            )}
            {activeTab === 'drivers' && (
              <DriversGrid items={filteredItems as any} onSelect={(driver) => handleOpenDetails(driver, 'drivers')} />
            )}
            {activeTab === 'routes' && (
              <RoutesGrid items={filteredItems as any} onSelect={(route) => handleOpenDetails(route, 'routes')} />
            )}
            {activeTab === 'cafes' && (
              <CafesGrid items={filteredItems as any} onSelect={(cafe) => handleOpenDetails(cafe, 'cafes')} />
            )}
            {activeTab === 'attractions' && (
              <ExperiencesGrid items={filteredItems as any} onSelect={(att) => handleOpenDetails(att, 'attractions')} />
            )}
          </>
        )}
      </main>

      {/* ─── AIRBNB STYLE DETAILED MODAL ─── */}
      {selectedItem && selectedItemType && (
        <BookingModal
          selectedItem={selectedItem}
          selectedItemType={selectedItemType}
          onClose={handleCloseDetails}
        />
      )}

      {/* ─── FOOTER ─── */}
      <footer className="bg-canvas-soft/85 backdrop-blur-md border-t border-canvas-softer py-12 px-6 md:px-20 text-sm text-ink relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Hosting</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">1darjeeling</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-canvas-softer flex flex-col md:flex-row justify-between items-center text-xs text-body-text space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} 1darjeeling, Inc. · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Sitemap</a>
          </div>
          <div className="flex space-x-4 font-semibold text-ink">
            <span>English (IN)</span>
            <span>₹ INR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
