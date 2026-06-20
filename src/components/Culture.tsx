import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { communities, festivals, cuisineNotes } from "../data/culture";

export default function Culture() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".culture-block", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="culture" ref={sectionRef} className="bg-mist px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="signage mb-3 text-xs text-rust">Culture & festivals</p>
        <h2 className="font-display max-w-lg text-3xl text-ink sm:text-4xl">
          A ridge with more than one language on it
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="culture-block">
            <h3 className="signage text-xs text-tea/60">Communities</h3>
            <div className="mt-4 space-y-5">
              {communities.map((c) => (
                <div key={c.id}>
                  <p className="font-display text-base text-ink">{c.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-tea/75">
                    {c.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="culture-block">
            <h3 className="signage text-xs text-tea/60">Festivals</h3>
            <div className="mt-4 space-y-5">
              {festivals.map((f) => (
                <div key={f.id} className="flex gap-4">
                  <span className="signage w-16 shrink-0 text-[11px] text-rust">
                    {f.season}
                  </span>
                  <div>
                    <p className="font-display text-base text-ink">{f.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-tea/75">
                      {f.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="culture-block mt-16">
          <h3 className="signage text-xs text-tea/60">On the table</h3>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cuisineNotes.map((c) => (
              <div key={c.name} className="rounded-2xl border border-tea/10 bg-mist-light p-5">
                <p className="font-display text-base text-ink">{c.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-tea/75">{c.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
