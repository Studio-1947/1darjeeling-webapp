import { useState, useMemo } from 'react';
import { drivers } from '../../../data/drivers';

export default function DriversScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedDriver, setBookedDriver] = useState<string | null>(null);

  const filteredDrivers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return drivers;
    return drivers.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.vehicle.toLowerCase().includes(q) ||
        d.languages.some(l => l.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleAction = (driverName: string, action: 'Book' | 'Call' | 'WhatsApp') => {
    if (action === 'Book') {
      setBookedDriver(driverName);
      setTimeout(() => setBookedDriver(null), 3000);
    } else if (action === 'Call') {
      window.location.href = `tel:+919876543210`;
    } else {
      window.open(`https://wa.me/919876543210?text=Hi, I would like to book a drive with ${driverName} through 1darjeeling.`, '_blank');
    }
  };

  return (
    <div className="pb-8">
      {/* Hero Banner */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-6 text-white">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-white/15 text-[10.5px] font-semibold text-amber-200 mb-3">
              🚕 Driver Directory
            </span>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2">
              Trusted Local Drivers
            </h1>
            <p className="text-[12.5px] leading-relaxed text-white/80">
              Darjeeling's mountain roads demand experienced hands. Hand-picked, local mountain drivers you can hire directly.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Alert Toast */}
      {bookedDriver && (
        <div className="fixed bottom-24 left-4 right-4 z-50 p-4 bg-emerald-950 text-white rounded-2xl shadow-xl text-center text-xs font-semibold animate-scale-up border border-emerald-800">
          🎉 Booking request sent to {bookedDriver}! They will confirm via WhatsApp or phone.
        </div>
      )}

      {/* Search Input */}
      <div className="px-4 mt-4">
        <div className="flex items-center bg-canvas-soft border border-hairline rounded-full px-4 py-2 w-full transition-all">
          <input
            type="text"
            placeholder="Search driver by name, vehicle or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] text-ink placeholder:text-mute outline-none border-none"
          />
        </div>
      </div>

      {/* Warning Info box */}
      <div className="px-4 mt-4">
        <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-3xl text-[11.5px] text-amber-950 leading-relaxed">
          <strong className="font-extrabold text-amber-950 block mb-0.5">⚠️ IMPORTANT PRICING NOTE</strong>
          Standard rates are ₹1,500–₹2,000 per day for sightseeing, and ₹2,500–₹3,500 for NJP/plains pick-ups. Always verify rates and route permits before finalizing your travel dates.
        </div>
      </div>

      {/* Drivers List */}
      <div className="px-4 mt-5 space-y-5">
        {filteredDrivers.map((driver) => {
          // Extract short vehicle category for photo badge
          const vLower = driver.vehicle.toLowerCase();
          const categoryBadge = vLower.includes('sumo') || vLower.includes('bolero') || vLower.includes('scorpio')
            ? '4x4 SUV'
            : vLower.includes('innova')
            ? 'Premium MPV'
            : vLower.includes('ertiga')
            ? 'MPV'
            : 'Vintage 4x4';

          return (
            <div
              key={driver.id}
              className="rounded-3xl border border-hairline bg-white shadow-xs overflow-hidden"
            >
              {/* Photo & Basic details split row */}
              <div className="flex flex-row p-4 gap-4">
                {/* Photo container */}
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-hairline bg-canvas-soft">
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: driver.photoPosition || 'center' }}
                  />
                  <span className="absolute bottom-1 left-1 bg-black/75 text-[8.5px] text-white font-bold px-1.5 py-0.5 rounded uppercase">
                    {categoryBadge}
                  </span>
                </div>

                {/* Details text */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-[16px] font-bold text-ink leading-snug truncate">
                        {driver.name}
                      </h3>
                      <img src="/verified.svg" className="w-3.5 h-3.5 object-contain shrink-0" alt="Verified" />
                    </div>
                    
                    <p className="text-[12px] font-semibold text-emerald-800 mt-0.5">
                      {driver.vehicle}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-body-text">
                      <span className="font-semibold text-ink">★ {driver.rating.toFixed(1)}</span>
                      <span>·</span>
                      <span>{driver.experienceYears} Years Exp</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-mute font-mono">
                    License: {driver.licenseNumber}
                  </p>
                </div>
              </div>

              {/* Language and routes info */}
              <div className="px-4 pb-4 space-y-3">
                <div className="border-t border-hairline pt-3 flex flex-col gap-2">
                  {/* Spoken Languages */}
                  <div className="flex items-center gap-2 text-[11px] text-body-text">
                    <img src="/language.svg" className="w-4 h-4 object-contain shrink-0" alt="" />
                    <span><strong>Speaks:</strong> {driver.languages.join(', ')}</span>
                  </div>

                  {/* Routes Covered */}
                  <div className="flex items-start gap-2 text-[11px] text-body-text">
                    <img src="/route.svg" className="w-4 h-4 object-contain shrink-0 mt-0.5" alt="" />
                    <div className="flex-1">
                      <strong>Routes:</strong>{' '}
                      <span className="capitalize">
                        {driver.routesOperated.map(r => r.replace('-', ' ')).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Action buttons */}
                <div className="grid grid-cols-3 gap-2 border-t border-hairline pt-3">
                  <button
                    onClick={() => handleAction(driver.name, 'Book')}
                    className="py-2.5 rounded-xl border border-emerald-700 text-emerald-800 text-[11px] font-extrabold hover:bg-emerald-50 active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    📅 Book
                  </button>
                  <button
                    onClick={() => handleAction(driver.name, 'Call')}
                    className="py-2.5 rounded-xl bg-ink text-white text-[11px] font-extrabold hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    📞 Call
                  </button>
                  <button
                    onClick={() => handleAction(driver.name, 'WhatsApp')}
                    className="py-2.5 rounded-xl bg-green-600 text-white text-[11px] font-extrabold hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>💬 WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
