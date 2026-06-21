import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that handles the scroll parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      // Background image: subtle upward motion
      tl.to(bgRef.current, {
        yPercent: -15,
        ease: "none",
      }, 0);

      // Text: rises from bottom of the screen (behind the foreground cutout) to the middle
      tl.fromTo(
        textRef.current,
        { yPercent: 150, opacity: 0 },
        { yPercent: 0, opacity: 1, ease: "power1.out" },
        0
      );

      // Foreground: stays mostly fixed or moves very slightly down/up to enhance depth
      tl.to(fgRef.current, {
        yPercent: -5,
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100vh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image: hero.jpg */}
      <img
        ref={bgRef}
        src="/hero.jpg"
        alt="Darjeeling background"
        className="absolute inset-0 z-0 h-[120%] w-full object-cover pointer-events-none select-none"
      />

      {/* Parallax Text: DARJEELING */}
      <div
        ref={textRef}
        className="absolute z-10 w-full text-center pointer-events-none select-none"
      >
        <h1 className="font-display font-black text-[12vw] sm:text-[10vw] leading-none text-white tracking-[0.25em] uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          Darjeeling
        </h1>
      </div>


    </section>
  );
}
