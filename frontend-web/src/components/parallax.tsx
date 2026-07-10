import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Shared, crisp fallback cover used whenever an item has no usable hero image.
export const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=85';

// ==========================================
// Reveal-on-scroll: fades + lifts content once it enters the viewport
// ==========================================
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ==========================================
// Sticky parallax panel — each section pins to the viewport while the next
// section scrolls up and covers it, so every section gets its own parallax.
// ==========================================
export function SectionPanel({
  children,
  bg = 'bg-canvas',
  dark = false,
}: {
  children: ReactNode;
  bg?: string;
  dark?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`sticky top-0 min-h-screen w-full flex items-center rounded-t-[2.5rem] shadow-[0_-24px_50px_rgba(0,0,0,0.18)] ${bg} ${
        dark ? 'text-white' : 'text-ink'
      }`}
    >
      <div
        className={`max-w-5xl mx-auto px-6 md:px-20 py-24 md:py-28 w-full transition-all duration-700 ease-out ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {children}
      </div>
    </section>
  );
}

// ==========================================
// Large panel heading with an eyebrow label
// ==========================================
export function PanelHeader({
  eyebrow,
  title,
  iconSrc,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  iconSrc: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${
          dark ? 'text-white/50' : 'text-primary/50'
        }`}
      >
        <img src={iconSrc} className={`w-5 h-5 object-contain ${dark ? 'brightness-0 invert' : ''}`} alt="" />
        {eyebrow}
      </p>
      <h2
        className={`text-3xl md:text-5xl font-extrabold font-display tracking-tight ${dark ? 'text-white' : 'text-ink'}`}
        style={dark ? { color: 'white' } : undefined}
      >
        {title}
      </h2>
    </div>
  );
}

// ==========================================
// Fixed parallax hero layer. Stays pinned while the content rises over it.
// ==========================================
export interface HeroCrumb {
  label: string;
  to?: string;
}

export interface HeroFact {
  icon?: string;
  text: ReactNode;
  strong?: boolean;
}

export function ParallaxHero({
  image,
  fallback = HERO_FALLBACK,
  badge,
  crumbs,
  title,
  facts,
}: {
  image?: string;
  fallback?: string;
  badge?: { icon?: string; label: string };
  crumbs: HeroCrumb[];
  title: string;
  facts?: HeroFact[];
}) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden bg-black z-0">
      <img
        src={image || fallback}
        alt={title}
        onError={(e) => {
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fade-in"
      />
      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

      {/* Hero content vertically centered and left-aligned */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-center w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-white/70 mb-5 animate-fade-in flex-wrap">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {c.to ? (
                <button onClick={() => navigate(c.to!)} className="hover:text-white transition-colors">
                  {c.label}
                </button>
              ) : (
                <span className="text-white font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </div>

        {/* Type badge */}
        {badge && (
          <span className="inline-flex items-center gap-1.5 self-start bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            {badge.icon && <img src={badge.icon} className="w-4 h-4 object-contain brightness-0 invert" alt="" />}
            {badge.label}
          </span>
        )}

        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-white drop-shadow-lg mb-4 max-w-3xl"
          style={{ color: 'white' }}
        >
          {title}
        </h1>

        {facts && facts.length > 0 && (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:text-base text-white/90">
            {facts.map((f, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span className="hidden sm:block text-white/40 mr-3">·</span>}
                {f.icon && <img src={f.icon} className="w-4 h-4 object-contain brightness-0 invert" alt="" />}
                <span className={f.strong ? 'font-bold text-white' : 'font-medium'}>{f.text}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-white/60 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// Full page shell: transparent navbar, fixed hero, and a content layer whose
// sticky panels rise up over the hero. Footer is positioned to sit on top.
// ==========================================
export function ParallaxShell({
  activeTab = 'stays',
  hero,
  children,
}: {
  activeTab?: string;
  hero: ReactNode;
  children: ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="bg-canvas text-ink selection:bg-primary selection:text-canvas">
      <Navbar activeTab={activeTab} searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="transparent" />

      {hero}

      {/* Transparent spacer — reveals the fixed hero for the first screen */}
      <div className="h-screen" aria-hidden="true" />

      {/* Content layer — sticky panels rise over the fixed hero */}
      <div className="relative z-10 -mt-8">
        {children}
        {/* Footer must be positioned to paint above the sticky panels */}
        <div className="relative z-10 bg-canvas">
          <Footer />
        </div>
      </div>
    </div>
  );
}
