import type { TabType } from '../Home';
import StaysGrid from './StaysGrid';
import DriversGrid from './DriversGrid';
import RoutesGrid from './RoutesGrid';
import CafesGrid from './CafesGrid';
import ExperiencesGrid from './ExperiencesGrid';
import OffbeatPlacesGrid from './OffbeatPlacesGrid';
import FoodCulture from './FoodCulture';

interface TabContentProps {
  activeTab: TabType;
  filteredItems: any[];
  onSelect: (item: any, type: TabType) => void;
  searchQuery: string;
}

export default function TabContent({ activeTab, filteredItems, onSelect, searchQuery }: TabContentProps) {
  const isStaticTab = activeTab === 'offbeat' || activeTab === 'food' || activeTab === 'events' || activeTab === 'sound';
  const showEmptyState = filteredItems.length === 0 && !isStaticTab;

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-20 py-12 relative z-10">
      {showEmptyState ? (
        <div className="text-center py-24 space-y-4">
          <span className="text-5xl">🔎</span>
          <h3 className="text-xl font-bold text-ink">No properties found</h3>
          <p className="text-sm text-body-text">Try modifying your search or select another category above.</p>
        </div>
      ) : (
        <>
          {activeTab === 'stays' && (
            <StaysGrid items={filteredItems as any} onSelect={(stay) => onSelect(stay, 'stays')} />
          )}
          {activeTab === 'drivers' && (
            <DriversGrid items={filteredItems as any} onSelect={(driver) => onSelect(driver, 'drivers')} />
          )}
          {activeTab === 'routes' && (
            <RoutesGrid items={filteredItems as any} onSelect={(route) => onSelect(route, 'routes')} />
          )}
          {activeTab === 'cafes' && (
            <CafesGrid items={filteredItems as any} onSelect={(cafe) => onSelect(cafe, 'cafes')} />
          )}
          {activeTab === 'attractions' && (
            <ExperiencesGrid items={filteredItems as any} onSelect={(att) => onSelect(att, 'attractions')} />
          )}
          {activeTab === 'offbeat' && (
            <OffbeatPlacesGrid searchQuery={searchQuery} />
          )}
          {activeTab === 'food' && (
            <FoodCulture />
          )}
          {activeTab === 'events' && (
            <div className="text-center py-32 space-y-6 animate-fade-in">
              
              <h2 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight font-display">
                Coming Soon
              </h2>
              <p className="text-lg text-body-text max-w-md mx-auto">
                We are curating local festivals, music concerts, and seasonal celebrations in the hills. Stay tuned!
              </p>
            </div>
          )}
          {activeTab === 'sound' && (
            <div className="text-center py-32 space-y-6 animate-fade-in">
              
              <h2 className="text-4xl md:text-6xl font-extrabold text-ink tracking-tight font-display">
                Coming Soon
              </h2>
              <p className="text-lg text-body-text max-w-md mx-auto">
                Immersive audio soundscapes of Darjeeling. Listen to the wind, train whistles, tea garden murmurs, and morning bells.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
