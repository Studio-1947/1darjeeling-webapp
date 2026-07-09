import { useState, useEffect } from 'react';
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

interface SectionHeaderProps {
  title: string;
  iconSrc: string;
}

function SectionHeader({ title, iconSrc }: SectionHeaderProps) {
  return (
    <h3 className="text-lg font-bold font-display text-ink flex items-center gap-2 mb-4">
      <img src={iconSrc} className="w-6 h-6 object-contain" alt="" />
      {title}
    </h3>
  );
}

// DESCRIPTION SECTION
function StayDescription({ stay, title }: { stay: any; title: string }) {
  // Use custom description if admin set one, otherwise fallback to default blurb description
  const customDescription = stay.customDescription || stay.providerConfig?.customDescription;
  
  return (
    <div className="space-y-4">
      <SectionHeader title={title} iconSrc="/rooms.svg" />
      <p className="text-sm md:text-base text-body-text leading-relaxed font-normal">
        {customDescription || `Experience the authentic warm hospitality of Darjeeling. This charming ${stay.type.toLowerCase()} located in the peaceful neighborhood of ${stay.area} offers cozy rooms with traditional mountain wooden interiors.`}
      </p>
      <p className="text-sm md:text-base text-body-text leading-relaxed font-normal">
        Enjoy home-cooked traditional Gorkha meals prepared fresh daily using local ingredients. The balcony offers stunning valley views, and on clear mornings, you can catch a glimpse of the majestic Kanchenjunga range.
      </p>
    </div>
  );
}

// AMENITIES SECTION
function StayAmenities({ title, amenities }: { title: string; amenities: string[] }) {
  return (
    <div className="space-y-4 pt-6 border-t border-canvas-softer">
      <SectionHeader title={title} iconSrc="/tags.svg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {amenities.map((amenity: string) => (
          <div key={amenity} className="flex items-center gap-3 text-sm text-body-text">
            <span className="w-2.5 h-2.5 rounded-full bg-primary/40 shrink-0" />
            <span className="capitalize">{amenity}</span>
          </div>
        ))}
        {/* Additional default amenities that are always present */}
        <div className="flex items-center gap-3 text-sm text-body-text">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40 shrink-0" />
          <span>Traditional Mountain Fireplace</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-body-text">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/40 shrink-0" />
          <span>Free Premium Darjeeling Tea</span>
        </div>
      </div>
    </div>
  );
}

// HOST DETAILS SECTION
function StayHostDetails({ stay, title }: { stay: any; title: string }) {
  const hostName = stay.providerConfig?.hostName || 'Local Family';
  const hostBio = stay.providerConfig?.hostBio || 'We love sharing our mountain culture, traditional food, and tea garden paths with travelers from all over the world.';
  
  return (
    <div className="space-y-4 pt-6 border-t border-canvas-softer">
      <SectionHeader title={title} iconSrc="/verified.svg" />
      <div className="flex items-start gap-4 p-5 bg-canvas-soft border border-canvas-softer rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20 shrink-0">
          🏡
        </div>
        <div>
          <h4 className="font-bold text-ink text-sm">Hosted by {hostName}</h4>
          <p className="text-xs text-body-text mt-1 leading-relaxed">{hostBio}</p>
        </div>
      </div>
    </div>
  );
}

// LOCATION MAP SECTION
function StayLocationMap({ stay, title, coordinates }: { stay: any; title: string; coordinates: [number, number] }) {
  return (
    <div className="space-y-4 pt-6 border-t border-canvas-softer">
      <SectionHeader title={title} iconSrc="/location.svg" />
      <p className="text-xs md:text-sm text-body-text font-medium">
        {stay.area}, Darjeeling, West Bengal, India
      </p>
      <div className="h-72 rounded-3xl overflow-hidden border border-canvas-softer shadow-inner relative z-10">
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
    <div className="space-y-4 pt-6 border-t border-canvas-softer">
      <SectionHeader title={title} iconSrc="/tip.svg" />
      <ul className="space-y-2.5">
        {rules.map((rule: string, i: number) => (
          <li key={i} className="text-xs md:text-sm text-body-text flex items-start gap-2 leading-relaxed">
            <span className="text-primary mt-0.5">•</span>
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

  const theme = layoutConfig.theme || DEFAULT_LAYOUT_CONFIG.theme;

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-canvas flex flex-col">
      <Navbar activeTab="stays" searchQuery={searchQuery} onSearchChange={setSearchQuery} variant="solid" />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 pb-16 max-w-7xl mx-auto px-6 md:px-20 animate-fade-in w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-body-text mb-6">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
          <span>/</span>
          <span className="text-ink font-semibold">{stay.name}</span>
        </div>

        {/* Header Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-ink mb-3 animate-fade-in">
            {stay.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-body-text">
            <span className="flex items-center gap-1">
              <span className="text-amber-500 text-base">★</span>
              <strong className="text-ink font-semibold">4.92</strong>
              <span>·</span>
              <span className="underline cursor-pointer">18 reviews</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <img src="/location.svg" className="w-4 h-4 object-contain" alt="" />
              <span className="underline font-medium text-ink">{stay.area}, Darjeeling</span>
            </span>
            <span>·</span>
            <span className="bg-canvas-soft border border-canvas-softer px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase text-primary">
              {stay.type}
            </span>
          </div>
        </div>

        {/* Gallery / Cover Image */}
        <div className={`relative ${theme?.galleryHeight || 'h-[300px] md:h-[450px]'} ${theme?.borderRadius || 'rounded-3xl'} overflow-hidden shadow-md mb-10 group bg-canvas-soft border border-canvas-softer`}>
          <img 
            src={stay.photo} 
            alt={stay.name}
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Details and Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left details pane: cols 7 (Configuration-Driven Ordering) */}
          <div className="lg:col-span-7 space-y-10">
            {activeSections.map((section) => {
              switch (section.id) {
                case 'description':
                  return (
                    <StayDescription 
                      key={section.id} 
                      stay={stay} 
                      title={section.title} 
                    />
                  );
                case 'amenities':
                  return (
                    <StayAmenities 
                      key={section.id} 
                      title={section.title} 
                      amenities={amenities} 
                    />
                  );
                case 'host_details':
                  return (
                    <StayHostDetails 
                      key={section.id} 
                      stay={stay} 
                      title={section.title} 
                    />
                  );
                case 'map':
                  return (
                    <StayLocationMap 
                      key={section.id} 
                      stay={stay} 
                      title={section.title} 
                      coordinates={coordinates} 
                    />
                  );
                case 'custom_rules':
                  return (
                    <StayCustomRules 
                      key={section.id} 
                      title={section.title} 
                      config={section} 
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Right side booking card: cols 5 */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-white border border-canvas-softer rounded-3xl shadow-xl p-6 md:p-8 space-y-6">
              <div className="flex items-baseline justify-between border-b border-canvas-softer pb-4">
                <div>
                  <span className="text-2xl md:text-3xl font-extrabold text-ink">{displayPrice}</span>
                  <span className="text-body-text text-sm font-medium"> / night</span>
                </div>
                <div className="text-xs text-body-text font-semibold flex items-center gap-1">
                  <span className="text-amber-500 text-sm">★</span>
                  <span>4.92</span>
                </div>
              </div>

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
                <form onSubmit={handleBooking} className="space-y-6">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
