import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import ExploreSlider from "./ExploreSlider";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
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
      {/* Logo & Text in Top Left Corner */}
      <div className="absolute top-8 left-[100px] z-20 flex items-center gap-3">
        <img
          src="/logo.jpg"
          alt="1Darjeeling Logo"
          className="h-10 w-10 rounded-full object-cover border border-white/20"
        />
        <span className="font-googlesansflex text-xl font-bold tracking-wider text-white drop-shadow-md">
          1Darjeeling
        </span>
      </div>

      {/* Background Video: focus.mp4 */}
      <video
        ref={bgRef}
        src="/focus.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-[120%] w-full object-cover pointer-events-none select-none"
      />

      {/* Parallax Text: DARJEELING (Vertical layout with I ❤️ Hiking, left-aligned) */}
      <div
        ref={textRef}
        className="absolute left-[700px] top-[13%] -translate-y-1/2 h-fit w-fit z-10 pointer-events-none select-none flex flex-col items-start text-white font-inter font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] gap-1 sm:gap-2 mix-blend-overlay"
      >
        <span>D</span>
        <span>A</span>
        <span>R</span>
        <span>J</span>
        <span>E</span>
        <span>E</span>
        <span>L</span>
        <div className="relative flex justify-start w-full">
          <span>I</span>
          <span className="absolute left-[calc(100%+1.25rem)] sm:left-[calc(100%+1.75rem)] whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-googlesansflex tracking-normal normal-case flex items-center gap-1.5 sm:gap-2 text-white">
            <span>❤️</span>
            <span className="font-semibold">Hiking</span>
          </span>
        </div>
        <span>N</span>
        <span>G</span>
      </div>
      {/* Floating Explore Slider aligned horizontally with the Logo at the top */}
      <div className="absolute top-8 right-[100px] z-20">
        <ExploreSlider />
      </div>

    </section>
  );
}
