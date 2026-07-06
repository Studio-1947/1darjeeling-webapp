import { useState, useMemo, useEffect } from 'react';
import { api } from './api/client';
import { stays } from './data/stays';
import { drivers } from './data/drivers';
import { routes } from './data/routes';
import { cafes } from './data/cafes';
import { attractions } from './data/attractions';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TabContent from './components/TabContent';
import CategoryTabs from './components/CategoryTabs';
import Footer from './components/Footer';
import Faq from './components/Faq';
import BookingModal from './components/BookingModal';
import { useLenis } from './hooks/useLenis';

export type TabType = 'stays' | 'drivers' | 'routes' | 'cafes' | 'attractions' | 'offbeat' | 'food' | 'events' | 'sound';

export default function Home() {
  useLenis();
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Modal & Booking States
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<TabType | null>(null);

  // Fetch dynamic homestays & drivers
  const [dynamicStays, setDynamicStays] = useState<any[]>([]);
  const [dynamicDrivers, setDynamicDrivers] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const res = await api.get('/api/homestay/list');
        const formattedStays = res.data.map((h: any) => ({
          id: h.id,
          name: h.propertyName,
          type: 'Homestay',
          area: h.essentialsConfig?.location || 'Darjeeling',
          priceRange: h.essentialsConfig?.basePrice ? `₹${h.essentialsConfig.basePrice} / night` : 'Price on request',
          blurb: h.essentialsConfig?.amenities?.join(', ') || 'A beautiful homestay.',
          photo: 'https://images.unsplash.com/photo-1542314831-c6a420325970?auto=format&fit=crop&q=80',
          isDynamic: true
        }));
        setDynamicStays(formattedStays);
      } catch (err) {
        console.error('Failed to fetch dynamic homestays:', err);
      }
    };
    
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/api/driver/list');
        const formattedDrivers = res.data.map((d: any) => {
          const config = d.profileConfig || {};
          let languages = ['Nepali', 'Hindi'];
          if (config.languages) {
            languages = config.languages.split(',').map((l: string) => l.trim());
          }
          
          let routes = ['town-sightseeing'];
          if (config.routesOperated) {
            routes = config.routesOperated.split(',').map((r: string) => r.trim());
          }

          return {
            id: d.id,
            name: d.fullName,
            vehicle: d.vehicleType,
            licenseNumber: 'Newly Registered',
            rating: 5.0,
            experienceYears: Number(config.experienceYears) || 1,
            languages,
            routesOperated: routes,
            portrait: '👨🏽‍✈️',
            photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80', // Premium driver avatar fallback
            isDynamic: true
          };
        });
        setDynamicDrivers(formattedDrivers);
      } catch (err) {
        console.error('Failed to fetch dynamic drivers:', err);
      }
    };
    
    fetchHomestays();
    fetchDrivers();
  }, []);

  // Search Filter
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'stays':
        const allStays = [...dynamicStays, ...stays];
        return allStays.filter(
          s => s.name.toLowerCase().includes(query) || s.area.toLowerCase().includes(query) || s.type.toLowerCase().includes(query)
        );
      case 'drivers':
        const allDrivers = [...dynamicDrivers, ...drivers];
        return allDrivers.filter(
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
      case 'offbeat':
      case 'food':
      case 'events':
      case 'sound':
        return [1]; // non-empty dummy to bypass general empty-check
      default:
        return [];
    }
  }, [activeTab, searchQuery, dynamicStays, dynamicDrivers]);

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
        searchQuery={searchQuery}
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
