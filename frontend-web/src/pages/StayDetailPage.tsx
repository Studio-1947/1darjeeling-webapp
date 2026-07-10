import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { stays } from '../data/stays';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlaceCoords } from '../data/placeGeo';
import { useAuthStore } from '../store/authStore';

// ==========================================
// 1. DYNAMIC & CUSTOMIZABLE SECTION CONFIG
// ==========================================
export interface StaySectionConfig {
  id: 'description' | 'amenities' | 'map' | 'custom_rules' | 'host_details';
  title: string;
  visible: boolean;
  order: number;
  // Extra props for advanced overrides (e.g. custom icons, columns)
  props?: {
    customContent?: string;
    columnLayout?: 'single' | 'double';
    showMapSatellite?: boolean;
    [key: string]: any;
  };
}

export interface StayLayoutConfig {
  sections: StaySectionConfig[];
  theme?: {
    primaryColor?: string;
    borderRadius?: string;
    galleryHeight?: string;
  };
}

// High-resolution cover image for the hero. The per-stay `photo` fields are
// only ~800–1024px wide, so they look blurry stretched across a full-screen
// hero — this crisp 2400px source keeps the hero sharp for every homestay.
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=85';

const DEFAULT_LAYOUT_CONFIG: StayLayoutConfig = {
  sections: [
    { id: 'description', title: 'About the Homestay', visible: true, order: 1 },
    { id: 'amenities', title: 'What this place offers', visible: true, order: 2 },
    { id: 'host_details', title: 'Meet Your Host', visible: true, order: 3 },
    { id: 'map', title: "Where you'll be", visible: true, order: 4 },
  ],
  theme: {
    primaryColor: 'text-primary',
    borderRadius: 'rounded-3xl',
    galleryHeight: 'h-[300px] md:h-[450px]',
  }
};

// ==========================================
// 2. MODULAR SUB-COMPONENTS
// ==========================================

// Reveal-on-scroll: fades + lifts content once it enters the viewport
function useInView<T extends HTMLElement>(threshold = 0.2) {
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

// Sticky parallax panel — each section pins to the viewport while the next
// section scrolls up and covers it, so every section gets its own parallax.
function SectionPanel({ children, bg = 'bg-canvas', dark = false }: { children: React.ReactNode; bg?: string; dark?: boolean }) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`sticky top-0 min-h-screen w-full flex items-center rounded-t-[2.5rem] shadow-[0_-24px_50px_rgba(0,0,0,0.18)] ${bg} ${dark ? 'text-white' : 'text-ink'}`}
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

