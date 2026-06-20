import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { routes, driverNotes } from "../data/routes";

export default function DriversRoutes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".route-row", {
        x: -16,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".driver-note", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="routes" ref={sectionRef} className="bg-ink px-6 py-24 text-mist lg:px-10 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="signage mb-3 text-xs text-marigold">Drivers & routes</p>
        <h2 className="font-display max-w-lg text-3xl text-mist sm:text-4xl">
          How the hills actually connect
        </h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="signage text-[11px] text-mist/50">
                <th className="border-b border-mist/15 pb-3 pr-4">Route</th>
                <th className="border-b border-mist/15 pb-3 pr-4">Distance</th>
                <th className="border-b border-mist/15 pb-3 pr-4">Duration</th>
                <th className="border-b border-mist/15 pb-3 pr-4">Road</th>
                <th className="border-b border-mist/15 pb-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((r) => (
                <tr key={r.id} className="route-row align-top">
                  <td className="border-b border-mist/10 py-4 pr-4 font-display text-base text-mist">
                    {r.from} <span className="text-marigold">→</span> {r.to}
                  </td>
                  <td className="border-b border-mist/10 py-4 pr-4 text-mist/70">
                    {r.distance}
                  </td>
                  <td className="border-b border-mist/10 py-4 pr-4 text-mist/70">
                    {r.duration}
                  </td>
                  <td className="border-b border-mist/10 py-4 pr-4 text-mist/70">
                    {r.road}
                  </td>
                  <td className="border-b border-mist/10 py-4 max-w-xs text-mist/60">
                    {r.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {driverNotes.map((n) => (
            <div key={n.heading} className="driver-note border-t border-marigold/40 pt-4">
              <h3 className="font-display text-lg text-mist">{n.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/65">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
