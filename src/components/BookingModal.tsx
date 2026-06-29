import React, { useState } from 'react';

interface BookingModalProps {
  selectedItem: any;
  selectedItemType: string;
  onClose: () => void;
}

export default function BookingModal({
  selectedItem,
  selectedItemType,
  onClose
}: BookingModalProps) {
  // Booking Calculator States
  const [bookingDays, setBookingDays] = useState(2);
  const [guestCount, setGuestCount] = useState(2);
  const [jeepHireType, setJeepHireType] = useState<'shared' | 'private'>('private');
  const [checkInDate, setCheckInDate] = useState('2026-07-10');
  const [checkOutDate, setCheckOutDate] = useState('2026-07-12');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Calculate pricing
  const calculateTotal = () => {
    if (!selectedItem || !selectedItemType) return 0;
    if (selectedItemType === 'stays') {
      const price = parseInt(selectedItem.priceRange.replace(/[^0-9]/g, '')) || 1200;
      return price * bookingDays;
    }
    // Drivers don't have price inside details anymore, let's use a standard default or details fallback
    if (selectedItemType === 'drivers') {
      return 3200 * bookingDays; // Standard rate
    }
    if (selectedItemType === 'routes') {
      const distNum = parseInt(selectedItem.distance.replace(/[^0-9]/g, '')) || 50;
      const base = distNum * 12;
      return jeepHireType === 'shared' ? Math.round(base * 0.15) * guestCount : Math.round(base * 1.2);
    }
    return 0;
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      onClose();
      alert("Reservation successfully requested! The local operator will contact you via WhatsApp shortly.");
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-canvas rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-canvas-softer animate-scale-up">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-canvas border-b border-canvas-softer px-6 py-4 flex items-center justify-between z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-body-text">
            {selectedItemType === 'attractions' ? 'Experience details' : `${selectedItemType} details`}
          </span>
          <button
            onClick={onClose}
            className="text-lg font-mono text-body-text hover:text-ink focus:outline-none p-1"
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
                <h4 className="text-sm font-semibold text-ink">Operator Details</h4>
                <p><strong>Vehicle model:</strong> {selectedItem.vehicle}</p>
                <p><strong>Experience:</strong> {selectedItem.experienceYears} Years driving Himalayan terrain</p>
                <p><strong>Languages:</strong> {selectedItem.languages.join(', ')}</p>
              </div>
            )}

            {selectedItemType === 'cafes' && (
              <div className="border-t border-canvas-softer pt-6 space-y-3 text-sm text-body-text">
                <h4 className="text-sm font-semibold text-ink">Menu & Hours</h4>
                <p><strong>Chef's Specialty:</strong> {selectedItem.specialty}</p>
                <p><strong>Opening Hours:</strong> {selectedItem.hours}</p>
                <p><strong>Established year:</strong> {selectedItem.established}</p>
              </div>
            )}

            {selectedItemType === 'attractions' && (
              <div className="border-t border-canvas-softer pt-6 space-y-3 text-sm">
                <h4 className="text-sm font-semibold text-ink">Insider Travel Tips</h4>
                <div className="bg-canvas-soft p-4 rounded-xl border border-canvas-softer italic text-body-text">
                  "{selectedItem.tip}"
                </div>
              </div>
            )}
          </div>

          {/* Dynamic Interactive Booking Card */}
          <div className="md:col-span-5">
            {['stays', 'drivers', 'routes'].includes(selectedItemType) ? (
              <div className="bg-canvas rounded-2xl p-6 border border-canvas-softer shadow-lg space-y-5">
                
                {/* Booking header price */}
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-bold text-ink">
                    {selectedItem.priceRange ? selectedItem.priceRange.split('–')[0] : '₹3,200'}
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
                          className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium text-ink"
                        />
                      </div>
                      <div className="p-2.5">
                        <label className="block font-bold text-ink uppercase text-[9px]">Check-out</label>
                        <input
                          type="date"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium text-ink"
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
                              jeepHireType === 'shared' ? 'bg-primary text-canvas border-primary' : 'bg-canvas text-ink border-canvas-softer'
                            }`}
                          >
                            Shared Seat
                          </button>
                          <button
                            type="button"
                            onClick={() => setJeepHireType('private')}
                            className={`py-1 text-[10px] rounded font-semibold border transition-all ${
                              jeepHireType === 'private' ? 'bg-primary text-canvas border-primary' : 'bg-canvas text-ink border-canvas-softer'
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
                          className="w-full bg-transparent border-none p-0 outline-none text-xs font-medium mt-0.5 text-ink"
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
                  onClick={onClose}
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
  );
}
