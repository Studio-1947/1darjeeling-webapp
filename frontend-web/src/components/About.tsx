import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltedCard from './TiltedCard';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Fade in and translate up for text and statistics
      gsap.fromTo(
        el.querySelectorAll('.reveal-item'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-20 py-24 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side: Image Card */}
        <div className="relative group flex justify-center w-full">
          <TiltedCard
            imageSrc="/darjeeling.jpg"
            altText="Darjeeling tea gardens and hills"
            containerHeight="400px"
            containerWidth="100%"
            imageHeight="400px"
            imageWidth="100%"
            scaleOnHover={1.05}
            rotateAmplitude={12}
            showMobileWarning={false}
            showTooltip={false}
          />
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 bg-canvas border border-canvas-softer p-6 rounded-2xl shadow-xl max-w-[200px] hidden sm:block z-30">
            <p className="text-3xl font-extrabold text-primary font-display">100%</p>
            <p className="text-xs text-body-text font-medium mt-1">Local connections direct to service providers.</p>
          </div>
        </div>

        {/* Right Side: Text & Info */}
        <div className="space-y-6">
          <span className="reveal-item text-xs font-bold uppercase tracking-wider text-body-text px-3 py-1 bg-canvas-soft border border-canvas-softer rounded-full inline-block">
            1darjeeling
          </span>

          <h2 className="reveal-item text-3xl md:text-5xl font-extrabold text-ink leading-tight font-display">
            Your authentic guide to the Queen of Hills
          </h2>

          <p className="reveal-item text-body-text text-base leading-relaxed font-normal">
            1darjeeling connects you directly with the heart of the Himalayas. We cut out middleman commissions to empower local homeowners, experienced drivers, and cozy family-run cafes.
          </p>

          <p className="reveal-item text-body-text text-base leading-relaxed font-normal">
            Whether you want a warm cup of tea at a heritage estate, a safe jeep journey through the winding hills, or the best thukpa recommendations in town—our curated directories bring you verified, local-first choices.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-canvas-softer">
            <div>
              <p className="reveal-item text-2xl font-bold text-ink font-display">
                50+
              </p>
              <p className="reveal-item text-xs text-mute font-medium">
                Cozy Homestays
              </p>
            </div>
            <div>
              <p className="reveal-item text-2xl font-bold text-ink font-display">
                30+
              </p>
              <p className="reveal-item text-xs text-mute font-medium">
                Verified Drivers & Routes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
