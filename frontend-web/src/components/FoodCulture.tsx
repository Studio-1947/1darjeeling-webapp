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
      description: 'The majority population brings ethnic Nepali staples. Traditional meals feature Dal Bhaat (lentils and rice) accompanied by spicy meat curries and fermented veggies.',
      emoji: '🍛'
    },
    {
      title: 'The Tibetans',
      description: 'Migrants have heavily influenced street food. Hearty dishes like Thukpa (noodle soup), Shaphaley (stuffed fried bread), and Momos are central to the mountain diet.',
      emoji: '🥟'
    },
    {
      title: 'The Lepchas',
      description: 'The indigenous ethnic group introduced foraged, fermented, and fresh mountain ingredients that are deeply ingrained in local food habits.',
      emoji: '🍃'
    },
    {
      title: 'The Bengalis',
      description: 'Brought migration from lower plains, adding sweeter and tangier profiles—most notably the beloved local street food: Aloo Dum (spicy, tangy potatoes).',
      emoji: '🥔'
    }
  ];

  const delicacies = [
    {
      name: 'Momos',
      description: 'The undisputed king of Darjeeling street food. These steamed or fried dumplings are stuffed with minced meat or vegetables and served with fiery red tomato-chilli chutney.',
      emoji: '🥟'
    },
    {
      name: 'Thukpa',
      description: 'A hot Tibetan noodle soup with vegetables and chicken or meat broth, perfect for the chilly weather.',
      emoji: '🍜'
    },
    {
      name: 'Aloo Dum',
      description: 'A spicy, tangy potato dish often served with a regional puffed-bread treat called Poori.',
      emoji: '🥘'
    },
    {
      name: 'Sel Roti',
      description: 'A traditional Nepalese sweet rice-flour bread shaped like a ring, usually made during festivals like Diwali.',
      emoji: '🍩'
    },
    {
      name: 'Fermented Specialties',
      description: 'Gundruk (fermented, dried leafy greens often made into a sour soup or salad) and Churpee (traditional Himalayan cheese made from yak or cow milk).',
      emoji: '🧀'
    }
  ];

  const beverages = [
    {
      name: 'Darjeeling Tea',
      description: 'Known globally as the "Champagne of Teas," this light, floral, and aromatic brew is the crowning glory of the region\'s agricultural heritage.',
      emoji: '🍵'
    },
    {
      name: 'Tongba',
      description: 'A traditional, culturally rich Himalayan alcoholic beverage made from fermented millet, served warm in a bamboo vessel and sipped through a bamboo straw.',
      emoji: '🎋'
    }
  ];

  return (
    <div ref={containerRef} className="space-y-12 text-ink">
      
      {/* Introduction Banner */}
      <div className="food-title border-l-4 border-primary pl-4 py-1">
        <h2 className="text-2xl md:text-3xl font-bold text-ink">Food &amp; Culture</h2>
        <p className="text-sm text-body-text mt-1">A melting pot of Himalayan traditions, flavors, and rich community histories.</p>
      </div>

      {/* Community Influence */}
      <section className="food-section space-y-6">
        <h3 className="text-xl font-bold border-b border-canvas-softer pb-2 flex items-center gap-2">
          <span>👥</span> Cultural Influences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div key={community.title} className="food-card bg-white border border-canvas-softer rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <span className="text-3xl p-3 bg-canvas-soft rounded-2xl">{community.emoji}</span>
              <div>
                <h4 className="font-bold text-lg">{community.title}</h4>
                <p className="text-sm text-body-text mt-1.5 leading-relaxed">{community.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delicacies */}
      <section className="food-section space-y-6">
        <h3 className="text-xl font-bold border-b border-canvas-softer pb-2 flex items-center gap-2">
          <span>🍽️</span> Must-Try Local Delicacies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {delicacies.map((delicacy) => (
            <div key={delicacy.name} className="food-card bg-white border border-canvas-softer rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{delicacy.emoji}</span>
                  <h4 className="font-bold text-base">{delicacy.name}</h4>
                </div>
                <p className="text-xs text-body-text leading-relaxed">{delicacy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beverages */}
      <section className="food-section space-y-6">
        <h3 className="text-xl font-bold border-b border-canvas-softer pb-2 flex items-center gap-2">
          <span>☕</span> Beverages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {beverages.map((beverage) => (
            <div key={beverage.name} className="food-card bg-white border border-canvas-softer rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
              <span className="text-3xl p-3 bg-canvas-soft rounded-2xl">{beverage.emoji}</span>
              <div>
                <h4 className="font-bold text-lg">{beverage.name}</h4>
                <p className="text-sm text-body-text mt-1.5 leading-relaxed">{beverage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
