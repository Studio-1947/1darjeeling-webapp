import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { TabType } from '../Home';
import RouteMap from './RouteMap';
import { getPlaceCoords, DRIVER_STAND } from '../data/placeGeo';

const getVehicleLogo = (vehicleName: string) => {
  const name = (vehicleName || '').toLowerCase();
  if (name.includes('mahindra')) return '/mahindra.svg';
  if (name.includes('tata')) return '/tata.svg';
  if (name.includes('land rover')) return '/landrover.svg';
  if (name.includes('toyota')) return '/toyota.svg';
  if (name.includes('maruti') || name.includes('suzuki')) return '/maruti.svg';
  return '/route.svg';
};

interface DetailSidebarProps {
  item: any;
  type: TabType;
  onClose: () => void;
  onBook: () => void;
}

/** Simple single-marker map for point places (stays, cafes, attractions, offbeat, drivers). */
function PointMap({ coords, name }: { coords: [number, number]; name: string }) {
  return (
    <MapContainer center={coords} zoom={14} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <CircleMarker
        center={coords}
        radius={8}
        pathOptions={{ color: '#fff', weight: 3, fillColor: '#EA4335', fillOpacity: 1 }}
      >
        <Tooltip permanent direction="top" offset={[0, -9]}>{name}</Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 px-6 py-3.5 border-b border-canvas-softer last:border-b-0">
      <span className="text-primary text-lg leading-6 shrink-0">{icon}</span>
      <span className="text-sm text-body-text leading-6">{children}</span>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500 tracking-tight text-sm" aria-label={`${rating} out of 5`}>
      {'★'.repeat(Math.round(rating))}
      <span className="text-canvas-softer">{'★'.repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

const TYPE_LABEL: Partial<Record<TabType, string>> = {
  stays: 'Homestay',
  drivers: 'Local driver',
  routes: 'Route',
  cafes: 'Cafe & restaurant',
  attractions: 'Experience',
  offbeat: 'Offbeat place',
};

const BOOKABLE: TabType[] = ['stays', 'drivers', 'routes'];

export default function DetailSidebar({ item, type, onClose, onBook }: DetailSidebarProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const title = item.name || `${item.from} ⇄ ${item.to}`;
  const geoKey = type === 'offbeat' ? item.name : item.id;
  const coords: [number, number] = type === 'drivers' ? DRIVER_STAND : getPlaceCoords(geoKey);
  const subtitle =
    type === 'drivers'
      ? item.vehicle
      : item.type || item.category || item.specialty || item.area || TYPE_LABEL[type];
  const rating: number | null =
    typeof item.rating === 'number' ? item.rating : type === 'stays' ? 4.9 : null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 animate-fade-in" onClick={onClose} />

      {/* Panel */}
      <aside
        data-lenis-prevent
        className="fixed top-0 left-0 z-50 h-full w-full sm:w-[440px] bg-canvas shadow-2xl flex flex-col animate-slide-in-left"
        role="dialog"
        aria-label={title}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero header — photo under a primary-tinted gradient with the title overlaid */}
          <div className="relative h-60 shrink-0 overflow-hidden">
            {item.photo ? (
              <img
                src={item.photo}
                alt={title}
                style={{ objectPosition: item.photoPosition || 'center' }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
            <button
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-canvas/90 text-ink text-sm font-mono shadow-md hover:bg-canvas focus:outline-none"
            >
              ✕
            </button>
            <h2 className="absolute bottom-4 left-6 right-6 text-3xl font-extrabold !text-white leading-tight drop-shadow-md font-display">
              {title}
            </h2>
          </div>

          {/* Name / rating block */}
          {type !== 'routes' && (
            <div className="px-6 pt-5 pb-4 border-b border-canvas-softer">
              <p className="text-sm text-body-text">{TYPE_LABEL[type]}</p>
              <div className="flex items-center gap-2 mt-1.5 text-sm">
                {rating !== null && (
                  <>
                    <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
                    <Stars rating={rating} />
                    <span className="text-mute">·</span>
                  </>
                )}
                <span className="text-body-text">{subtitle}</span>
              </div>
            </div>
          )}

          {/* Detail rows */}
          <div className="border-b border-canvas-softer">
            {type === 'stays' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.area}, Darjeeling, West Bengal</InfoRow>
                <InfoRow icon={<img src="/price.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.priceRange}</InfoRow>
                {item.blurb && <InfoRow icon={<img src="/rooms.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.blurb}</InfoRow>}
              </>
            )}
            {type === 'drivers' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>Picks up from Chowk Bazaar motor stand, Darjeeling</InfoRow>
                <InfoRow icon={<img src={getVehicleLogo(item.vehicle)} className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.vehicle} · {item.experienceYears} yrs experience</InfoRow>
                <InfoRow icon={<img src="/language.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>Speaks {item.languages?.join(', ')}</InfoRow>
                {item.routesOperated?.length > 0 && (
                  <InfoRow icon={<img src="/route.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>Operates: {item.routesOperated.join(', ')}</InfoRow>
                )}
              </>
            )}
            {type === 'routes' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.road}</InfoRow>
                <InfoRow icon={<img src="/time.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.distance} · {item.duration}</InfoRow>
                {item.note && <InfoRow icon={<img src="/route.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.note}</InfoRow>}
              </>
            )}
            {type === 'cafes' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.area}, Darjeeling, West Bengal</InfoRow>
                <InfoRow icon={<img src="/time.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>Open · {item.hours}</InfoRow>
                <InfoRow icon={<img src="/menu.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.specialty} · {item.priceRange}</InfoRow>
                <InfoRow icon={<img src="/established.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>Established {item.established}</InfoRow>
                {item.blurb && <InfoRow icon={<img src="/tags.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.blurb}</InfoRow>}
              </>
            )}
            {type === 'attractions' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.distance}</InfoRow>
                {item.blurb && <InfoRow icon={<img src="/tags.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.blurb}</InfoRow>}
                {item.tip && <InfoRow icon={<img src="/tips.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.tip}</InfoRow>}
              </>
            )}
            {type === 'offbeat' && (
              <>
                <InfoRow icon={<img src="/location.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.distance} from Darjeeling · {item.time} drive</InfoRow>
                {item.description && <InfoRow icon={<img src="/tags.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>{item.description}</InfoRow>}
                {item.tags?.length > 0 && (
                  <InfoRow icon={<img src="/tags.svg" className="w-7 h-7 object-contain shrink-0 mt-0.5" alt="" />}>
                    {item.tags.map((t: string) => `#${t}`).join('  ')}
                  </InfoRow>
                )}
              </>
            )}
          </div>

          {/* Map */}
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-body-text mb-3">
              {type === 'routes' ? 'Route map' : 'Location'}
            </p>
            <div className="relative z-0 h-64 rounded-2xl overflow-hidden border border-canvas-softer">
              {type === 'routes' ? (
                <RouteMap route={item} />
              ) : (
                <PointMap key={geoKey} coords={coords} name={title} />
              )}
            </div>
          </div>
        </div>

        {/* Footer action */}
        {BOOKABLE.includes(type) && (
          <div className="shrink-0 border-t border-canvas-softer p-4 bg-canvas">
            <button
              onClick={onBook}
              className="w-full py-3 rounded-xl bg-primary text-canvas font-bold text-sm hover:bg-primary-dark transition-colors"
            >
              {type === 'stays' ? 'Book this stay' : type === 'drivers' ? 'Hire this driver' : 'Book this route'}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
