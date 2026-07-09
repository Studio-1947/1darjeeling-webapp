import type { Driver } from '../data/drivers';
import { useCardAnimation } from '../hooks/useCardAnimation';

interface DriversGridProps {
  items: Driver[];
  onSelect: (driver: Driver) => void;
}

const getVehicleLogo = (vehicleName: string) => {
  const name = (vehicleName || '').toLowerCase();
  if (name.includes('mahindra')) return '/mahindra.svg';
  if (name.includes('tata')) return '/tata.svg';
  if (name.includes('land rover')) return '/landrover.svg';
  if (name.includes('toyota')) return '/toyota.svg';
  if (name.includes('maruti') || name.includes('suzuki')) return '/maruti.svg';
  return '/route.svg';
};

export default function DriversGrid({ items, onSelect }: DriversGridProps) {
  const gridRef = useCardAnimation();

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((driver) => (
        <div
          key={driver.id}
          onClick={() => onSelect(driver)}
          className="group relative bg-white border border-canvas-softer hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
        >
          {/* Card Image Section */}
          <div className="relative h-64 w-full overflow-hidden bg-canvas-soft border-b border-canvas-softer">
            {driver.photo ? (
              <img
                src={driver.photo}
                alt={driver.name}
                style={{ objectPosition: driver.photoPosition || 'center' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Rating Badge */}
            <span className="absolute top-4 right-4 bg-white text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-canvas-softer">
              <span className="text-amber-500 text-sm">★</span>
              {driver.rating.toFixed(1)}
            </span>

            {/* Experience Years Badge */}
            <span className="absolute bottom-3 left-4 bg-white text-ink text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-canvas-softer">
              {driver.experienceYears} Years Exp
            </span>
          </div>

          {/* Card Content Section */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-200">
                  {driver.name}
                </h3>
                <img src="/verified.svg" className="w-4 h-4 object-contain shrink-0" alt="Verified" />
              </div>

              {/* Speaks Languages */}
              <div className="flex items-start gap-2 text-xs text-body-text">
                <img src="/language.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                <span> {driver.languages.join(', ')}</span>
              </div>

              {/* License plate (subtle) */}
              <p className="text-xs text-mute font-mono">
                License: {driver.licenseNumber}
              </p>

              {/* Vehicle Type */}
              <div className="flex items-center gap-2 text-xs text-body-text">
                <img 
                  src={getVehicleLogo(driver.vehicle)} 
                  className={`${(driver.vehicle || '').toLowerCase().includes('land rover') ? 'w-9.5 h-7.5' : 'w-7.5 h-7.5'} object-contain shrink-0`} 
                  alt="" 
                />
                <span> {driver.vehicle || 'Not Specified'}</span>
              </div>

              {/* Routes Operated  */}
              {driver.routesOperated && driver.routesOperated.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[10px] font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                    <img src="/route.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                    Routes Covered
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {driver.routesOperated.slice(0, 3).map(routeId => (
                      <span key={routeId} className="text-[10px] bg-canvas-soft text-body-text px-2 py-0.5 rounded-full border border-canvas-softer capitalize">
                        {routeId.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Hire Action Footer */}
            <div className="pt-4 border-t border-canvas-softer flex justify-between items-center">
              <span className="text-xs text-body-text font-medium flex items-center gap-1.5">
                <img src="/verified.svg" className="w-5.5 h-5.5 object-contain shrink-0" alt="" />
                Verified Local Guide
              </span>
              <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200 shrink-0">
                Hire Driver
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
