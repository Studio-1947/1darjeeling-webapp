import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { attractions } from "../data/attractions";

export default function Attractions() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".attraction-card", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="attractions"
      ref={sectionRef}
      className="bg-mist-light px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="signage mb-3 text-xs text-rust">Attractions</p>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Stops along the way
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-tea/70 md:block">
            In the rough order you'd actually visit them on a few days in
            town.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {attractions.map((a, i) => (
            <div
              key={a.id}
              className="attraction-card flex flex-col rounded-2xl border border-tea/10 bg-mist p-5 transition-colors hover:border-rust/40"
            >
              <span className="signage text-[11px] text-tea/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-2 text-lg text-ink">{a.name}</h3>
              <p className="signage mt-1 text-[11px] text-rust">
                {a.category}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-tea/80">
                {a.blurb}
              </p>
              <p className="mt-4 border-t border-tea/10 pt-3 text-xs text-tea/60">
                <span className="signage text-tea/40">{a.distance}</span>
              </p>
              <p className="mt-2 text-xs italic text-tea/70">{a.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
