import type { TabType } from '../App';
import StaysGrid from './StaysGrid';
import DriversGrid from './DriversGrid';
import RoutesGrid from './RoutesGrid';
import CafesGrid from './CafesGrid';
import ExperiencesGrid from './ExperiencesGrid';

interface TabContentProps {
  activeTab: TabType;
  filteredItems: any[];
  onSelect: (item: any, type: TabType) => void;
}

export default function TabContent({ activeTab, filteredItems, onSelect }: TabContentProps) {
  return (
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
        </>
      )}
    </main>
  );
}
