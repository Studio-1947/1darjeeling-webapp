import { useNavigate } from 'react-router-dom';
import { ParallaxShell, ParallaxHero, SectionPanel, PanelHeader } from '../components/parallax';

const FOOD_HERO =
  'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=2400&q=85';

interface FoodCard {
  name: string;
  description: string;
  photo: string;
  note?: string;
  noteLabel?: string;
  tag?: string;
}

const communities: FoodCard[] = [
  {
    name: 'The Gorkhas & Nepalese',
    description:
      'The majority population brings ethnic Nepali staples — Dal Bhaat, spicy meat curries, Gundruk Ko Achar (fermented mustard-leaf pickle), and Sel Roti on celebratory occasions.',
    photo: 'https://m.media-amazon.com/images/I/61NNzjkRVgL.jpg',
    tag: 'Ethnic Gorkha',
  },
  {
    name: 'The Tibetans',
    description:
      'Migrants across the border shaped local street food — hearty cold-weather staples like Thukpa, Shaphaley, and steamed Momos are central to the high-altitude diet.',
    photo: 'https://data.tibettravel.org/assets/images/tibet/polyandry-in-tibet-thumbnail.jpg',
    tag: 'Tibetan Highlands',
  },
  {
    name: 'Lepchas & Bhutias',
    description:
      'The original guardians of the hills introduced wild, foraged and fermented mountain ingredients — organic farming, forest greens, mushrooms, and home-brewed millet beers.',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_BPmVnFq3QrPVWR68lmjhnRdQylTvZ6Yqo__FrUZD4YuYV8NPFqjtuMA&s=10',
    tag: 'Native Tribes',
  },
  {
    name: 'Plains & British Planters',
    description:
      'Colonial settlers introduced high-tea customs and European bakes, while plains migrants added tangier, spicier street foods like Aloo Dum and Puchka.',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/1933_British_Everest_Expedition_in_Darjeeling.jpg',
    tag: 'Colonial & Plains',
  },
];

const delicacies: FoodCard[] = [
  {
    name: 'Momos',
    description:
      'The undisputed king of Darjeeling street food. Hand-rolled dumplings stuffed with minced chicken, pork, or vegetables, steamed and served with a spicy red tomato-chilli sauce.',
    photo: 'https://static.india.com/wp-content/uploads/2024/12/FEATURE-2024-12-15T174448.090.jpg?impolicy=Medium_Widthonly&w=350&h=263',
    noteLabel: 'Best paired with',
    note: 'Fiery tomato-chilli chutney',
  },
  {
    name: 'Thukpa',
    description:
      "A comforting Tibetan noodle soup packed with local greens and shredded meat, simmered in an aromatic ginger-garlic broth — the perfect antidote to Darjeeling's misty evenings.",
    photo: 'https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/4x3/4x3-veg-thukpa-soup.jpg',
    noteLabel: 'Best paired with',
    note: 'Shaphaley (stuffed fried bread)',
  },
  {
    name: 'Aloo Dum',
    description:
      'Spicy, slow-cooked baby potatoes in a rich gravy of ground red chillies and mustard oil, served with Poori or topped with crispy Bhujia as a popular street snack.',
    photo: 'https://www.cookingcarnival.com/wp-content/uploads/2016/04/Kashmiri-Dum-Aloo-4.jpg',
    noteLabel: 'Best paired with',
    note: 'Bhujia and chopped onions',
  },
  {
    name: 'Sel Roti',
    description:
      'A crispy, sweet rice-flour ring bread flavoured with cardamom and ghee, traditionally prepared by hand during Tihar and festive seasons, eaten warm.',
    photo: 'https://delishglobe.com/wp-content/uploads/2025/05/Sel-Roti-Nepali-Rice-Doughnut.png',
    noteLabel: 'Best paired with',
    note: 'Aloo Dum or hot milk tea',
  },
  {
    name: 'Churpee',
    description:
      'A traditional hard Himalayan cheese made from yak or cow milk, famous for its long-lasting chewiness — locals chew it to keep warm in the freezing weather.',
    photo: 'https://thebuddhistshop.in/cdn/shop/products/kalimpongchurpi.jpg?v=1630734983&width=1445',
    noteLabel: 'Enjoyed as',
    note: 'A snack or grated into soups',
  },
  {
    name: 'Gundruk',
    description:
      'Fermented, sun-dried leafy mustard greens — deeply aromatic and tangy, cooked into a sour soup or served as a pickle with traditional meals.',
    photo: 'https://hellosikkim.online/wp-content/uploads/2022/08/gundruk-6.png',
    noteLabel: 'Best paired with',
    note: 'Steamed rice and local ghee',
  },
];

