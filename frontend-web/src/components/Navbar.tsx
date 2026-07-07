import { useState, useRef, useEffect, useMemo } from 'react';
import type { TabType } from '../Home';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { stays } from '../data/stays';
import { drivers } from '../data/drivers';
import { routes } from '../data/routes';
import { cafes } from '../data/cafes';
import { attractions } from '../data/attractions';

interface NavbarProps {
  activeTab: TabType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ activeTab, searchQuery, onSearchChange }: NavbarProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [dynamicStays, setDynamicStays] = useState<any[]>([]);
  const [dynamicDrivers, setDynamicDrivers] = useState<any[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const placeholderOptions = useMemo(() => [
    "stays",
    "drivers",
    "routes",
    "cafes",
    "experiences",
    "offbeat places",
    "food culture",
    "events",
    "sound experiences"
  ], []);

  const [currentPlaceholderIdx, setCurrentPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: any;
    const fullText = `Search ${placeholderOptions[currentPlaceholderIdx]}...`;
    const typeSpeed = isDeleting ? 40 : 100;
    
    const handleType = () => {
      if (!isDeleting) {
        setDisplayedPlaceholder(fullText.substring(0, displayedPlaceholder.length + 1));
        
        if (displayedPlaceholder === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setDisplayedPlaceholder(fullText.substring(0, displayedPlaceholder.length - 1));
        
        if (displayedPlaceholder === "") {
          setIsDeleting(false);
          setCurrentPlaceholderIdx((prev) => (prev + 1) % placeholderOptions.length);
          return;
        }
      }
      
      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, currentPlaceholderIdx, placeholderOptions]);

  const { isAuthenticated, profile, clearAuth } = useAuthStore();
  const navigate = useNavigate();

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomestays = async () => {
      try {
        const res = await api.get('/api/homestay/list');
        const formattedStays = res.data.map((h: any) => ({
          name: h.propertyName,
          area: h.essentialsConfig?.location || 'Darjeeling',
          type: 'Homestay',
        }));
        setDynamicStays(formattedStays);
      } catch (err) {
        console.error('Failed to fetch dynamic homestays in Navbar:', err);
      }
    };
    
    const fetchDrivers = async () => {
      try {
        const res = await api.get('/api/driver/list');
        const formattedDrivers = res.data.map((d: any) => ({
          name: d.fullName,
          vehicle: d.vehicleType,
        }));
        setDynamicDrivers(formattedDrivers);
      } catch (err) {
        console.error('Failed to fetch dynamic drivers in Navbar:', err);
      }
    };
    
    fetchHomestays();
    fetchDrivers();
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    switch (activeTab) {
      case 'stays': {
        const allStays = [
          ...dynamicStays,
          ...stays.map(s => ({ name: s.name, area: s.area, type: s.type }))
        ];
        return allStays
          .filter(s => s.name.toLowerCase().includes(query) || s.area.toLowerCase().includes(query))
          .map(s => ({
            title: s.name,
            subtitle: `${s.type} • ${s.area}`,
            searchValue: s.name
          }))
          .slice(0, 5);
      }
      case 'drivers': {
        const allDrivers = [
          ...dynamicDrivers,
          ...drivers.map(d => ({ name: d.name, vehicle: d.vehicle }))
        ];
        return allDrivers
          .filter(d => d.name.toLowerCase().includes(query) || d.vehicle.toLowerCase().includes(query))
          .map(d => ({
            title: d.name,
            subtitle: d.vehicle,
            searchValue: d.name
          }))
          .slice(0, 5);
      }
      case 'routes': {
        return routes
          .filter(r => r.from.toLowerCase().includes(query) || r.to.toLowerCase().includes(query))
          .map(r => ({
            title: `${r.from} to ${r.to}`,
            subtitle: `${r.distance} • ${r.duration}`,
            searchValue: `${r.from} to ${r.to}`
          }))
          .slice(0, 5);
      }
      case 'cafes': {
        return cafes
          .filter(c => c.name.toLowerCase().includes(query) || c.area.toLowerCase().includes(query) || c.specialty.toLowerCase().includes(query))
          .map(c => ({
            title: c.name,
            subtitle: `${c.specialty} • ${c.area}`,
            searchValue: c.name
          }))
          .slice(0, 5);
      }
      case 'attractions': {
        return attractions
          .filter(a => a.name.toLowerCase().includes(query) || a.category.toLowerCase().includes(query))
          .map(a => ({
            title: a.name,
            subtitle: a.category,
            searchValue: a.name
          }))
          .slice(0, 5);
      }
      default:
        return [];
    }
  }, [activeTab, searchQuery, dynamicStays, dynamicDrivers]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setIsUserOpen(false);
    navigate('/');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-40 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
      isScrolled 
        ? 'bg-canvas/95 backdrop-blur-md shadow-sm border-b border-canvas-softer py-3' 
        : 'bg-transparent py-5'
    }`}>
      {/* Airbnb Style Logo */}
      <div className="flex items-center justify-between w-full md:w-auto md:flex-1 md:justify-start">
        <a href="/" className={`flex items-center gap-2.5 font-bold text-2xl tracking-tight transition-colors duration-300 ${
          isScrolled ? 'text-ink' : 'text-white'
        }`}>
          <img src="/logo.png" alt="1darjeeling logo" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span>1darjeeling</span>
        </a>
        <span className="text-xs bg-canvas-soft px-2.5 py-1 rounded-full border border-canvas-softer font-medium md:hidden">
          Airbnb Clone
        </span>
      </div>

      {/* Airbnb Floating Search Bar (Centered) with Suggestions */}
      <div className="relative w-full md:w-auto max-w-lg flex-1 md:flex-initial" ref={searchRef}>
        <div className="flex items-center bg-canvas border border-canvas-softer shadow-md hover:shadow-lg rounded-pill px-4 py-2 w-full transition-all cursor-pointer">
          <div className="flex-1 text-left px-2">
            <input
              type="text"
              placeholder={isInputFocused ? `Search ${activeTab}...` : displayedPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                setShowSuggestions(true);
                setIsInputFocused(true);
              }}
              onBlur={() => setIsInputFocused(false)}
              className="w-full bg-transparent text-sm font-semibold outline-none border-none placeholder:text-body-text text-ink"
            />
          </div>
          <button className="border-none bg-transparent p-0 outline-none cursor-pointer flex items-center justify-center">
            <img src="/search.svg" alt="search" className="w-5 h-5 object-contain" />
          </button>
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && searchQuery.trim() !== '' && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-hairline py-2.5 z-50 text-ink animate-scale-up max-h-72 overflow-y-auto">
            <div className="px-4 py-1.5 text-xs font-semibold text-mute uppercase tracking-wider border-b border-hairline mb-1.5">
              Suggestions for {activeTab}
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onSearchChange(suggestion.searchValue);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-canvas-soft transition-colors flex items-start gap-3 border-none bg-transparent cursor-pointer text-ink group"
              >
                <div className="mt-0.5 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-200 text-primary">
                  {activeTab === 'stays' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  )}
                  {activeTab === 'drivers' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )}
                  {activeTab === 'routes' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.684A1.125 1.125 0 0 0 3 6.69v11.22c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                    </svg>
                  )}
                  {activeTab === 'cafes' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .556-.45.104-.104-.104H3.104c-.556 0-1.008.45-1.008 1.006v13.486C2.096 19.28 2.548 19.73 3.104 19.73h13.792c.556 0 1.008-.45 1.008-1.006V5.25c0-.556-.452-1.006-1.008-1.006h-5.138V3.104c0-.556-.452-1.006-1.008-1.006H10.76c-.558 0-1.01.45-1.01 1.006Z" />
                    </svg>
                  )}
                  {activeTab === 'attractions' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.36.632-.36.782 0l2.195 5.278 5.617.439c.394.03.55.518.257.778l-4.22 3.738 1.3 5.485c.091.385-.323.684-.666.48l-4.743-2.85-4.743 2.85c-.343.204-.757-.095-.666-.48l1.3-5.485-4.22-3.738c-.294-.26-.138-.748.257-.778l5.617-.439 2.195-5.278Z" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-ink group-hover:text-primary transition-colors text-sm">{suggestion.title}</span>
                  <span className="text-xs text-mute font-medium">{suggestion.subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Host Link, Language Selector, User Menu */}
      <div className="flex items-center gap-4 mt-2 md:mt-0 md:flex-1 md:justify-end">
        <a href="http://localhost:5174/register" className={`hidden lg:block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'text-ink hover:bg-canvas-soft' 
            : 'text-white hover:bg-white/10'
        }`}>
          Host your stay
        </a>

        {/* Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-300 border-none bg-transparent cursor-pointer ${
              isScrolled 
                ? 'text-ink hover:bg-canvas-soft' 
                : 'text-white hover:bg-white/15'
            }`}
            aria-label="Select language"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 10.5a17.918 17.918 0 0 0 8.716-2.247" />
            </svg>
          </button>
          
          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-hairline py-2 transition-all z-50 text-ink animate-scale-up">
              <div className="px-4 py-1.5 text-xs font-semibold text-mute uppercase tracking-wider">Select Language</div>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-canvas-soft font-medium flex items-center gap-2 border-none bg-transparent cursor-pointer text-ink">
                <span>🇺🇸</span> English
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-canvas-soft font-medium flex items-center gap-2 border-none bg-transparent cursor-pointer text-ink">
                <span>🇳🇵</span> नेपाली (Nepali)
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-canvas-soft font-medium flex items-center gap-2 border-none bg-transparent cursor-pointer text-ink">
                <span>🇮🇳</span> हिन्दी (Hindi)
              </button>
            </div>
          )}
        </div>

        {/* Profile / User Menu Button */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setIsUserOpen(!isUserOpen)}
            className="flex items-center gap-3 bg-white border border-canvas-softer hover:shadow-md transition-all rounded-full p-1.5 pl-3 pr-1.5 cursor-pointer"
          >
            {/* Hamburger (only show if not authenticated) */}
            {!isAuthenticated && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-ink">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
            
            {/* User Icon */}
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white overflow-hidden ${isAuthenticated ? 'bg-primary' : 'bg-body-text'}`}>
              {isAuthenticated ? (
                <span className="text-xs font-bold uppercase">{profile?.email?.charAt(0) || 'U'}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>

          {isUserOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-hairline py-2 transition-all z-50 text-ink animate-scale-up">
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setIsUserOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-semibold border-none bg-transparent cursor-pointer text-ink"
                  >
                    Dashboard
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Trips
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Wishlists
                  </button>
                  <hr className="border-hairline my-1" />
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Host your stay
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Account
                  </button>
                  <hr className="border-hairline my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setShowSignupModal(true);
                      setIsUserOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-semibold border-none bg-transparent cursor-pointer text-ink"
                  >
                    Sign up
                  </button>
                  <button 
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsUserOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink"
                  >
                    Log in
                  </button>
                  <hr className="border-hairline my-1" />
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Host your stay
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = 'http://localhost:5174/login';
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink"
                  >
                    Homestay Owner Login
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = 'http://localhost:5175/login';
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink"
                  >
                    Driver Partner Login
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                    Help Center
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal 
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </header>
  );
}
