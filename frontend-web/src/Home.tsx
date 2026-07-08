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
import DetailSidebar from './components/DetailSidebar';
import OnboardingModal from './components/onboarding/OnboardingModal';
import { useOnboardingStore } from './store/onboardingStore';
import { useLenis } from './hooks/useLenis';
import { useAuthStore } from './store/authStore';
import UserAuthModal from './components/UserAuthModal';

export type TabType = 'stays' | 'drivers' | 'routes' | 'cafes' | 'attractions' | 'offbeat' | 'food' | 'events' | 'sound';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [searchQuery, setSearchQuery] = useState('');

  // First-visit onboarding questionnaire.
  // `?onboarding=1` forces it open; `?onboarding=reset` also wipes any saved answers.
  const onboardingStatus = useOnboardingStore((s) => s.status);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    const param = new URLSearchParams(window.location.search).get('onboarding');
    if (param === 'reset') {
      useOnboardingStore.getState().reset();
      return true;
    }
    return onboardingStatus === 'incomplete' || param !== null;
  });

  // Freeze page scrolling while the questionnaire is open.
  useLenis(showOnboarding);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Modal & Booking States
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<TabType | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  // Fetch dynamic homestays & drivers
  const [dynamicStays, setDynamicStays] = useState<any[]>([]);
  const [dynamicDrivers, setDynamicDrivers] = useState<any[]>([]);
  const [dynamicCafes, setDynamicCafes] = useState<any[]>([]);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const res = await api.get('/api/homestay/list');
        const formattedStays = res.data.map((h: any) => {
          const pConfig = h.providerConfig || {};
          return {
            id: h.id,
            name: pConfig.propertyName || h.name || 'Homestay',
            type: 'Homestay',
            area: pConfig.location || 'Darjeeling',
            priceRange: pConfig.basePrice ? `₹${pConfig.basePrice} / night` : 'Price on request',
            blurb: pConfig.amenities?.join(', ') || 'A beautiful homestay.',
            photo: 'https://images.unsplash.com/photo-1542314831-c6a420325970?auto=format&fit=crop&q=80',
            isDynamic: true
          };
        });
        setDynamicStays(formattedStays);
      } catch (err) {
        console.error('Failed to fetch dynamic homestays:', err);
      }
    };
    
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/api/driver/list');
        const formattedDrivers = res.data.map((d: any) => {
          const config = d.providerConfig || {};
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
    
    const fetchCafes = async () => {
      try {
        const res = await api.get('/api/users/cafes');
        const formattedCafes = res.data.map((c: any) => {
          const pConfig = c.providerConfig || {};
          return {
            id: c.id,
            name: pConfig.cafeName || c.name || 'Cafe',
            area: pConfig.location || 'Darjeeling',
            type: 'Cafe',
            specialty: pConfig.bestItem || 'Coffee and Snacks',
            rating: 5.0,
            reviews: 0,
            timing: pConfig.operatingHours || '8 AM - 8 PM',
            photo: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80',
            isDynamic: true
          };
        });
        setDynamicCafes(formattedCafes);
      } catch (err) {
        console.error('Failed to fetch dynamic cafes:', err);
      }
    };

    fetchHomestays();
    fetchDrivers();
    fetchCafes();
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
        const allCafes = [...dynamicCafes, ...cafes];
        return allCafes.filter(
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
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setSelectedItem(item);
    setSelectedItemType(type);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
    setShowBooking(false);
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

      <div className="relative">
        <CategoryTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSearchChange={setSearchQuery}
        />

        <div className={!isAuthenticated ? "relative max-h-[750px] overflow-hidden" : ""}>
          <TabContent
            activeTab={activeTab}
            filteredItems={!isAuthenticated ? filteredItems.slice(0, 8) : filteredItems}
            onSelect={handleOpenDetails}
            searchQuery={searchQuery}
          />
          
          {!isAuthenticated && (
            <>
              {/* Smooth Blur Overlay */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-96 bg-canvas/30 backdrop-blur-md z-10 pointer-events-none"
                style={{ 
                  maskImage: 'linear-gradient(to top, black 40%, transparent 100%)', 
                  WebkitMaskImage: 'linear-gradient(to top, black 40%, transparent 100%)' 
                }}
              />
              
              {/* Call to Action Prompt */}
              <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center pb-8 z-20 pointer-events-none">
                <div className="bg-canvas p-8 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-canvas-softer text-center max-w-md mx-auto mx-4 pointer-events-auto animate-fade-in relative z-30">
                  <h3 className="text-2xl font-bold text-ink mb-3">Discover Local Services</h3>
                  <p className="text-body-text mb-6">
                    Log in or sign up to view all homestays, drivers, cafes, and experiences curated for your trip.
                  </p>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full bg-primary text-canvas py-3 px-6 rounded-xl font-bold transition-opacity hover:opacity-90 cursor-pointer shadow-lg shadow-primary/20"
                  >
                    Log in / Sign up to view all
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showAuthModal && <UserAuthModal onClose={() => setShowAuthModal(false)} />}

      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}

      {selectedItem && selectedItemType && (
        <DetailSidebar
          item={selectedItem}
          type={selectedItemType}
          onClose={handleCloseDetails}
          onBook={() => setShowBooking(true)}
        />
      )}

      {showBooking && selectedItem && selectedItemType && (
        <BookingModal
          selectedItem={selectedItem}
          selectedItemType={selectedItemType}
          onClose={() => setShowBooking(false)}
        />
      )}

      <Faq />
      <Footer />
    </div>
  );
}
