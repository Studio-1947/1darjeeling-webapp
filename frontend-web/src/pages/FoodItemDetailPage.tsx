import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ParallaxShell, ParallaxHero, SectionPanel, PanelHeader } from '../components/parallax';
import { findFoodBySlug, foodByCategory, CATEGORY_ICON, type FoodItem } from '../data/foodCulture';

export default function FoodItemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer the item handed over via navigation state; fall back to a lookup by
  // slug so the page also works on a direct URL / refresh.
  const item: FoodItem | undefined = (location.state as any)?.item ?? (slug ? findFoodBySlug(slug) : undefined);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-canvas text-ink">
        <Navbar activeTab="food" searchQuery="" onSearchChange={() => {}} variant="solid" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-6xl mb-4">🍲</span>
          <h2 className="text-2xl font-extrabold mb-2 font-display">Not found</h2>
          <p className="text-body-text max-w-md mb-6">This dish or place could not be loaded.</p>
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

  // A few related items from the same category (excluding this one)
  const related = foodByCategory(item.category)
    .filter((i) => i.slug !== item.slug)
    .slice(0, 3);

  const hero = (
    <ParallaxHero
      image={item.photo}
      badge={{ icon: CATEGORY_ICON[item.category], label: item.categoryLabel }}
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Food & Culture', to: '/' }, { label: item.name }]}
      title={item.name}
      facts={[
        { icon: CATEGORY_ICON[item.category], text: item.categoryLabel, strong: true },
        ...(item.tag ? [{ text: item.tag }] : []),
      ]}
    />
  );

  return (
    <ParallaxShell activeTab="food" hero={hero}>
      {/* ABOUT — text + the item image */}
      <SectionPanel bg="bg-canvas">
        <PanelHeader eyebrow={item.categoryLabel} title="About" iconSrc="/rooms.svg" />
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <p className="text-base md:text-lg text-body-text leading-relaxed">{item.description}</p>
          <div className="rounded-3xl overflow-hidden border border-canvas-softer shadow-sm aspect-[4/3] bg-canvas-soft">
            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </SectionPanel>

      {/* HIGHLIGHT — the labelled note (pairing / where to try / must order) */}
      {item.note && (
        <SectionPanel bg="bg-canvas-soft">
          <PanelHeader eyebrow={item.noteLabel || 'Good to know'} title={item.noteLabel || 'Good to know'} iconSrc="/tip.svg" />
          <div className="p-8 bg-white border border-canvas-softer rounded-3xl shadow-sm max-w-2xl">
            <p className="text-xl md:text-2xl font-semibold text-ink">{item.note}</p>
          </div>
        </SectionPanel>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <SectionPanel bg="bg-canvas">
          <PanelHeader eyebrow="Keep exploring" title="More to taste" iconSrc="/tags.svg" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <button
                key={r.slug}
                onClick={() => navigate(`/food-culture/${r.slug}`, { state: { item: r } })}
                className="text-left bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="h-40 w-full overflow-hidden bg-canvas-soft">
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-base text-ink font-display">{r.name}</h4>
                  <p className="text-xs text-body-text mt-1 line-clamp-2 leading-relaxed">{r.description}</p>
                </div>
              </button>
            ))}
          </div>
        </SectionPanel>
      )}

      {/* CTA */}
      <SectionPanel bg="bg-ink" dark>
        <div className="max-w-2xl">
          <PanelHeader eyebrow="Taste it yourself" title="Hungry yet?" iconSrc="/menu.svg" dark />
          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-xl">
            Explore Darjeeling's cafes and tea rooms, or find a local driver to take you to the best spots in the hills.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3.5 bg-primary text-canvas font-bold text-sm rounded-2xl shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
            >
              Explore cafes
            </button>
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
