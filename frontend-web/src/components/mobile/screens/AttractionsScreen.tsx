import { useState, useMemo } from 'react';
import { attractions } from '../../../data/attractions';

interface Season {
  id: string;
  name: string;
  months: string;
  description: string;
  icon: string;
}

const seasons: Season[] = [
  {
    id: 'spring',
    name: 'Spring',
    months: 'Mar - May',
    description: 'Rhododendrons in bloom',
    icon: '🌸',
  },
  {
    id: 'summer',
    name: 'Summer',
    months: 'Jun - Sep',
    description: 'Lush green valleys',
    icon: '🌿',
  },
  {
    id: 'autumn',
    name: 'Autumn',
    months: 'Oct - Nov',
    description: 'Clear mountain peaks',
    icon: '🍁',
  },
  {
    id: 'winter',
    name: 'Winter',
    months: 'Dec - Feb',
    description: 'Misty valley charm',
    icon: '❄️',
  },
];

export default function AttractionsScreen() {
  const [selectedSeason, setSelectedSeason] = useState<string>('autumn');

  // Filter attractions dynamically based on category/season relevance
  const filteredAttractions = useMemo(() => {
    // If selected is autumn, show top sights like tiger-hill, batasia-loop, ghoom-monastery, sandakphu
    if (selectedSeason === 'autumn') {
      return attractions.filter(a => ['tiger-hill', 'batasia-loop', 'ghoom-monastery', 'sandakphu'].includes(a.id));
    }
    // If spring, show happy-valley, zoo, peace-pagoda, sandakphu
    if (selectedSeason === 'spring') {
      return attractions.filter(a => ['happy-valley', 'zoo', 'peace-pagoda', 'sandakphu'].includes(a.id));
    }
    // If summer, show rock-garden, dhr, peace-pagoda
    if (selectedSeason === 'summer') {
      return attractions.filter(a => ['rock-garden', 'dhr', 'peace-pagoda'].includes(a.id));
    }
    // If winter, show tiger-hill, dhr, ghoom-monastery, batasia-loop
    return attractions.filter(a => ['tiger-hill', 'dhr', 'ghoom-monastery', 'batasia-loop'].includes(a.id));
  }, [selectedSeason]);

  return (
    <div className="pb-8">
      {/* Hero Banner */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={attractions[5]?.photo || attractions[0]?.photo}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-6 text-white">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-white/15 text-[10.5px] font-semibold text-amber-200 mb-3">
              🌤️ Seasonal Attractions
            </span>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2">
              Darjeeling Through the Seasons
            </h1>
            <p className="text-[12.5px] leading-relaxed text-white/80">
              Each season reveals a different face of Darjeeling — from rhododendron carpets to snow-dusted lanes.
            </p>
          </div>
        </div>
      </div>

      {/* Seasons Grid (2x2) */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-3">
          {seasons.map((s) => {
            const isActive = selectedSeason === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSeason(s.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-hairline bg-canvas-soft hover:bg-canvas'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{s.icon}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 absolute top-4 right-4" />
                  )}
                </div>
                <h3 className="text-[14px] font-bold text-ink mt-2">{s.name}</h3>
                <p className="text-[11px] font-semibold text-body-text">{s.months}</p>
                <p className="text-[10px] text-mute mt-1.5 leading-snug">{s.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter label */}
      <div className="px-4 mt-6 flex items-center justify-between">
        <span className="text-[12px] font-bold text-ink uppercase tracking-wider">
          Featured: {seasons.find((s) => s.id === selectedSeason)?.name}
        </span>
        <span className="text-[11.5px] text-body-text">
          {filteredAttractions.length} spots
        </span>
      </div>

      {/* Attraction Listing Cards */}
      <div className="px-4 mt-3 space-y-5">
        {filteredAttractions.map((a) => (
          <div
            key={a.id}
            className="block w-full text-left rounded-3xl border border-hairline bg-white overflow-hidden shadow-sm"
          >
            {/* Image */}
            <div className="relative h-44 w-full bg-canvas-soft">
              <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 h-6 px-2.5 rounded-full bg-white/95 text-[10.5px] font-bold text-ink flex items-center shadow-sm">
                {a.category}
              </span>
              <span className="absolute bottom-3 left-3 h-6 px-2.5 rounded-full bg-white/95 text-[10.5px] font-semibold text-body-text flex items-center shadow-sm">
                📍 {a.distance}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <h3 className="text-[16px] font-bold text-ink leading-snug">{a.name}</h3>
              <p className="text-[12px] text-body-text leading-relaxed font-normal">
                {a.blurb}
              </p>

              {/* Local Tip Box */}
              {a.tip && (
                <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-2xl text-[11.5px] text-amber-900 leading-relaxed">
                  <strong className="font-bold text-amber-950 block mb-0.5">💡 Local Tip</strong>
                  {a.tip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Season Banner */}
      <div className="px-4 mt-6">
        <div className="bg-emerald-950 text-white rounded-3xl p-5 relative overflow-hidden shadow-md">
          <div className="absolute right-[-10px] bottom-[-20px] text-8xl opacity-10 pointer-events-none">🏔️</div>
          <span className="text-[9.5px] font-bold text-amber-300 uppercase tracking-widest block mb-1">Recommended Season</span>
          <h3 className="text-[17px] font-bold text-white leading-snug">October – December</h3>
          <p className="text-[11.5px] text-white/80 mt-1.5 leading-relaxed">
            The post-monsoon months offer the clearest skies of the year. Peak views of Kanchenjunga are highly visible, with crisp, refreshing autumn hill winds.
          </p>
        </div>
      </div>
    </div>
  );
}
