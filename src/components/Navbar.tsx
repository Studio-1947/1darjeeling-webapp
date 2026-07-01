import { useState, useRef, useEffect } from 'react';
import type { TabType } from '../App';

interface NavbarProps {
  activeTab: TabType;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ activeTab, searchQuery, onSearchChange }: NavbarProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserOpen(false);
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
    // Trigger once on mount to capture initial scroll state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300 ${
      isScrolled 
        ? 'bg-canvas/95 backdrop-blur-md shadow-sm border-b border-canvas-softer py-3' 
        : 'bg-transparent py-5'
    }`}>
      {/* Airbnb Style Logo */}
      <div className="flex items-center justify-between w-full md:w-auto md:flex-1 md:justify-start">
        <a href="#" className={`flex items-center gap-2.5 font-bold text-2xl tracking-tight transition-colors duration-300 ${
          isScrolled ? 'text-ink' : 'text-white'
        }`}>
          <img src="/logo.png" alt="1darjeeling logo" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span>1darjeeling</span>
        </a>
        <span className="text-xs bg-canvas-soft px-2.5 py-1 rounded-full border border-canvas-softer font-medium md:hidden">
          Airbnb Clone
        </span>
      </div>

      {/* Airbnb Floating Search Bar (Centered) */}
      <div className="flex items-center bg-canvas border border-canvas-softer shadow-md hover:shadow-lg rounded-pill px-4 py-2 w-full md:w-auto max-w-lg transition-all cursor-pointer">
        <div className="flex-1 text-left px-2">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold outline-none border-none placeholder:text-body-text text-ink"
          />
        </div>
        <button className="border-none bg-transparent p-0 outline-none cursor-pointer flex items-center justify-center">
          <img src="/search.svg" alt="search" className="w-5 h-5 object-contain" />
        </button>
      </div>

      {/* Right Side: Host Link, Language Selector, User Menu */}
      <div className="flex items-center gap-4 mt-2 md:mt-0 md:flex-1 md:justify-end">
        <a href="#" className={`hidden lg:block text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
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
            {/* Hamburger */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-ink">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            {/* User Icon */}
            <div className="w-7 h-7 bg-body-text rounded-full flex items-center justify-center text-white overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mt-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
            </div>
          </button>

          {isUserOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-hairline py-2 transition-all z-50 text-ink animate-scale-up">
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-semibold border-none bg-transparent cursor-pointer text-ink">
                Sign up
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                Log in
              </button>
              <hr className="border-hairline my-1" />
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                Host your stay
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-canvas-soft font-medium border-none bg-transparent cursor-pointer text-ink">
                Help Center
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
