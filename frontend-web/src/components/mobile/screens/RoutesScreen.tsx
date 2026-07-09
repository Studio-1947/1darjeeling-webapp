import { useState } from 'react';

interface RouteStop {
  stop: string;
  time?: string;
  description: string;
}

interface Itinerary {
  id: string;
  title: string;
  type: 'Day Trip' | 'Multi-Day' | 'Trek';
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  overview: string;
  statsText: string;
  price: string;
  bestSeason: string;
  localTips: string;
  stops: RouteStop[];
}

const itineraries: Itinerary[] = [
  {
    id: 'day-highlights',
    title: '1-Day Darjeeling Highlights',
    type: 'Day Trip',
    duration: '1 Day',
    difficulty: 'Easy',
    overview: 'Sunrise, monasteries, zoo & Chowrasta in one perfect day.',
    statsText: '25 km round trip',
    price: '₹1,500–₹2,000 (driver hire)',
    bestSeason: 'Year-round (Best Oct-Nov & Mar-Apr)',
    localTips: 'Start at 3:30am to beat the crowd at Tiger Hill. Hire a shared jeep from the taxi stand (₹300/seat) or a private driver for the full day (₹1,500–₹2,000). Carry a warm jacket — Tiger Hill is freezing before dawn.',
    stops: [
      { stop: 'Tiger Hill', time: '4:00 AM', description: 'Sunrise view of Kanchenjunga — arrive before 4am.' },
      { stop: 'Ghoom Monastery', time: '6:30 AM', description: '200-year-old Tibetan Buddhist gompa with a 15-ft Maitreya statue.' },
      { stop: 'Batasia Loop', time: '8:00 AM', description: 'Spiral garden with war memorial — iconic toy train photo spot.' },
      { stop: 'Darjeeling Zoo & HMI', time: '10:00 AM', description: 'Red pandas, snow leopards + Tenzing Norgay museum.' },
      { stop: 'Chowrasta Mall Road', time: '3:00 PM', description: 'Evening stroll, local shops, weavers and street food.' },
      { stop: 'Glenary\'s Bakery', time: '7:00 PM', description: 'End the day with pastries and Darjeeling first flush tea.' },
    ]
  },
  {
    id: 'mirik-trip',
    title: '2-Day Darjeeling & Surroundings',
    type: 'Day Trip',
    duration: '2 Days',
    difficulty: 'Easy',
    overview: 'Tea gardens, Mirik Lake, and the real hillside life.',
    statsText: '~120 km total',
    price: '₹3,500–₹4,500 (driver + accommodation)',
    bestSeason: 'Sep - Jun',
    localTips: 'Perfect for families. Enjoy boating at Sumendu Lake in Mirik and take tea garden pictures along the way.',
    stops: [
      { stop: 'Chowrasta & Happy Valley', time: 'Day 1', description: 'Explore the heart of Darjeeling town and tour the tea factory.' },
      { stop: 'Mirik Lake Day Trip', time: 'Day 2', description: 'Scenic drive to Mirik through Sukhiapokhri pine forests & orange orchards.' },
    ]
  },
  {
    id: 'multi-circuit',
    title: '5-Day Complete Darjeeling Circuit',
    type: 'Multi-Day',
    duration: '5 Days',
    difficulty: 'Moderate',
    overview: 'The full hill experience — tea, mountains, Kalimpong, and trekking foothills.',
    statsText: '~250 km total',
    price: '₹12,000–₹16,000 (full transport)',
    bestSeason: 'Oct - May',
    localTips: 'Combine with local homestays in Kalimpong for an immersive cultural experience.',
    stops: [
      { stop: 'Arrive & check-in', time: 'Day 1', description: 'Travel from NJP to Darjeeling, evening Mall Road walk.' },
      { stop: 'Tiger Hill & Sightseeing', time: 'Day 2', description: 'Classic dawn sightseeing and local Tibetan monasteries.' },
      { stop: 'Drive to Kalimpong', time: 'Day 3', description: 'Travel via Teesta valley, explore nurseries & markets.' },
      { stop: 'Explore Kurseong', time: 'Day 4', description: 'Scenic drive to Kurseong, tea estate walks.' },
      { stop: 'Return to plains', time: 'Day 5', description: 'Departure towards NJP/Bagdogra.' },
    ]
  },
  {
    id: 'tea-route',
    title: 'Mirik & Kurseong Tea Route',
    type: 'Multi-Day',
    duration: '3 Days',
    difficulty: 'Easy',
    overview: 'The most scenic slow-drive in the Darjeeling hills.',
    statsText: '~90 km total',
    price: '₹5,000–₹7,000',
    bestSeason: 'Year-round',
    localTips: 'Enjoy fresh organic tea from the estates and explore colonial manager bungalows.',
    stops: [
      { stop: 'Kurseong Tea Gardens', time: 'Day 1', description: 'Walk through Makaibari or Castleton tea gardens.' },
      { stop: 'Scenic Ride to Mirik', time: 'Day 2', description: 'Orange orchards and riverside walks in Tabakoshi.' },
      { stop: 'Mirik Lake & Return', time: 'Day 3', description: 'Boating, local organic farm lunch, return to town.' },
    ]
  },
  {
    id: 'singalila-trek',
    title: 'Singalila Ridge Trek',
    type: 'Trek',
    duration: '4-6 Days',
    difficulty: 'Challenging',
    overview: 'A Himalayan ridge walk above the clouds — Everest, Lhotse, Makalu, Kanchenjunga.',
    statsText: '~86 km trek',
    price: '₹8,000–₹12,000 (guide + permits + lodges)',
    bestSeason: 'Oct - Dec, Mar - May',
    localTips: 'Hire an official guide at Manebhanjan. Land Rovers are available for backup or luggage transport.',
    stops: [
      { stop: 'Manebhanjan to Tumling', time: 'Day 1', description: 'Steep climb through pine woods.' },
      { stop: 'Tumling to Kalipokhri', time: 'Day 2', description: 'Walk along the border ridge, see the sacred black lake.' },
      { stop: 'Kalipokhri to Sandakphu', time: 'Day 3', description: 'Final steep climb to West Bengal\'s highest peak.' },
      { stop: 'Sandakphu to Phalut', time: 'Day 4', description: 'Scenic ridge walk with close views of Everest and Kanchenjunga.' },
      { stop: 'Phalut to Rimbik', time: 'Day 5', description: 'Long descent through dense bamboo and rhododendron forests.' },
    ]
  }
];

