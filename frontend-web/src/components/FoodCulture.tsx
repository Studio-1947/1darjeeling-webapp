import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FoodCulture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the intro banner
      gsap.fromTo(
        '.food-title',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );

      // Animate section headings and cards
      gsap.fromTo(
        '.food-section',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
      );

      gsap.fromTo(
        '.food-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: 'back.out(1.15)', delay: 0.15 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const communities = [
    {
      title: 'The Gorkhas and Nepalese',
      description: 'The majority population brings ethnic Nepali staples. Traditional meals feature Dal Bhaat (lentils and rice) accompanied by spicy meat curries, Gundruk Ko Achar (fermented mustard leaf pickle), and Sel Roti on celebratory occasions.',
      photo: 'https://media.easy-peasy.ai/80e6c8e3-a04d-4ba3-92c0-902d4a874a90/c144a1b2-036f-433b-94ba-081f616111c7_medium.webp',
      tag: 'Ethnic Gorkha'
    },
    {
      title: 'The Tibetans',
      description: 'Migrants from across the border have heavily influenced local street food culture. Hearty, cold-weather staples like Thukpa (warm noodle soup), Shaphaley (crispy beef/veg stuffed bread), and steamed Momos are central to the high-altitude diet.',
      photo: 'https://data.tibettravel.org/assets/images/tibet/polyandry-in-tibet-thumbnail.jpg',
      tag: 'Tibetan Highlands'
    },
    {
      title: 'The Indigenous Lepchas & Bhutias',
      description: 'The original guardians of the hills introduced wild, foraged, fermented, and fresh mountain ingredients. Their food habits emphasize organic farming, forest greens, mushrooms, and traditional home-brewed millet beers.',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_BPmVnFq3QrPVWR68lmjhnRdQylTvZ6Yqo__FrUZD4YuYV8NPFqjtuMA&s=10',
      tag: 'Native Tribes'
    },
    {
      title: 'Plains & British Planters',
      description: 'The influx of tourists and colonial settlers introduced high-tea customs, European bakes, and breakfast houses (like Keventer\'s), while plains migrants added tangier, spicier Indian street foods like Aloo Dum and Puchka.',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/1933_British_Everest_Expedition_in_Darjeeling.jpg',
      tag: 'Colonial & Plains'
    }
  ];

  const delicacies = [
    {
      name: 'Momos',
      description: 'The undisputed king of Darjeeling street food. Hand-rolled wheat dumplings stuffed with juicy minced chicken, pork, or vegetables, steamed to perfection and served with a spicy regional red tomato-chilli sauce.',
      photo: 'https://static.india.com/wp-content/uploads/2024/12/FEATURE-2024-12-15T174448.090.jpg?impolicy=Medium_Widthonly&w=350&h=263',
      pairing: 'Fiery tomato-chilli chutney'
    },
    {
      name: 'Thukpa',
      description: 'A comforting Tibetan-style noodle soup packed with fresh local greens, shredded meat or vegetables, simmered in a piping-hot, aromatic ginger-garlic broth. The perfect antidote to Darjeeling\'s misty, chilly evenings.',
      photo: 'https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/4x3/4x3-veg-thukpa-soup.jpg',
      pairing: 'Shaphaley (stuffed fried bread)'
    },
    {
      name: 'Aloo Dum',
      description: 'Spicy, slow-cooked baby potatoes tossed in a rich gravy of ground red chillies, mustard oil, and local spices. It is often served alongside Poori (puffed bread) or topped with Bhujia (crispy chickpea noodles) as a popular street snack.',
      photo: 'https://www.cookingcarnival.com/wp-content/uploads/2016/04/Kashmiri-Dum-Aloo-4.jpg',
      pairing: 'Bhujia and chopped onions'
    },
    {
      name: 'Sel Roti',
      description: 'A crispy, sweet rice-flour ring bread, mildly flavored with cardamom and ghee. It is traditionally prepared by hand during Tihar (Diwali) and other festive seasons, eaten warm with spicy potato curries.',
      photo: 'https://delishglobe.com/wp-content/uploads/2025/05/Sel-Roti-Nepali-Rice-Doughnut.png',
      pairing: 'Aloo Dum or hot milk tea'
    },
    {
      name: 'Churpee',
      description: 'A traditional, hard Himalayan cheese made from yak or cow milk. It is famously known for its long-lasting chewiness and is a popular snack that locals chew to keep warm in the freezing mountain weather.',
      photo: 'https://thebuddhistshop.in/cdn/shop/products/kalimpongchurpi.jpg?v=1630734983&width=1445',
      pairing: 'Traditional snack or grated in soups'
    },
    {
      name: 'Gundruk',
      description: 'Fermented, sun-dried leafy mustard or radish greens that are deeply aromatic and tangy. It is a legendary staple cooked into a sour soup or served as a pickle (Ko Achar) with traditional meals.',
      photo: 'https://hellosikkim.online/wp-content/uploads/2022/08/gundruk-6.png',
      pairing: 'Steamed rice and local ghee'
    }
  ];

  const beverages = [
    {
      name: 'Darjeeling Tea',
      description: 'Globally celebrated as the "Champagne of Teas," this light-bodied, highly aromatic brew features distinct muscatel grape notes. Best enjoyed without milk or sugar, direct from single-estate first or second flushes.',
      photo: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
      origin: 'Makaibari, Happy Valley, or Castleton estates'
    },
    {
      name: 'Tongba',
      description: 'A traditional Limbu alcoholic brew made of fermented whole millet. Served warm in a tall wooden vessel, filled with hot water and sipped slowly through a perforated bamboo straw as it continually infuses.',
      photo: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
      origin: 'Local mountain taverns (Bhattis)'
    }
  ];

  const landmarks = [
    {
      name: 'Glenary\'s Bakery & Pub',
      description: 'A landmark colonial white-fronted building. The ground floor bakery offers legendary pastries, meat pies, and Darjeeling tea, while the upper floor features a lively British-style pub and restaurant with mountain views.',
      photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
      order: 'Apple Pie, Cinnamon Buns, & Hot Chocolate'
    },
    {
      name: 'Kunga Restaurant',
      description: 'A small, cozy, family-run eatery right on Gandhi Road, famous for serving the most authentic Tibetan food in the hills. Known for its rich, thick broths, handmade noodles, and generous momo plates.',
      photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      order: 'Chicken Steamed Momos & Gyathuk noodle soup'
    },
    {
      name: 'Keventer\'s',
      description: 'Established in 1911, this open-air terrace joint is famous for its classic English breakfast platter. Grab a seat on the rooftop balcony and enjoy a view of the mountains over a pot of tea.',
      photo: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
      order: 'Pork Sausage platter, Fried Eggs, & Milkshakes'
    }
  ];

  return (
    <div ref={containerRef} className="space-y-16 text-ink pb-12">
      
      {/* Introduction Banner */}
      <div className="food-title border-l-4 border-primary pl-5 py-2 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-extrabold text-ink font-display tracking-tight">Food &amp; Culture</h2>
        <p className="text-sm md:text-base text-body-text mt-2 max-w-2xl leading-relaxed">
          Darjeeling's culinary landscape is a unique mountain melting pot—bringing together centuries-old Tibetan traditions, rich Nepalese heritage, indigenous tribal recipes, and British colonial customs.
        </p>
      </div>

      {/* Community Influence */}
      <section className="food-section space-y-6">
        <h3 className="text-2xl font-bold border-b border-canvas-softer pb-3 flex items-center gap-2.5">
          <img src="/tags.svg" className="w-6.5 h-6.5 object-contain" alt="" />
          Cultural Influences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communities.map((community) => (
            <div key={community.title} className="food-card bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
              <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden bg-canvas-soft shrink-0">
                <img src={community.photo} alt={community.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-canvas-softer">
                  {community.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h4 className="font-bold text-lg text-ink font-display">{community.title}</h4>
                <p className="text-xs md:text-sm text-body-text mt-2 leading-relaxed">{community.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delicacies */}
      <section className="food-section space-y-6">
        <h3 className="text-2xl font-bold border-b border-canvas-softer pb-3 flex items-center gap-2.5">
          <img src="/price.svg" className="w-6.5 h-6.5 object-contain" alt="" />
          Must-Try Local Delicacies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {delicacies.map((delicacy) => (
            <div key={delicacy.name} className="food-card bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-64 w-full relative overflow-hidden bg-canvas-soft">
                  <img src={delicacy.photo} alt={delicacy.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-lg text-ink font-display">{delicacy.name}</h4>
                  <p className="text-xs md:text-sm text-body-text leading-relaxed">{delicacy.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-canvas-softer bg-canvas-soft/30">
                <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">Best Paired With</p>
                <p className="text-xs text-ink font-medium mt-0.5">{delicacy.pairing}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beverages */}
      <section className="food-section space-y-6">
        <h3 className="text-2xl font-bold border-b border-canvas-softer pb-3 flex items-center gap-2.5">
          <img src="/established.svg" className="w-6.5 h-6.5 object-contain" alt="" />
          Iconic Mountain Beverages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beverages.map((beverage) => (
            <div key={beverage.name} className="food-card bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
              <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden bg-canvas-soft shrink-0">
                <img src={beverage.photo} alt={beverage.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg text-ink font-display">{beverage.name}</h4>
                  <p className="text-xs md:text-sm text-body-text mt-2 leading-relaxed">{beverage.description}</p>
                </div>
                <div className="pt-4 border-t border-canvas-softer mt-4">
                  <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">Where to try</p>
                  <p className="text-xs text-ink font-medium mt-0.5">{beverage.origin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Food Landmarks */}
      <section className="food-section space-y-6">
        <h3 className="text-2xl font-bold border-b border-canvas-softer pb-3 flex items-center gap-2.5">
          <img src="/location.svg" className="w-6.5 h-6.5 object-contain" alt="" />
          Iconic Culinary Landmarks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {landmarks.map((spot) => (
            <div key={spot.name} className="food-card bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="h-64 w-full relative overflow-hidden bg-canvas-soft">
                  <img src={spot.photo} alt={spot.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="font-bold text-base md:text-lg text-ink font-display">{spot.name}</h4>
                  <p className="text-xs md:text-sm text-body-text leading-relaxed">{spot.description}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-canvas-softer bg-canvas-soft/30">
                <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">Must Order</p>
                <p className="text-xs text-primary font-bold mt-0.5">{spot.order}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
