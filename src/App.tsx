import { useState, useMemo } from 'react';
import { stays } from './data/stays';
import { drivers } from './data/drivers';
import { routes } from './data/routes';
import { cafes } from './data/cafes';
import { attractions } from './data/attractions';

type TabType = 'stays' | 'drivers' | 'routes' | 'cafes' | 'attractions';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('stays');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal & Booking States
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<TabType | null>(null);
  
  // Booking Calculator States
  const [bookingDays, setBookingDays] = useState(2);
  const [guestCount, setGuestCount] = useState(2);
  const [jeepHireType, setJeepHireType] = useState<'shared' | 'private'>('private');
  const [checkInDate, setCheckInDate] = useState('2026-07-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-07-12');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

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

  // Open Details Modal
  const handleOpenDetails = (item: any, type: TabType) => {
    setSelectedItem(item);
    setSelectedItemType(type);
    setBookingConfirmed(false);
  };

  // Close Modal
  const handleCloseDetails = () => {
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  // Calculate pricing
  const calculateTotal = () => {
    if (!selectedItem || !selectedItemType) return 0;
    if (selectedItemType === 'stays') {
      const price = parseInt(selectedItem.priceRange.replace(/[^0-9]/g, '')) || 1200;
      return price * bookingDays;
    }
    if (selectedItemType === 'drivers') {
      const price = parseInt(selectedItem.chargePerDay.replace(/[^0-9]/g, '')) || 3200;
      return price * bookingDays;
    }
    if (selectedItemType === 'routes') {
      const distNum = parseInt(selectedItem.distance.replace(/[^0-9]/g, '')) || 50;
      const base = distNum * 12;
      return jeepHireType === 'shared' ? Math.round(base * 0.15) * guestCount : Math.round(base * 1.2);
    }
    return 0;
  };

  // Mock reservation action
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      handleCloseDetails();
      alert("Reservation successfully requested! The local operator will contact you via WhatsApp shortly.");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-white">
      
      {/* ─── AIRBNB NAV HEADER ─── */}
      <header className="sticky top-0 z-40 bg-canvas border-b border-canvas-softer px-6 py-4 md:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Airbnb Style Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#" className="flex items-center gap-2.5 text-primary font-bold text-2xl tracking-tight">
            <img src="/logo.png" alt="1darjeeling logo" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span>1darjeeling</span>
          </a>
          <span className="text-xs bg-canvas-soft px-2.5 py-1 rounded-full border border-canvas-softer font-medium md:hidden">
            Airbnb Clone
          </span>
        </div>

        {/* Airbnb Floating Search Bar */}
        <div className="flex items-center bg-white border border-canvas-softer shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.1)] rounded-pill px-4 py-2 w-full md:w-auto max-w-lg transition-all cursor-pointer">
          <div className="flex-1 text-left px-2">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold outline-none border-none placeholder:text-body-text"
            />
          </div>
          <div className="w-[1px] h-6 bg-canvas-softer mx-3 hidden md:block"></div>
          <button className="bg-primary text-white p-2.5 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors min-w-[32px] min-h-[32px]">
            <span className="text-xs">🔍</span>
          </button>
        </div>

        {/* User profile controls */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold text-ink">
          <a href="#" className="hover:bg-canvas-soft px-4 py-2 rounded-full transition-colors">Airbnb your home</a>
          <span className="cursor-pointer">🌐</span>
          <div className="flex items-center space-x-2 border border-canvas-softer rounded-full p-2 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <span>☰</span>
            <div className="w-8 h-8 rounded-full bg-body-text text-white flex items-center justify-center text-xs">
              👤
            </div>
          </div>
        </div>
      </header>

      {/* ─── AIRBNB CATEGORIES BAR ─── */}
      <div className="sticky top-[73px] z-30 bg-canvas border-b border-canvas-softer py-4 px-6 md:px-20 flex items-center justify-start md:justify-center overflow-x-auto hide-scrollbar gap-10">
        {(
          [
            { id: 'stays', label: 'Homestays', icon: '/homestay.svg' },
            { id: 'drivers', label: 'Drivers', icon: '/driver.svg' },
            { id: 'routes', label: 'Jeep Routes', icon: '/routes.svg' },
            { id: 'cafes', label: 'Cafes', icon: '/cafe.svg' },
            { id: 'attractions', label: 'Experiences', icon: '/experiences.svg' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchQuery('');
            }}
            className={`flex flex-col items-center gap-2 pb-2.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-all outline-none ${
              activeTab === tab.id
                ? 'border-ink text-ink'
                : 'border-transparent text-body-text hover:text-ink hover:border-canvas-softer'
            }`}
          >
            <img 
              src={tab.icon} 
              alt={tab.label} 
              className={`w-15 h-15 object-contain transition-all ${
                activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
              }`} 
            />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── MAIN LISTINGS GRID (Airbnb Grid style) ─── */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <span className="text-5xl">🔎</span>
            <h3 className="text-xl font-bold text-ink">No properties found</h3>
            <p className="text-sm text-body-text">Try modifying your search or select another category above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            
            {/* 1. HOMESTAYS */}
            {activeTab === 'stays' &&
              (filteredItems as typeof stays).map((stay) => (
                <div
                  key={stay.id}
                  onClick={() => handleOpenDetails(stay, 'stays')}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
                    <img src={stay.photo} alt={stay.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold px-2.5 py-1 rounded-md border border-canvas-softer shadow-sm">
                      {stay.type}
                    </span>
                  </div>
                  <div className="text-sm space-y-0.5">
                    <div className="flex justify-between items-center font-semibold text-ink">
                      <span className="truncate pr-2">{stay.name}</span>
                      <span className="font-normal text-xs flex items-center gap-1">★ 4.92</span>
                    </div>
                    <p className="text-body-text text-xs">{stay.area}</p>
                    <p className="text-mute text-xs truncate">{stay.blurb}</p>
                    <p className="text-ink font-bold pt-1">
                      {stay.priceRange.split('–')[0]} <span className="font-normal text-body-text text-xs">/ night</span>
                    </p>
                  </div>
                </div>
              ))}

            {/* 2. DRIVERS */}
            {activeTab === 'drivers' &&
              (filteredItems as typeof drivers).map((driver) => (
                <div
                  key={driver.id}
                  onClick={() => handleOpenDetails(driver, 'drivers')}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
                    <img src={driver.photo} alt={driver.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute bottom-3 left-3 right-3 bg-white/95 text-center py-1 rounded-full text-xs font-semibold shadow-sm border border-canvas-softer">
                      {driver.vehicle}
                    </span>
                  </div>
                  <div className="text-sm space-y-0.5">
                    <div className="flex justify-between items-center font-semibold text-ink">
                      <span>{driver.name}</span>
                      <span className="font-normal text-xs">★ {driver.rating}</span>
                    </div>
                    <p className="text-body-text text-xs">{driver.experienceYears} years experience</p>
                    <p className="text-mute text-xs truncate">Speaks: {driver.languages.join(', ')}</p>
            
                  </div>
                </div>
              ))}

            {/* 3. JEEP ROUTES */}
            {activeTab === 'routes' &&
              (filteredItems as typeof routes).map((route) => (
                <div
                  key={route.id}
                  onClick={() => handleOpenDetails(route, 'routes')}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
                    <img src={route.photo} alt={route.from + ' to ' + route.to} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute bottom-3 left-3 right-3 bg-white/95 text-center py-1.5 rounded-lg text-xs font-bold shadow-sm border border-canvas-softer leading-none">
                      {route.from} ⇄ {route.to}
                    </span>
                  </div>
                  <div className="text-sm space-y-0.5">
                    <div className="flex justify-between items-center font-semibold text-ink">
                      <span>{route.distance}</span>
                      <span className="font-normal text-xs text-body-text">{route.duration}</span>
                    </div>
                    <p className="text-body-text text-xs">{route.road}</p>
                    <p className="text-mute text-xs truncate">{route.note}</p>
                    <p className="text-primary font-semibold text-xs pt-1">View Fare Details →</p>
                  </div>
                </div>
              ))}

            {/* 4. CAFES */}
            {activeTab === 'cafes' &&
              (filteredItems as typeof cafes).map((cafe) => (
                <div
                  key={cafe.id}
                  onClick={() => handleOpenDetails(cafe, 'cafes')}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
                    <img src={cafe.photo} alt={cafe.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-canvas-softer shadow-sm">
                      Est. {cafe.established}
                    </span>
                  </div>
                  <div className="text-sm space-y-0.5">
                    <div className="flex justify-between items-center font-semibold text-ink">
                      <span>{cafe.name}</span>
                      <span className="font-normal text-xs">★ {cafe.rating}</span>
                    </div>
                    <p className="text-body-text text-xs">{cafe.area}</p>
                    <p className="text-mute text-xs truncate">Specialty: {cafe.specialty}</p>
                    <p className="text-ink font-bold pt-1">{cafe.priceRange}</p>
                  </div>
                </div>
              ))}

            {/* 5. EXPERIENCES */}
            {activeTab === 'attractions' &&
              (filteredItems as typeof attractions).map((att) => (
                <div
                  key={att.id}
                  onClick={() => handleOpenDetails(att, 'attractions')}
                  className="group cursor-pointer flex flex-col space-y-2"
                >
                  <div className="aspect-square bg-canvas-soft rounded-xl relative overflow-hidden border border-canvas-softer">
                    <img src={att.photo} alt={att.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="text-sm space-y-0.5">
                    <div className="flex justify-between items-center font-semibold text-ink">
                      <span className="truncate pr-2">{att.name}</span>
                      <span className="font-normal text-xs whitespace-nowrap">{att.distance}</span>
                    </div>
                    <p className="text-body-text text-xs">{att.category}</p>
                    <p className="text-mute text-xs truncate">{att.blurb}</p>
                    <p className="text-primary font-semibold text-xs pt-1">Read details & tips →</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>

      {/* ─── AIRBNB STYLE DETAILED MODAL ─── */}
      {selectedItem && selectedItemType && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-canvas rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-canvas-softer animate-scale-up">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-canvas-softer px-6 py-4 flex items-center justify-between z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-body-text">
                {selectedItemType === 'attractions' ? 'Experience details' : `${selectedItemType} details`}
              </span>
              <button
                onClick={handleCloseDetails}
                className="text-lg font-mono text-body-text hover:text-black focus:outline-none p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Info Column */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-ink leading-tight">
                    {selectedItem.name || selectedItem.heading}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs text-body-text mt-2 font-medium">
                    <span>★ 4.90</span>
                    <span>·</span>
                    <span>{selectedItem.area || selectedItem.category || selectedItem.label}</span>
                  </div>
                </div>

                <div className="border-t border-canvas-softer pt-6 space-y-3">
                  <h4 className="text-sm font-semibold text-ink">About this listing</h4>
                  <p className="text-sm text-body-text leading-relaxed">
                    {selectedItem.blurb || selectedItem.body || selectedItem.note}
                  </p>
                </div>

                {/* Conditional Metadata */}
                {selectedItemType === 'stays' && (
                  <div className="border-t border-canvas-softer pt-6 space-y-3">
                    <h4 className="text-sm font-semibold text-ink">What this place offers</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm text-body-text">
                      <div>🥣 Free Breakfast</div>
                      <div>🔥 Fireplace heating</div>
                      <div>🚿 Hot water showers</div>
                      <div>⛰️ Kanchenjunga Balcony View</div>
                    </div>
                  </div>
                )}

                {selectedItemType === 'drivers' && (
                  <div className="border-t border-canvas-softer pt-6 space-y-3 text-sm text-body-text">
                    <h4 className="text-sm font-semibold text-ink text-black">Operator Details</h4>
                    <p><strong>Vehicle model:</strong> {selectedItem.vehicle}</p>
                    <p><strong>Experience:</strong> {selectedItem.experienceYears} Years driving Himalayan terrain</p>
                    <p><strong>Languages:</strong> {selectedItem.languages.join(', ')}</p>
                  </div>
                )}

                {selectedItemType === 'cafes' && (
                  <div className="border-t border-canvas-softer pt-6 space-y-3 text-sm text-body-text">
                    <h4 className="text-sm font-semibold text-ink text-black">Menu & Hours</h4>
                    <p><strong>Chef's Specialty:</strong> {selectedItem.specialty}</p>
                    <p><strong>Opening Hours:</strong> {selectedItem.hours}</p>
                    <p><strong>Established year:</strong> {selectedItem.established}</p>
                  </div>
                )}

                {selectedItemType === 'attractions' && (
                  <div className="border-t border-canvas-softer pt-6 space-y-3 text-sm">
                    <h4 className="text-sm font-semibold text-ink text-black">Insider Travel Tips</h4>
                    <div className="bg-canvas-soft p-4 rounded-xl border border-canvas-softer italic text-body-text">
                      "{selectedItem.tip}"
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Interactive Booking Card */}
              <div className="md:col-span-5">
                {['stays', 'drivers', 'routes'].includes(selectedItemType) ? (
                  <div className="bg-white rounded-2xl p-6 border border-canvas-softer shadow-lg space-y-5">
                    
                    {/* Booking header price */}
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl font-bold text-ink">
                        {selectedItem.priceRange ? selectedItem.priceRange.split('–')[0] : selectedItem.chargePerDay ? selectedItem.chargePerDay.split(' ')[0] : '₹1,500'}
                        <span className="text-xs font-normal text-body-text"> / day</span>
                      </span>
                      <span className="text-xs font-semibold text-ink">★ 4.90</span>
                    </div>

                    <form onSubmit={handleConfirmReservation} className="space-y-4">
                      {/* Airbnb Date / Guests stacked grid box */}
                      <div className="border border-canvas-softer rounded-xl overflow-hidden text-xs">
                        <div className="grid grid-cols-2 border-b border-canvas-softer">
                          <div className="p-2.5 border-r border-canvas-softer">
                            <label className="block font-bold text-ink uppercase text-[9px]">Check-in</label>
                            <input
                              type="date"
                              value={checkInDate}
                              onChange={(e) => setCheckInDate(e.target.value)}
                              className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium"
                            />
                          </div>
                          <div className="p-2.5">
                            <label className="block font-bold text-ink uppercase text-[9px]">Check-out</label>
                            <input
                              type="date"
                              value={checkOutDate}
                              onChange={(e) => setCheckOutDate(e.target.value)}
                              className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium"
                            />
                          </div>
                        </div>

                        {selectedItemType === 'routes' ? (
                          <div className="p-2.5">
                            <label className="block font-bold text-ink uppercase text-[9px] mb-1">Hire Class</label>
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                type="button"
                                onClick={() => setJeepHireType('shared')}
                                className={`py-1 text-[10px] rounded font-semibold border transition-all ${
                                  jeepHireType === 'shared' ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-canvas-softer'
                                }`}
                              >
                                Shared Seat
                              </button>
                              <button
                                type="button"
                                onClick={() => setJeepHireType('private')}
                                className={`py-1 text-[10px] rounded font-semibold border transition-all ${
                                  jeepHireType === 'private' ? 'bg-primary text-white border-primary' : 'bg-white text-ink border-canvas-softer'
                                }`}
                              >
                                Private Jeep
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-2.5">
                            <label className="block font-bold text-ink uppercase text-[9px]">Guests</label>
                            <select
                              value={guestCount}
                              onChange={(e) => setGuestCount(parseInt(e.target.value))}
                              className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium mt-0.5"
                            >
                              <option value={1}>1 guest</option>
                              <option value={2}>2 guests</option>
                              <option value={4}>4 guests</option>
                              <option value={6}>6 guests</option>
                            </select>
                          </div>
                        )}
                      </div>

                      {/* Day calculations */}
                      {['stays', 'drivers'].includes(selectedItemType) && (
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-body-text mb-1">Booking Duration (Days)</label>
                          <input
                            type="number"
                            min="1"
                            max="30"
                            value={bookingDays}
                            onChange={(e) => setBookingDays(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full bg-canvas-soft border border-canvas-softer p-2.5 rounded-lg text-xs"
                          />
                        </div>
                      )}

                      {/* Calculation breakdowns */}
                      <div className="space-y-2 pt-2 text-xs text-body-text">
                        <div className="flex justify-between">
                          <span>Fare estimate x duration</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Local service fee</span>
                          <span>₹150</span>
                        </div>
                        <div className="flex justify-between font-bold text-ink pt-2 border-t border-canvas-softer text-sm">
                          <span>Total before tax:</span>
                          <span>₹{calculateTotal() + 150}</span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={bookingConfirmed}
                        className="btn-airbnb-primary mt-2"
                      >
                        {bookingConfirmed ? (
                          <>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            Reserving...
                          </>
                        ) : (
                          "Reserve"
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-canvas-soft rounded-2xl p-6 border border-canvas-softer space-y-4 text-center">
                    <span className="text-4xl block">📍</span>
                    <h4 className="font-bold text-sm text-ink">Walk-in Location</h4>
                    <p className="text-xs text-body-text leading-relaxed">
                      This listing is open for visitors. No booking is required beforehand. Just save the timings and directions.
                    </p>
                    <button
                      onClick={handleCloseDetails}
                      className="w-full btn-airbnb-secondary py-2.5 text-xs font-semibold"
                    >
                      Close Details
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="bg-canvas-soft border-t border-canvas-softer py-12 px-6 md:px-20 text-sm text-ink">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Hosting</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">1darjeeling</h4>
            <ul className="space-y-2 text-xs text-body-text">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-canvas-softer flex flex-col md:flex-row justify-between items-center text-xs text-body-text space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} 1darjeeling, Inc. · <a href="#" className="hover:underline">Privacy</a> · <a href="#" className="hover:underline">Terms</a> · <a href="#" className="hover:underline">Sitemap</a>
          </div>
          <div className="flex space-x-4 font-semibold text-ink">
            <span>English (IN)</span>
            <span>₹ INR</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
