import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ParallaxShell, ParallaxHero, SectionPanel, PanelHeader } from '../components/parallax';
import { cafes } from '../data/cafes';
import { attractions } from '../data/attractions';
import { findOffbeatBySlug } from '../data/offbeat';
import { getPlaceCoords } from '../data/placeGeo';

export type PlaceType = 'cafes' | 'attractions' | 'offbeat';

// ==========================================
// Type-specific presentation config
// ==========================================
const TYPE_META: Record<PlaceType, { label: string; badgeIcon: string; crumb: string; aboutEyebrow: string }> = {
  cafes: { label: 'Cafe & Restaurant', badgeIcon: '/menu.svg', crumb: 'Cafes', aboutEyebrow: 'The Place' },
  attractions: { label: 'Experience', badgeIcon: '/tags.svg', crumb: 'Experiences', aboutEyebrow: 'The Experience' },
  offbeat: { label: 'Offbeat Escape', badgeIcon: '/location.svg', crumb: 'Offbeat Places', aboutEyebrow: 'The Escape' },
};

// ==========================================
// Shared content blocks (built on the parallax primitives)
// ==========================================
function FactsPanel({
  eyebrow,
  title,
  iconSrc,
  bg,
  facts,
}: {
  eyebrow: string;
  title: string;
  iconSrc: string;
  bg: string;
  facts: { label: string; value: ReactNode }[];
}) {
  return (
    <SectionPanel bg={bg}>
      <PanelHeader eyebrow={eyebrow} title={title} iconSrc={iconSrc} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facts.map((f) => (
          <div key={f.label} className="p-5 bg-white border border-canvas-softer rounded-2xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-mute mb-1">{f.label}</p>
            <p className="text-base font-semibold text-ink">{f.value}</p>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}

function HighlightsPanel({
  eyebrow,
  title,
  iconSrc,
  bg,
  items,
}: {
  eyebrow: string;
  title: string;
  iconSrc: string;
  bg: string;
  items: string[];
}) {
  return (
    <SectionPanel bg={bg}>
      <PanelHeader eyebrow={eyebrow} title={title} iconSrc={iconSrc} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-3 p-4 bg-white border border-canvas-softer rounded-2xl hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="text-sm font-medium text-ink">{item}</span>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}

function PlaceMap({ coordsKey, title }: { coordsKey: string; title: string }) {
  const coords = getPlaceCoords(coordsKey);
  return (
    <div className="h-[45vh] min-h-[320px] rounded-3xl overflow-hidden border border-canvas-softer shadow-inner relative z-10">
      <MapContainer center={coords} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <CircleMarker
          center={coords}
          radius={9}
          pathOptions={{ color: '#fff', weight: 3, fillColor: '#EA4335', fillOpacity: 1 }}
        >
          <Tooltip permanent direction="top" offset={[0, -9]}>
            {title}
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

// ==========================================
// Main component
// ==========================================
export default function PlaceDetailPage({ type }: { type: PlaceType }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer the item handed over via navigation state (covers dynamic items);
  // fall back to a static lookup by id / slug for direct URL access.
  const stateItem = (location.state as any)?.item;
  let item = stateItem;
  if (!item) {
    if (type === 'cafes') item = cafes.find((c) => c.id === id);
    else if (type === 'attractions') item = attractions.find((a) => a.id === id);
    else if (type === 'offbeat') item = id ? findOffbeatBySlug(id) : undefined;
  }

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-canvas text-ink">
        <Navbar activeTab={type} searchQuery="" onSearchChange={() => {}} variant="solid" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-6xl mb-4">🏔️</span>
          <h2 className="text-2xl font-extrabold mb-2 font-display">Not found</h2>
          <p className="text-body-text max-w-md mb-6">
            This place could not be loaded. Please head back and open it from the list again.
          </p>
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

  const meta = TYPE_META[type];
  const title: string = item.name;
  const about: string = item.blurb || item.description || '';
  const coordsKey: string = type === 'offbeat' ? item.name : item.id;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${getPlaceCoords(coordsKey).join(',')}`;

  // ---- Hero facts (badge, rating, location) ----
  const heroFacts = [] as { icon?: string; text: ReactNode; strong?: boolean }[];
  if (typeof item.rating === 'number') {
    heroFacts.push({
      text: (
        <>
          <span className="text-amber-400">★</span> {item.rating.toFixed(1)}
          {item.reviews ? <span className="text-white/70"> ({item.reviews})</span> : null}
        </>
      ),
      strong: true,
    });
  }
  if (type === 'cafes') heroFacts.push({ icon: '/location.svg', text: `${item.area}, Darjeeling` });
  if (type === 'attractions') heroFacts.push({ icon: '/location.svg', text: item.distance });
  if (type === 'offbeat') heroFacts.push({ icon: '/location.svg', text: `${item.distance} · ${item.time} drive` });

  // ---- About side facts ----
  const aboutFacts: { label: string; value: string }[] = [];
  if (type === 'cafes') {
    aboutFacts.push({ label: 'Neighbourhood', value: item.area });
    if (item.established) aboutFacts.push({ label: 'Established', value: item.established });
    if (item.specialty) aboutFacts.push({ label: 'Known for', value: item.specialty });
  } else if (type === 'attractions') {
    aboutFacts.push({ label: 'Category', value: item.category });
    aboutFacts.push({ label: 'Distance', value: item.distance });
  } else {
    if (item.altitude) aboutFacts.push({ label: 'Altitude', value: item.altitude });
    if (item.bestTime) aboutFacts.push({ label: 'Best time', value: item.bestTime });
    aboutFacts.push({ label: 'Distance', value: `${item.distance} (${item.time})` });
  }

  // ---- "Good to know" facts panel ----
  const infoFacts: { label: string; value: ReactNode }[] = [];
  if (type === 'cafes') {
    infoFacts.push({ label: 'Hours', value: item.hours });
    infoFacts.push({ label: 'Price', value: item.priceRange });
    infoFacts.push({ label: 'Speciality', value: item.specialty });
    if (item.established) infoFacts.push({ label: 'Established', value: item.established });
  } else if (type === 'offbeat') {
    if (item.altitude) infoFacts.push({ label: 'Altitude', value: item.altitude });
    if (item.bestTime) infoFacts.push({ label: 'Best time to visit', value: item.bestTime });
    infoFacts.push({ label: 'Distance', value: item.distance });
    infoFacts.push({ label: 'Drive time', value: item.time });
  }

  // Alternating section backgrounds
  let panelIndex = 0;
  const nextBg = () => (panelIndex++ % 2 === 0 ? 'bg-canvas' : 'bg-canvas-soft');

  const hero = (
    <ParallaxHero
      image={item.photo}
      badge={{ icon: meta.badgeIcon, label: type === 'attractions' ? item.category : meta.label }}
      crumbs={[{ label: 'Home', to: '/' }, { label: meta.crumb, to: '/' }, { label: title }]}
      title={title}
      facts={heroFacts}
    />
  );

  return (
    <ParallaxShell activeTab={type} hero={hero}>
      {/* ABOUT */}
      <SectionPanel bg={nextBg()}>
        <PanelHeader eyebrow={meta.aboutEyebrow} title="About" iconSrc="/rooms.svg" />
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2 space-y-6">
            <p className="text-base md:text-lg text-body-text leading-relaxed">{about}</p>
          </div>
          {aboutFacts.length > 0 && (
            <div className="space-y-4 md:border-l md:border-canvas-softer md:pl-8">
              {aboutFacts.map((f) => (
                <div key={f.label}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-mute">{f.label}</p>
                  <p className="text-base font-semibold text-ink">{f.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionPanel>

      {/* HIGHLIGHTS — activities (offbeat) or tags */}
      {type === 'offbeat' && Array.isArray(item.activities) && item.activities.length > 0 && (
        <HighlightsPanel
          eyebrow="Things to do"
          title="Things to do"
          iconSrc="/tags.svg"
          bg={nextBg()}
          items={item.activities}
        />
      )}

      {/* INSIDER TIP (attractions) */}
      {type === 'attractions' && item.tip && (
        <SectionPanel bg={nextBg()}>
          <PanelHeader eyebrow="Insider tip" title="Make the most of it" iconSrc="/tip.svg" />
          <div className="p-8 bg-white border border-canvas-softer rounded-3xl shadow-sm max-w-3xl flex items-start gap-4">
            <span className="text-3xl shrink-0">💡</span>
            <p className="text-base md:text-lg text-body-text leading-relaxed">{item.tip}</p>
          </div>
        </SectionPanel>
      )}

      {/* GOOD TO KNOW facts */}
      {infoFacts.length > 0 && (
        <FactsPanel eyebrow="Good to know" title="Good to know" iconSrc="/established.svg" bg={nextBg()} facts={infoFacts} />
      )}

      {/* TAGS (offbeat) */}
      {type === 'offbeat' && Array.isArray(item.tags) && item.tags.length > 0 && (
        <SectionPanel bg={nextBg()}>
          <PanelHeader eyebrow="The vibe" title="What defines it" iconSrc="/tags.svg" />
          <div className="flex flex-wrap gap-3">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-sm font-semibold text-primary bg-primary/5 border border-primary/10 px-4 py-2 rounded-full"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </SectionPanel>
      )}

      {/* LOCATION MAP */}
      <SectionPanel bg={nextBg()}>
        <PanelHeader eyebrow="Location" title="Where you'll be" iconSrc="/location.svg" />
        <p className="text-sm md:text-base text-body-text font-medium mb-5">
          {type === 'cafes' ? `${item.area}, ` : ''}Darjeeling, West Bengal, India
          {type !== 'cafes' ? ` · ${item.distance} from town` : ''}
        </p>
        <PlaceMap coordsKey={coordsKey} title={title} />
      </SectionPanel>

      {/* CTA — plan your visit */}
      <SectionPanel bg="bg-ink" dark>
        <div className="max-w-2xl">
          <PanelHeader eyebrow="Plan your visit" title="Ready to go?" iconSrc="/route.svg" dark />
          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-xl">
            {type === 'cafes'
              ? `Drop by ${title} on your Darjeeling trip. Open your maps for turn-by-turn directions, or line up a local driver to take you there.`
              : `Add ${title} to your Darjeeling itinerary. Get directions, or arrange a trusted local driver for the trip.`}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-primary text-canvas font-bold text-sm rounded-2xl shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
            >
              Get directions
            </a>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3.5 bg-white/10 border border-white/20 text-white font-bold text-sm rounded-2xl hover:bg-white/20 transition-all"
            >
              Find a driver
            </button>
          </div>
        </div>
      </SectionPanel>
    </ParallaxShell>
  );
}
