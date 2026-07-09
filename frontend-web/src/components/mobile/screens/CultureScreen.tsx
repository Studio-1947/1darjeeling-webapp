import { communities, festivals, cuisineNotes } from '../../../data/culture';

export default function CultureScreen() {
  const landmarks = [
    {
      name: "Glenary's Bakery & Pub",
      description: 'A landmark colonial bakery serving legendary pastries, meat pies, and Darjeeling tea with mountain views.',
      order: 'Apple Pie, Cinnamon Buns, & Hot Chocolate',
      emoji: '🍰'
    },
    {
      name: 'Kunga Restaurant',
      description: 'Cozy family-run eatery famous for authentic Tibetan food, handmade noodles, and steamed momo plates.',
      order: 'Chicken Steamed Momos & Gyathuk soup',
      emoji: '🥟'
    },
    {
      name: 'Keventer\'s',
      description: 'Established in 1911, this rooftop joint is legendary for classic English breakfast platters and milkshakes.',
      order: 'Pork Sausage platter, Fried Eggs, & Shakes',
      emoji: '🍳'
    }
  ];

  return (
    <div className="pb-8">
      {/* Hero Banner */}
      <div className="px-4 pt-4">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-emerald-950/90" />
          <div className="relative px-5 pt-6 pb-6 text-white">
            <span className="inline-flex items-center h-6 px-3 rounded-full bg-white/15 text-[10.5px] font-semibold text-amber-200 mb-3">
              🎻 Folk Culture &amp; Traditions
            </span>
            <h1 className="text-[26px] leading-[1.15] font-extrabold text-white mb-2">
              The Soul of Darjeeling
            </h1>
            <p className="text-[12.5px] leading-relaxed text-white/80">
              A beautiful mosaic of Nepalese/Gorkha, Lepcha, Tibetan, and Bhutia heritages in the high Himalayas.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Cultural Communities */}
      <div className="mt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider">
            Ethnic Communities
          </h2>
        </div>
        <div className="flex gap-4 px-4 overflow-x-auto hide-scrollbar">
          {communities.map((c) => {
            const emojis: Record<string, string> = {
              gorkha: '🏔️',
              lepcha: '🏹',
              bhutia: '🏮',
              tibetan: '🧵'
            };
            return (
              <div
                key={c.id}
                className="shrink-0 w-64 p-5 rounded-3xl border border-hairline bg-white shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl font-bold border border-emerald-100">
                  {emojis[c.id] || '👣'}
                </div>
                <h3 className="text-[14px] font-bold text-ink font-display leading-snug">
                  {c.name.split(' / ')[0]}
                </h3>
                <p className="text-[11.5px] text-body-text leading-relaxed font-normal">
                  {c.blurb}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Festivals */}
      <div className="px-4 mt-6">
        <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-3">
          Festivals &amp; Celebrations
        </h2>
        <div className="space-y-3">
          {festivals.map((f) => (
            <div
              key={f.id}
              className="p-4 rounded-2xl border border-hairline bg-canvas-soft flex items-start gap-4"
            >
              <span className="text-2xl mt-0.5">📅</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13.5px] font-bold text-ink font-display">{f.name}</h3>
                  <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-bold uppercase px-1.5 py-0.5 rounded">
                    {f.season}
                  </span>
                </div>
                <p className="text-[11.5px] text-body-text leading-relaxed font-normal">
                  {f.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Cuisine */}
      <div className="px-4 mt-6">
        <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-3">
          Himalayan Cuisine
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {cuisineNotes.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl border border-hairline bg-white shadow-xs flex items-start gap-3.5"
            >
              <span className="text-xl p-2 bg-canvas-soft rounded-xl shrink-0">
                {index === 0 ? '🥟' : index === 1 ? '🍜' : index === 2 ? '🧀' : '☕'}
              </span>
              <div className="space-y-0.5">
                <h3 className="text-[13px] font-bold text-ink leading-snug">{item.name}</h3>
                <p className="text-[11.5px] text-body-text leading-relaxed font-normal">
                  {item.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Cultural Landmarks */}
      <div className="px-4 mt-6">
        <h2 className="text-[14px] font-bold text-ink uppercase tracking-wider mb-3">
          Culinary Landmarks
        </h2>
        <div className="space-y-4">
          {landmarks.map((spot) => (
            <div
              key={spot.name}
              className="rounded-3xl border border-hairline bg-white shadow-xs overflow-hidden"
            >
              <div className="p-4 flex items-start gap-4">
                <span className="text-3xl p-3 bg-canvas-soft rounded-2xl shrink-0">
                  {spot.emoji}
                </span>
                <div className="space-y-1">
                  <h3 className="text-[14px] font-bold text-ink leading-snug">{spot.name}</h3>
                  <p className="text-[11.5px] text-body-text leading-relaxed font-normal">
                    {spot.description}
                  </p>
                  <div className="text-[10px] text-mute pt-1 uppercase tracking-wider font-semibold">
                    Must Order: <span className="text-emerald-800 lowercase font-bold">{spot.order}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
