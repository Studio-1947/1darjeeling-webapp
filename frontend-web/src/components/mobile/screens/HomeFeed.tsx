import { useMemo, useState } from 'react';
import { stays } from '../../../data/stays';
import { cafes } from '../../../data/cafes';
import { attractions } from '../../../data/attractions';
import { drivers } from '../../../data/drivers';

interface Listing {
  id: string;
  title: string;
  kind: string;
  image: string;
  badge?: string;
  rating: number;
  tags: string[];
  price: string;
  priceUnit: string;
}

interface HomeFeedProps {
  search: string;
  onSearchChange: (q: string) => void;
  onOpen: (id: string) => void;
}

const stats = [
  { value: '200+', label: 'Homestays' },
  { value: '50+', label: 'Drivers' },
  { value: '30+', label: 'Guides' },
  { value: '100%', label: 'Verified' },
];

const chips = [
  { label: 'Attractions', image: attractions[0]?.photo },
  { label: 'Homestays', image: stays[0]?.photo },
  { label: 'Cafes', image: cafes[0]?.photo },
  { label: 'Drivers', image: drivers[0]?.photo },
  { label: 'Routes', image: attractions[1]?.photo },
];

function buildFeed(): Listing[] {
  const staySlice: Listing[] = stays.slice(0, 4).map((s, i) => ({
    id: `stay-${s.id}`,
    title: s.name,
    kind: s.type,
    image: s.photo,
    badge: i === 0 ? 'Top Pick' : s.type === 'Heritage hotel' ? 'Heritage' : undefined,
    rating: 4.6 + (i % 4) * 0.1,
    tags: [s.area],
    price: s.priceRange.split(' ')[0],
    priceUnit: '/ night',
  }));

  const cafeSlice: Listing[] = cafes.slice(0, 2).map((c) => ({
    id: `cafe-${c.id}`,
    title: c.name,
    kind: 'Cafe',
    image: c.photo,
    badge: Number(c.established) < 1950 ? 'Heritage' : undefined,
    rating: c.rating,
    tags: [c.area],
    price: c.priceRange.split(' ')[0],
    priceUnit: 'for two',
  }));

  const attrSlice: Listing[] = attractions.slice(0, 2).map((a) => ({
    id: `attr-${a.id}`,
    title: a.name,
    kind: a.category,
    image: a.photo,
    badge: 'Must See',
    rating: 4.7,
    tags: [a.distance],
    price: 'Free',
    priceUnit: 'entry',
  }));

  const driverSlice: Listing[] = drivers.slice(0, 2).map((d, i) => ({
    id: `driver-${d.id}`,
    title: d.name,
    kind: 'Local Driver',
    image: d.photo,
    badge: i === 0 ? 'Expert Pick' : undefined,
    rating: d.rating,
    tags: [`${d.experienceYears} yrs exp`, d.languages[0]],
    price: '₹2,000',
    priceUnit: '/ day',
  }));

  // Interleave for a mixed, curated-looking feed.
  const merged: Listing[] = [];
  const pools = [staySlice, driverSlice, attrSlice, cafeSlice];
  let added = true;
  let idx = 0;
  while (added) {
    added = false;
    for (const pool of pools) {
      if (pool[idx]) {
        merged.push(pool[idx]);
        added = true;
      }
    }
    idx++;
  }
  return merged;
}

