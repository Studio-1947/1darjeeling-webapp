import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { tips } from "../data/tips";

export default function TravelTips() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tip-card", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tips" ref={sectionRef} className="bg-mist-light px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="signage mb-3 text-xs text-rust">Travel tips</p>
        <h2 className="font-display max-w-lg text-3xl text-ink sm:text-4xl">
          Worth knowing before you go
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tips.map((t) => (
            <div
              key={t.id}
              className="tip-card flex flex-col rounded-xl border-2 border-tea bg-mist px-5 py-5"
            >
              <span className="signage text-[10px] text-rust">{t.label}</span>
              <p className="font-display mt-2 text-lg leading-snug text-ink">
                {t.heading}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-tea/75">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