export default function RoutesScreen({ onSwitchTab }: { onSwitchTab?: (tab: string) => void }) {
  const [filter, setFilter] = useState<'All' | 'Day Trip' | 'Multi-Day' | 'Trek'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('day-highlights');

  const filteredItineraries = itineraries.filter(i => {
    if (filter === 'All') return true;
    return i.type === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-6 text-white">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-white/15 text-[10.5px] font-semibold text-amber-200 mb-3">
              🗺️ Travel Routes
            </span>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2">
              Darjeeling Itineraries
            </h1>
            <p className="text-[12.5px] leading-relaxed text-white/80">
              Whether you have a single day or a full week — curated routes for every type of traveller, built by locals who know every bend.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="px-4 mt-4">
        <div className="relative overflow-hidden rounded-2xl h-24 flex items-center justify-between px-6 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://nomadicweekends.com/blog/wp-content/uploads/2019/03/Kalimpong-1024x412.jpg')" }}>
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block mb-0.5">5 Curated Routes</span>
            <h4 className="text-[15px] font-extrabold">From sunrise to summit</h4>
          </div>
          <span className="relative z-10 text-xl font-bold bg-white/20 p-2 rounded-full">✨</span>
        </div>
      </div>

      {/* Filter pills */}
      <div className="px-4 mt-5 flex gap-2 overflow-x-auto hide-scrollbar">
        {(['All', 'Day Trip', 'Multi-Day', 'Trek'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setExpandedId(null);
            }}
            className={`h-8 px-4 rounded-full text-[12px] font-semibold border transition-all cursor-pointer ${
              filter === tab
                ? 'bg-ink text-canvas border-ink shadow-sm'
                : 'bg-canvas-soft border-hairline text-body-text hover:bg-canvas'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Itinerary List */}
      <div className="px-4 mt-4 space-y-4">
        {filteredItineraries.map((itinerary) => {
          const isExpanded = expandedId === itinerary.id;
          return (
            <div
              key={itinerary.id}
              className="rounded-3xl border border-hairline bg-white shadow-xs overflow-hidden"
            >
              {/* Header card button */}
              <button
                onClick={() => toggleExpand(itinerary.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-bold uppercase px-2 py-0.5 rounded">
                      {itinerary.type}
                    </span>
                    <span className="text-[10.5px] text-body-text font-medium">
                      ⏱️ {itinerary.duration} · {itinerary.difficulty}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-extrabold text-ink leading-snug truncate">
                    {itinerary.title}
                  </h3>
                  <p className="text-[12px] text-body-text font-normal line-clamp-2">
                    {itinerary.overview}
                  </p>
                </div>
                <span className={`text-xl transition-transform duration-300 mt-2 shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Collapsible Timeline Content */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-hairline pt-4 space-y-5 animate-scale-up">
                  {/* Stats & season */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-canvas-soft rounded-2xl border border-hairline text-[11.5px] text-body-text">
                    <div>
                      <strong>Distance:</strong> {itinerary.statsText}
                    </div>
                    <div>
                      <strong>Est. Price:</strong> {itinerary.price}
                    </div>
                  </div>

                  <div className="text-[12px] text-body-text">
                    <strong>Best season:</strong> {itinerary.bestSeason}
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 border-l border-dashed border-emerald-600/40 ml-2.5 space-y-6">
                    {itinerary.stops.map((stop, index) => (
                      <div key={index} className="relative">
                        {/* Timeline circle icon */}
                        <span className="absolute left-[-32px] top-0 h-4.5 w-4.5 rounded-full bg-emerald-700 text-[10px] text-white flex items-center justify-center font-bold border border-white">
                          {index + 1}
                        </span>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className="text-[13.5px] font-extrabold text-ink">{stop.stop}</h4>
                            {stop.time && (
                              <span className="text-[10px] bg-canvas-soft border border-hairline text-mute font-bold px-1.5 py-0.5 rounded">
                                {stop.time}
                              </span>
                            )}
                          </div>
                          <p className="text-[11.5px] text-body-text mt-0.5 leading-relaxed font-normal">
                            {stop.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Local tips */}
                  <div className="p-4 bg-amber-50/70 border border-amber-100 rounded-2xl text-[11.5px] text-amber-950 leading-relaxed space-y-1">
                    <strong className="font-extrabold text-amber-950 block">💡 LOCAL TIPS</strong>
                    <p>{itinerary.localTips}</p>
                  </div>

                  {/* Primary CTA */}
                  <button
                    onClick={() => onSwitchTab?.('drivers')}
                    className="w-full py-3 bg-emerald-950 text-white font-bold text-[12.5px] rounded-2xl shadow hover:bg-emerald-900 active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🚗 Find a driver for this route</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Directory Promo */}
      <div className="px-4 mt-6">
        <div className="bg-canvas-soft border border-hairline rounded-3xl p-5 text-center space-y-3.5 shadow-xs">
          <span className="text-3xl block">🚗</span>
          <div>
            <h4 className="text-[15px] font-bold text-ink">Need a driver for your route?</h4>
            <p className="text-[11.5px] text-body-text mt-1 max-w-xs mx-auto">
              Browse verified local drivers with Toyota Innovas, Land Rovers, or SUVs starting at ₹1,500/day.
            </p>
          </div>
          <button
            onClick={() => onSwitchTab?.('drivers')}
            className="px-5 py-2.5 bg-ink text-white font-bold text-[12px] rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
          >
            View Driver Directory
          </button>
        </div>
      </div>
    </div>
  );
}
