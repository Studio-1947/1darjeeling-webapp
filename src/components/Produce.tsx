import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { produce, monthLabels } from "../data/produce";

export default function Produce() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".produce-row", {
        opacity: 0,
        x: -12,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".produce-blurb", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".produce-blurbs", start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="produce" ref={sectionRef} className="bg-mist-light px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="signage mb-3 text-xs text-rust">Fruits & local produce</p>
        <h2 className="font-display max-w-lg text-3xl text-ink sm:text-4xl">
          What's actually in season
        </h2>
        <p className="mt-3 max-w-xl text-sm text-tea/70">
          Darjeeling's calendar runs on harvests as much as holidays.
        </p>

        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[160px_repeat(12,1fr)] gap-x-1 pb-2">
              <div />
              {monthLabels.map((m) => (
                <div key={m} className="signage text-center text-[10px] text-tea/50">
                  {m}
                </div>
              ))}
            </div>
            {produce.map((p) => (
              <div
                key={p.id}
                className="produce-row grid grid-cols-[160px_repeat(12,1fr)] items-center gap-x-1 border-t border-tea/10 py-3"
              >
                <span className="pr-3 text-sm text-ink">{p.name}</span>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <div
                    key={m}
                    className={`mx-auto h-2.5 w-2.5 rounded-full ${
                      p.months.includes(m) ? "bg-marigold" : "bg-tea/10"
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="produce-blurbs mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produce.map((p) => (
            <div key={p.id} className="produce-blurb">
              <h3 className="font-display text-base text-ink">{p.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-tea/75">
                {p.blurb}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
