import { useState, useMemo } from 'react';
import { stays } from './data/stays';
import { drivers } from './data/drivers';
import { routes } from './data/routes';
import { cafes } from './data/cafes';
import { attractions } from './data/attractions';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TabContent from './components/TabContent';
import CategoryTabs from './components/CategoryTabs';
import Footer from './components/Footer';
import Faq from './components/Faq';
import BookingModal from './components/BookingModal';
import { useLenis } from './hooks/useLenis';

export type TabType = 'stays' | 'drivers' | 'routes' | 'cafes' | 'attractions';

export default function Home() {
  useLenis();
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

  const handleOpenDetails = (item: any, type: TabType) => {
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-canvas relative overflow-x-hidden">
      <Navbar
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Hero />

      <About />

      <CategoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
      />

      <TabContent
        activeTab={activeTab}
        filteredItems={filteredItems}
        onSelect={handleOpenDetails}
      />

      {selectedItem && selectedItemType && (
        <BookingModal
          selectedItem={selectedItem}
          selectedItemType={selectedItemType}
          onClose={handleCloseDetails}
        />
      )}

      <Faq />
      <Footer />
    </div>
  );
}
