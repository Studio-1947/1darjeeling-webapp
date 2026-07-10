import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { foodByCategory, type FoodItem } from '../data/foodCulture';

export default function FoodCulture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const openDetail = (item: FoodItem) => navigate(`/food-culture/${item.slug}`, { state: { item } });

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

  const communities = foodByCategory('community');
  const delicacies = foodByCategory('delicacy');
  const beverages = foodByCategory('beverage');
  const landmarks = foodByCategory('landmark');

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
            <div key={community.slug} onClick={() => openDetail(community)} className="food-card cursor-pointer bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
              <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden bg-canvas-soft shrink-0">
                <img src={community.photo} alt={community.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-canvas-softer">
                  {community.tag}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <h4 className="font-bold text-lg text-ink font-display">{community.name}</h4>
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
            <div key={delicacy.slug} onClick={() => openDetail(delicacy)} className="food-card cursor-pointer bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
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
                <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">{delicacy.noteLabel}</p>
                <p className="text-xs text-ink font-medium mt-0.5">{delicacy.note}</p>
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
            <div key={beverage.slug} onClick={() => openDetail(beverage)} className="food-card cursor-pointer bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row">
              <div className="w-full sm:w-56 h-56 sm:h-auto relative overflow-hidden bg-canvas-soft shrink-0">
                <img src={beverage.photo} alt={beverage.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-lg text-ink font-display">{beverage.name}</h4>
                  <p className="text-xs md:text-sm text-body-text mt-2 leading-relaxed">{beverage.description}</p>
                </div>
                <div className="pt-4 border-t border-canvas-softer mt-4">
                  <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">{beverage.noteLabel}</p>
                  <p className="text-xs text-ink font-medium mt-0.5">{beverage.note}</p>
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
            <div key={spot.slug} onClick={() => openDetail(spot)} className="food-card cursor-pointer bg-white border border-canvas-softer rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
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
                <p className="text-[10px] font-semibold text-mute uppercase tracking-wider">{spot.noteLabel}</p>
                <p className="text-xs text-primary font-bold mt-0.5">{spot.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