const beverages: FoodCard[] = [
  {
    name: 'Darjeeling Tea',
    description:
      'The "Champagne of Teas" — a light-bodied, aromatic brew with distinct muscatel notes. Best enjoyed plain, direct from single-estate first or second flushes.',
    photo: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Where to try',
    note: 'Makaibari, Happy Valley, or Castleton estates',
  },
  {
    name: 'Tongba',
    description:
      'A traditional Limbu brew of fermented millet, served warm in a tall wooden vessel, sipped slowly through a perforated bamboo straw as it continually infuses.',
    photo: 'https://thebuzznepal.com/wp-content/uploads/2024/04/1592137659880.jpeg',
    noteLabel: 'Where to try',
    note: 'Local mountain taverns (Bhattis)',
  },
];

const landmarks: FoodCard[] = [
  {
    name: "Glenary's Bakery & Pub",
    description:
      'A landmark colonial white-fronted building — the ground-floor bakery offers legendary pastries and tea, while the upper floor is a lively British-style pub with mountain views.',
    photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Apple Pie, Cinnamon Buns & Hot Chocolate',
  },
  {
    name: 'Kunga Restaurant',
    description:
      'A cozy, family-run eatery on Gandhi Road, famous for the most authentic Tibetan food in the hills — rich broths, handmade noodles, and generous momo plates.',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Steamed Momos & Gyathuk noodle soup',
  },
  {
    name: "Keventer's",
    description:
      'Established in 1911, this open-air terrace joint is famous for its classic English breakfast platter — enjoy it on the rooftop balcony over a pot of tea.',
    photo: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    noteLabel: 'Must order',
    note: 'Pork Sausage platter, Fried Eggs & Milkshakes',
  },
];

// Horizontal card row — keeps each sticky panel around one screen tall.
function CardRow({ cards }: { cards: FoodCard[] }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
      {cards.map((card) => (
        <div
          key={card.name}
          className="shrink-0 w-72 bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm flex flex-col"
        >
          <div className="h-44 w-full overflow-hidden bg-canvas-soft relative">
            <img
              src={card.photo}
              alt={card.name}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            {card.tag && (
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-canvas-softer">
                {card.tag}
              </span>
            )}
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h4 className="font-bold text-lg text-ink font-display mb-2">{card.name}</h4>
            <p className="text-sm text-body-text leading-relaxed flex-1">{card.description}</p>
            {card.note && (
              <div className="pt-3 mt-3 border-t border-canvas-softer">
                <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">{card.noteLabel}</p>
                <p className="text-xs text-ink font-medium mt-0.5">{card.note}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FoodCulturePage() {
  const navigate = useNavigate();

  const hero = (
    <ParallaxHero
      image={FOOD_HERO}
      badge={{ icon: '/tags.svg', label: 'Food & Culture' }}
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Food & Culture' }]}
      title="A mountain melting pot"
      facts={[
        { icon: '/location.svg', text: 'Darjeeling Hills' },
        { text: 'Tibetan · Gorkha · Lepcha · Colonial', strong: true },
      ]}
    />
  );

  return (
    <ParallaxShell activeTab="food" hero={hero}>
      {/* Intro */}
      <SectionPanel bg="bg-canvas">
        <PanelHeader eyebrow="The Story" title="Food & Culture" iconSrc="/rooms.svg" />
        <p className="text-lg md:text-2xl text-body-text leading-relaxed max-w-3xl font-normal">
          Darjeeling's culinary landscape is a unique mountain melting pot — bringing together centuries-old Tibetan
          traditions, rich Nepalese heritage, indigenous tribal recipes, and British colonial customs.
        </p>
      </SectionPanel>

      {/* Cultural influences */}
      <SectionPanel bg="bg-canvas-soft">
        <PanelHeader eyebrow="Communities" title="Cultural influences" iconSrc="/tags.svg" />
        <CardRow cards={communities} />
      </SectionPanel>

      {/* Delicacies */}
      <SectionPanel bg="bg-canvas">
        <PanelHeader eyebrow="On the plate" title="Must-try delicacies" iconSrc="/price.svg" />
        <CardRow cards={delicacies} />
      </SectionPanel>

      {/* Beverages */}
      <SectionPanel bg="bg-canvas-soft">
        <PanelHeader eyebrow="In the cup" title="Iconic mountain beverages" iconSrc="/established.svg" />
        <CardRow cards={beverages} />
      </SectionPanel>

      {/* Landmarks */}
      <SectionPanel bg="bg-canvas">
        <PanelHeader eyebrow="Where to eat" title="Iconic culinary landmarks" iconSrc="/location.svg" />
        <CardRow cards={landmarks} />
      </SectionPanel>

      {/* CTA */}
      <SectionPanel bg="bg-ink" dark>
        <div className="max-w-2xl">
          <PanelHeader eyebrow="Taste it yourself" title="Hungry yet?" iconSrc="/menu.svg" dark />
          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-xl">
            Explore Darjeeling's cafes and tea rooms, or find a local driver to take you to the best momo shacks and
            tea estates in the hills.
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