// Large panel heading with an eyebrow label
function PanelHeader({ eyebrow, title, iconSrc, dark = false }: { eyebrow: string; title: string; iconSrc: string; dark?: boolean }) {
  return (
    <div className="mb-10">
      <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 ${dark ? 'text-white/50' : 'text-primary/50'}`}>
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

// DESCRIPTION SECTION
function StayDescription({ stay, title }: { stay: any; title: string }) {
  // Use custom description if admin set one, otherwise fallback to default blurb description
  const customDescription = stay.customDescription || stay.providerConfig?.customDescription;

  return (
    <div>
      <PanelHeader eyebrow="The Story" title={title} iconSrc="/rooms.svg" />
      <div className="grid md:grid-cols-3 gap-10 items-start">
        <div className="md:col-span-2 space-y-6">
          <p className="text-base md:text-lg text-body-text leading-relaxed font-normal">
            {customDescription || `Experience the authentic warm hospitality of Darjeeling. This charming ${stay.type.toLowerCase()} located in the peaceful neighborhood of ${stay.area} offers cozy rooms with traditional mountain wooden interiors.`}
          </p>
          <p className="text-base md:text-lg text-body-text leading-relaxed font-normal">
            Enjoy home-cooked traditional Gorkha meals prepared fresh daily using local ingredients. The balcony offers stunning valley views, and on clear mornings, you can catch a glimpse of the majestic Kanchenjunga range.
          </p>
        </div>
        <div className="space-y-4 md:border-l md:border-canvas-softer md:pl-8">
          {[
            { label: 'Property type', value: stay.type },
            { label: 'Neighbourhood', value: stay.area },
            { label: 'Guest rating', value: '4.92 / 5' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[11px] font-bold uppercase tracking-wider text-mute">{item.label}</p>
              <p className="text-base font-semibold text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AMENITIES SECTION
function StayAmenities({ title, amenities }: { title: string; amenities: string[] }) {
  const allAmenities = [...amenities, 'Traditional Mountain Fireplace', 'Free Premium Darjeeling Tea'];

  return (
    <div>
      <PanelHeader eyebrow="Comfort & Amenities" title={title} iconSrc="/tags.svg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAmenities.map((amenity: string, i: number) => (
          <div
            key={`${amenity}-${i}`}
            className="flex items-center gap-3 p-4 bg-white border border-canvas-softer rounded-2xl hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink capitalize">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// HOST DETAILS SECTION
function StayHostDetails({ stay, title }: { stay: any; title: string }) {
  const hostName = stay.providerConfig?.hostName || 'Local Family';
  const hostBio = stay.providerConfig?.hostBio || 'We love sharing our mountain culture, traditional food, and tea garden paths with travelers from all over the world.';

  return (
    <div>
      <PanelHeader eyebrow="Your Hosts" title={title} iconSrc="/verified.svg" />
      <div className="flex flex-col sm:flex-row items-start gap-6 p-8 bg-white border border-canvas-softer rounded-3xl shadow-sm max-w-3xl">
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 shrink-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=200&q=80"
            className="w-full h-full object-cover"
            alt={`Host ${hostName}`}
          />
        </div>
        <div>
          <h4 className="font-bold text-ink text-xl mb-1">Hosted by {hostName}</h4>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/60 mb-3">Superhost · Responds within an hour</p>
          <p className="text-base text-body-text leading-relaxed">{hostBio}</p>
        </div>
      </div>
    </div>
  );
}

// LOCATION MAP SECTION
function StayLocationMap({ stay, title, coordinates }: { stay: any; title: string; coordinates: [number, number] }) {
  return (
    <div>
      <PanelHeader eyebrow="Location" title={title} iconSrc="/location.svg" />
      <p className="text-sm md:text-base text-body-text font-medium mb-5">
        {stay.area}, Darjeeling, West Bengal, India
      </p>
      <div className="h-[45vh] min-h-[320px] rounded-3xl overflow-hidden border border-canvas-softer shadow-inner relative z-10">
        <MapContainer center={coordinates} zoom={14} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <CircleMarker
            center={coordinates}
            radius={9}
            pathOptions={{ color: '#fff', weight: 3, fillColor: '#EA4335', fillOpacity: 1 }}
          >
            <Tooltip permanent direction="top" offset={[0, -9]}>
              {stay.name}
            </Tooltip>
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  );
}

// CUSTOM RULES SECTION (e.g. check-in curfew, smoking policy, pet policy)
function StayCustomRules({ title, config }: { title: string; config: any }) {
  const rules = config?.props?.customContent
    ? config.props.customContent.split('\n')
    : ['Check-in: After 12:00 PM', 'Check-out: 10:00 AM', 'Quiet hours: After 10:00 PM', 'No smoking inside rooms'];

  return (
    <div>
      <PanelHeader eyebrow="Good to know" title={title} iconSrc="/tip.svg" />
      <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl">
        {rules.map((rule: string, i: number) => (
          <li key={i} className="text-sm md:text-base text-body-text flex items-start gap-3 leading-relaxed p-4 bg-white border border-canvas-softer rounded-2xl">
            <span className="text-primary mt-1 text-lg leading-none">•</span>
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 3. MAIN COMPONENT StayDetailPage
// ==========================================
export default function StayDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stay, setStay] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Booking states
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Layout configuration loaded dynamically
  const [layoutConfig, setLayoutConfig] = useState<StayLayoutConfig>(DEFAULT_LAYOUT_CONFIG);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        setLoading(true);
        // 1. Check if the ID matches a static stay first
        const staticStay = stays.find((s) => s.id === id);
        if (staticStay) {
          setStay({
            ...staticStay,
            isStatic: true,
          });
          setLoading(false);
          return;
        }

        // 2. Otherwise fetch from dynamic API
        const response = await api.get(`/api/homestay/public/${id}`);
        const h = response.data;
        const pConfig = h.providerConfig || {};
        
        // Merge layout configuration customisations if provided by dynamic configs from db/admin
        if (pConfig.layoutConfig) {
          setLayoutConfig({
            ...DEFAULT_LAYOUT_CONFIG,
            ...pConfig.layoutConfig
          });
        }

        setStay({
          id: h.id,
          name: pConfig.propertyName || h.name || 'Homestay',
          type: 'Homestay',
          area: pConfig.location || 'Darjeeling',
          priceRange: pConfig.basePrice ? `₹${pConfig.basePrice} / night` : 'Price on request',
          blurb: pConfig.amenities?.join(', ') || 'A beautiful homestay.',
          photo: 'https://images.unsplash.com/photo-1542314831-c6a420325970?auto=format&fit=crop&q=80',
          heroPhoto: pConfig.heroPhoto || pConfig.coverImage || pConfig.heroImage,
          isStatic: false,
          providerConfig: pConfig,
          raw: h
        });
      } catch (err: any) {
        console.error('Failed to load stay details:', err);
        setError(err.response?.data?.message || 'Failed to load homestay details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStay();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please log in or sign up to book a stay.');
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select both Check-in and Check-out dates.');
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingSuccess(true);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary font-semibold tracking-wide animate-pulse">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error || !stay) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-canvas text-ink">
        <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="solid" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-6xl mb-4">🏔️</span>
          <h2 className="text-2xl font-extrabold mb-2 font-display">Oops! Stay Not Found</h2>
          <p className="text-body-text max-w-md mb-6">{error || 'The homestay you are looking for might have been removed or is currently unavailable.'}</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2.5 bg-primary text-canvas font-bold rounded-xl shadow-lg hover:opacity-90 transition-all"
          >
            Go Back Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const coordinates = getPlaceCoords(stay.id);
  const amenities = stay.blurb && stay.blurb.includes(',')
    ? stay.blurb.split(',').map((s: string) => s.trim())
    : [stay.blurb || 'Cozy rooms', 'Scenic views', 'Warm hospitality'];

  const priceString = stay.priceRange;
  const priceNumberMatch = priceString.match(/₹([\d,]+)/);
  const displayPrice = priceNumberMatch ? `₹${priceNumberMatch[1]}` : priceString.split('/')[0].trim();

  // Sort and filter active sections from configuration
  const activeSections = layoutConfig.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-canvas text-ink selection:bg-primary selection:text-canvas">
      <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="transparent" />

      {/* ========================================== */}
      {/* HERO — fixed parallax layer. Stays pinned   */}
      {/* while the content below rises up over it.   */}
      {/* ========================================== */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden bg-black z-0">
        <img
          src={stay.heroPhoto || HERO_IMAGE}
          alt={stay.name}
          onError={(e) => { if (e.currentTarget.src !== HERO_IMAGE) e.currentTarget.src = HERO_IMAGE; }}
          className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fade-in"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Hero content vertically centered and left-aligned */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-center w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/70 mb-5 animate-fade-in">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Stays</button>
            <span>/</span>
            <span className="text-white font-medium">{stay.name}</span>
          </div>

          {/* Type badge */}
          <span className="inline-flex items-center gap-1.5 self-start bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            <img src="/rooms.svg" className="w-4 h-4 object-contain brightness-0 invert" alt="" />
            {stay.type}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display text-white drop-shadow-lg mb-4 max-w-3xl" style={{ color: 'white' }}>
            {stay.name}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:text-base text-white/90">
            <span className="flex items-center gap-1.5">
              <span className="text-amber-400 text-base">★</span>
              <strong className="font-bold text-white">4.92</strong>
              <span className="text-white/70">(18 reviews)</span>
            </span>
            <span className="hidden sm:block text-white/40">·</span>
            <span className="flex items-center gap-1.5">
              <img src="/location.svg" className="w-4 h-4 object-contain brightness-0 invert" alt="" />
              <span className="font-medium">{stay.area}, Darjeeling</span>
            </span>
            <span className="hidden sm:block text-white/40">·</span>
            <span className="font-bold text-white">
              {displayPrice} <span className="font-normal text-white/70 text-sm">/ night</span>
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-white/60 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Transparent spacer — reveals the fixed hero for the first screen */}
      <div className="h-screen" aria-hidden="true" />

      {/* ========================================== */}
      {/* CONTENT — each panel is sticky and rises up  */}
      {/* over the previous one (per-section parallax). */}
      {/* No overflow-hidden here: it would break the   */}
      {/* sticky pinning of the panels inside.          */}
      {/* ========================================== */}
      <div className="relative z-10 -mt-8">
      {activeSections.map((section, i) => {
        const bg = i % 2 === 0 ? 'bg-canvas' : 'bg-canvas-soft';
        switch (section.id) {
          case 'description':
            return (
              <SectionPanel key={section.id} bg={bg}>
                <StayDescription stay={stay} title={section.title} />
              </SectionPanel>
            );
          case 'amenities':
            return (
              <SectionPanel key={section.id} bg={bg}>
                <StayAmenities title={section.title} amenities={amenities} />
              </SectionPanel>
            );
          case 'host_details':
            return (
              <SectionPanel key={section.id} bg={bg}>
                <StayHostDetails stay={stay} title={section.title} />
              </SectionPanel>
            );
          case 'map':
            return (
              <SectionPanel key={section.id} bg={bg}>
                <StayLocationMap stay={stay} title={section.title} coordinates={coordinates} />
              </SectionPanel>
            );
          case 'custom_rules':
            return (
              <SectionPanel key={section.id} bg={bg}>
                <StayCustomRules title={section.title} config={section} />
              </SectionPanel>
            );
          default:
            return null;
        }
      })}

      {/* ========================================== */}
      {/* RESERVE / PRICING — final full screen       */}
      {/* ========================================== */}
      <SectionPanel bg="bg-ink" dark>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Pricing headline */}
          <div>
            <PanelHeader eyebrow="Reserve" title="Book your stay" iconSrc="/price.svg" dark />
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-4xl md:text-5xl font-extrabold text-white" style={{ color: 'white' }}>{displayPrice}</span>
              <span className="text-white/60 text-lg font-medium">/ night</span>
            </div>
            {stay.priceRange && stay.priceRange.includes('–') && (
              <p className="text-sm text-white/60 mb-4">Rates range {stay.priceRange}</p>
            )}
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="text-amber-400">★</span>
              <span className="font-semibold text-white">4.92</span>
              <span className="text-white/50">· 18 reviews · Superhost</span>
            </div>
            <p className="text-sm text-white/50 mt-6 max-w-sm leading-relaxed">
              You won't be charged yet — the host confirms availability first, then reaches out to finalise your mountain getaway.
            </p>
          </div>

          {/* Booking card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
            {bookingSuccess ? (
              <div className="text-center py-8 space-y-4 animate-scale-up">
                <span className="text-5xl">🎉</span>
                <h4 className="text-xl font-bold text-ink font-display">Booking Requested!</h4>
                <p className="text-sm text-body-text px-4">
                  Your request has been sent to the host. They will contact you shortly to confirm your booking at {stay.name}.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="w-full mt-4 py-3 bg-canvas-soft border border-canvas-softer text-ink font-semibold rounded-xl text-sm hover:bg-canvas transition-all"
                >
                  Book again
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-5">
                <div className="border border-canvas-softer rounded-2xl overflow-hidden bg-canvas-soft/30">
                  <div className="flex border-b border-canvas-softer">
                    <div className="flex-1 p-3 border-r border-canvas-softer">
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-ink mb-1">
                        Check-in
                      </label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent text-sm text-ink outline-none font-medium border-none"
                      />
                    </div>
                    <div className="flex-1 p-3">
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-ink mb-1">
                        Check-out
                      </label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent text-sm text-ink outline-none font-medium border-none"
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-ink mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-transparent text-sm text-ink outline-none font-medium border-none cursor-pointer"
                    >
                      <option value="1" className="bg-canvas">1 guest</option>
                      <option value="2" className="bg-canvas">2 guests</option>
                      <option value="3" className="bg-canvas">3 guests</option>
                      <option value="4" className="bg-canvas">4 guests</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isBooking}
                  className="w-full py-3.5 bg-primary text-canvas font-bold text-sm rounded-2xl shadow-lg hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isBooking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-canvas border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Reserve this Homestay</span>
                  )}
                </button>

                <p className="text-center text-xs text-body-text">
                  You won't be charged yet. The host will confirm availability first.
                </p>
              </form>
            )}
          </div>
        </div>
      </SectionPanel>

        {/* Footer must be positioned to paint above the sticky panels */}
        <div className="relative z-10 bg-canvas">
          <Footer />
        </div>
      </div>
    </div>
  );
}
