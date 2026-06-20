import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-mist px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="about-reveal signage mb-6 text-xs text-rust">
          About this guide
        </p>
        <blockquote className="about-reveal font-display text-2xl leading-snug text-ink sm:text-3xl lg:text-4xl">
          “Darjeeling gets written about by people passing through it.
          1darjeeling is written by the town's own homestays, drivers, and
          tea pluckers — the people who actually know which jeep leaves on
          time.”
        </blockquote>
        <p className="about-reveal mt-8 max-w-xl text-tea/80">
          This is a working guide, not a brochure: real routes with real
          travel times, sample stays you can use as a starting point, fruit
          that's actually in season this month, and the cultural context
          that makes a short trip feel like more than a viewpoint checklist.
        </p>
      </div>
    </section>
  );
}