export default function HomeFeed({ search, onSearchChange, onOpen }: HomeFeedProps) {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const feed = useMemo(() => buildFeed(), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return feed;
    return feed.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.kind.toLowerCase().includes(q) ||
        l.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [feed, search]);

  return (
    <div className="pb-4">
      {/* Hero */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={attractions[0]?.photo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-950/75 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-5 text-white">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-300/90 uppercase mb-2">
              Darjeeling &amp; the Eastern Himalayas
            </p>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2.5">
              Discover the Hills,
              <br />
              live like a local.
            </h1>
            <p className="text-[12.5px] leading-relaxed text-white/80 mb-4">
              Homestays, guides, drivers, food &amp; nature — all in one place, curated by locals.
            </p>
            <div className="flex items-center gap-2 bg-white rounded-full p-1 pl-4 shadow-lg">
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Where to? Homestays, drivers…"
                className="flex-1 min-w-0 bg-transparent text-[13px] text-ink placeholder:text-mute outline-none"
              />
              <button className="shrink-0 h-9 px-4 rounded-full bg-emerald-700 text-white text-[13px] font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mt-3">
        <div className="grid grid-cols-4 rounded-2xl border border-hairline bg-canvas-soft divide-x divide-hairline">
          {stats.map((s) => (
            <div key={s.label} className="py-3 text-center">
              <div className="text-[15px] font-extrabold text-ink leading-none">{s.value}</div>
              <div className="text-[10px] text-body-text mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-4 flex gap-3 px-4 overflow-x-auto hide-scrollbar">
        {chips.map((c) => (
          <button key={c.label} className="shrink-0 flex flex-col items-center gap-1.5 w-[62px]">
            <span className="w-[62px] h-[62px] rounded-2xl overflow-hidden border border-hairline bg-canvas-soft">
              {c.image && <img src={c.image} alt="" className="w-full h-full object-cover" />}
            </span>
            <span className="text-[11px] font-medium text-body-text">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Banners */}
      <div className="px-4 mt-4 space-y-2.5">
        <button className="w-full flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left">
          <span className="text-lg">🧭</span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold text-emerald-900">New to Darjeeling?</span>
            <span className="block text-[11.5px] text-emerald-700/80">Personalize your stay</span>
          </span>
          <span className="text-emerald-700">→</span>
        </button>
        <button className="w-full flex items-center gap-3 rounded-2xl border border-hairline bg-canvas-soft px-4 py-3 text-left">
          <span className="text-lg">🤝</span>
          <span className="flex-1">
            <span className="block text-[13px] font-semibold text-ink">Local provider</span>
            <span className="block text-[11.5px] text-body-text">List your service</span>
          </span>
          <span className="text-body-text">→</span>
        </button>
      </div>

      {/* Filter row */}
      <div className="px-4 mt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-8 px-3.5 rounded-full bg-ink text-white text-[12px] font-semibold flex items-center">All</span>
          <span className="text-[12px] text-body-text">{filtered.length} listings</span>
        </div>
        <button className="h-8 px-3 rounded-full border border-hairline text-[12px] font-semibold text-ink flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M6 12h12M10 18h4" />
          </svg>
          Filters
        </button>
      </div>

      {/* Listings */}
      <div className="px-4 mt-3 space-y-4">
        {filtered.map((l) => (
          <button
            key={l.id}
            onClick={() => onOpen(l.id)}
            className="block w-full text-left rounded-2xl border border-hairline bg-white overflow-hidden active:scale-[0.99] transition-transform"
          >
            <div className="relative h-44 w-full">
              <img src={l.image} alt="" className="w-full h-full object-cover" />
              {l.badge && (
                <span className="absolute top-3 left-3 h-6 px-2.5 rounded-full bg-white/95 text-[10.5px] font-bold text-ink flex items-center shadow-sm">
                  {l.badge}
                </span>
              )}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSaved((prev) => ({ ...prev, [l.id]: !prev[l.id] }));
                }}
                className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill={saved[l.id] ? '#e11d48' : 'none'}
                  strokeWidth={1.8}
                  stroke={saved[l.id] ? '#e11d48' : '#374151'}
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </span>
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">{l.kind}</span>
                <span className="flex items-center gap-1 text-[12px] font-semibold text-ink">
                  <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-3.5 h-3.5">
                    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
                  </svg>
                  {l.rating.toFixed(1)}
                </span>
              </div>
              <h3 className="text-[15px] font-bold text-ink mt-1 leading-snug">{l.title}</h3>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {l.tags.filter(Boolean).map((t) => (
                  <span key={t} className="h-6 px-2 rounded-md bg-canvas-soft border border-hairline text-[10.5px] text-body-text flex items-center">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline">
                <span className="text-[13px] text-ink">
                  <span className="font-extrabold">{l.price}</span>{' '}
                  <span className="text-body-text text-[11.5px]">{l.priceUnit}</span>
                </span>
                <span className="text-[12.5px] font-semibold text-emerald-700 flex items-center gap-1">
                  View
                  <span>→</span>
                </span>
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-3xl mb-2">🔎</div>
            <p className="text-[13px] text-body-text">No listings match “{search}”.</p>
          </div>
        )}
      </div>
    </div>
  );
}
