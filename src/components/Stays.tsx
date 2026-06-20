import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import { stays, type Stay } from "../data/stays";

const types: Array<Stay["type"] | "All"> = [
  "All",
  "Homestay",
  "Heritage hotel",
  "Tea estate stay",
  "Budget",
];

export default function Stays() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Stay["type"] | "All">("All");

  const filtered = useMemo(
    () => (filter === "All" ? stays : stays.filter((s) => s.type === filter)),
    [filter]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stay-card", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [filtered]);

  return (
    <section id="stays" ref={sectionRef} className="bg-mist px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="signage mb-3 text-xs text-rust">Homestays & hotels</p>
        <h2 className="font-display max-w-lg text-3xl text-ink sm:text-4xl">
          A bed for every kind of trip
        </h2>
        <p className="mt-3 max-w-xl text-sm text-tea/70">
          Sample listings to start from — built as a template for verified
          local hosts and properties.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`signage rounded-full border px-4 py-1.5 text-[11px] transition-colors ${
                filter === t
                  ? "border-rust bg-rust text-mist-light"
                  : "border-tea/20 text-tea/70 hover:border-rust/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="stay-card flex flex-col rounded-2xl border border-tea/10 bg-mist-light p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-ink">{s.name}</h3>
                <span className="signage shrink-0 rounded-full bg-tea/10 px-2.5 py-1 text-[10px] text-tea">
                  {s.type}
                </span>
              </div>
              <p className="signage mt-2 text-[11px] text-rust">{s.area}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-tea/80">
                {s.blurb}
              </p>
              <p className="signage mt-4 border-t border-tea/10 pt-3 text-[11px] text-tea/60">
                {s.priceRange}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
