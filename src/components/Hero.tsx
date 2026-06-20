import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<SVGSVGElement>(null);
  const midRef = useRef<SVGSVGElement>(null);
  const nearRef = useRef<SVGSVGElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const cloudLeftRef = useRef<HTMLDivElement>(null);
  const cloudRightRef = useRef<HTMLDivElement>(null);
  const videoLeftRef = useRef<HTMLVideoElement>(null);
  const videoRightRef = useRef<HTMLVideoElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync the video playtimes
    if (videoLeftRef.current && videoRightRef.current) {
      const vL = videoLeftRef.current;
      const vR = videoRightRef.current;

      const syncPlay = () => {
        vL.play().catch(() => { });
        vR.play().catch(() => { });
      };

      vL.addEventListener("play", () => {
        if (vR.paused) vR.play().catch(() => { });
      });
      vR.addEventListener("play", () => {
        if (vL.paused) vL.play().catch(() => { });
      });

      syncPlay();
    }

    const ctx = gsap.context(() => {
      // Pinned timeline for cloud reveal & initial hero entry
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=700",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Animate clouds splitting by shrinking the panel widths to 0
      revealTl
        .to(cloudLeftRef.current, { width: "0vw", ease: "power1.inOut" }, 0)
        .to(cloudRightRef.current, { width: "0vw", ease: "power1.inOut" }, 0)
        .to(introTextRef.current, { opacity: 0, y: -60, scale: 0.95, ease: "power1.inOut" }, 0);

      // Animate Hero elements entry as the clouds open
      revealTl
        .from(sunRef.current, { scale: 0.8, opacity: 0, ease: "power1.out" }, 0.1)
        .from(farRef.current, { yPercent: 10, opacity: 0, ease: "power1.out" }, 0.1)
        .from(midRef.current, { yPercent: 14, opacity: 0, ease: "power1.out" }, 0.2)
        .from(nearRef.current, { yPercent: 18, opacity: 0, ease: "power1.out" }, 0.3)
        .from(eyebrowRef.current, { y: 20, opacity: 0, ease: "power1.out" }, 0.35)
        .from(headlineRef.current, { y: 25, opacity: 0, ease: "power1.out" }, 0.4)
        .from(subRef.current, { y: 20, opacity: 0, ease: "power1.out" }, 0.45)
        .from(ctaRef.current, { y: 15, opacity: 0, ease: "power1.out" }, 0.5);

      // Scroll parallax - starts after the pinned reveal is finished (when section actually scrolls up)
      gsap.to(farRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=700 top",
          end: "bottom+=700 top",
          scrub: true,
        },
      });
      gsap.to(midRef.current, {
        yPercent: 26,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=700 top",
          end: "bottom+=700 top",
          scrub: true,
        },
      });
      gsap.to(nearRef.current, {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=700 top",
          end: "bottom+=700 top",
          scrub: true,
        },
      });
      gsap.to(sunRef.current, {
        yPercent: -20,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top+=700 top",
          end: "bottom+=700 top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100vh] min-h-[640px] w-full flex-col justify-end overflow-hidden bg-gradient-to-b from-dawn via-mist to-mist"
    >
      {/* Cloud Curtain Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        {/* Left Side Curtain */}
        <div
          ref={cloudLeftRef}
          className="absolute left-0 top-0 h-full w-[50.5vw] bg-mist overflow-hidden"
        >
          <video
            ref={videoLeftRef}
            src="/clouds.mp4"
            muted
            loop
            playsInline
            autoPlay
            className="absolute left-0 top-0 h-[100vh] w-[100vw] max-w-none object-cover pointer-events-none"
          />
        </div>

        {/* Right Side Curtain */}
        <div
          ref={cloudRightRef}
          className="absolute right-0 top-0 h-full w-[50.5vw] bg-mist overflow-hidden"
        >
          <video
            ref={videoRightRef}
            src="/clouds.mp4"
            muted
            loop
            playsInline
            autoPlay
            className="absolute right-0 top-0 h-[100vh] w-[100vw] max-w-none object-cover pointer-events-none"
          />
        </div>

        {/* Centered Scroll Prompt */}
        <div
          ref={introTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <span className="signage text-white/60 text-sm tracking-[0.3em] uppercase mb-3 animate-pulse">
            Welcome to the Queen of Hills
          </span>
          <h2
            className="font-Jost font-extrabold text-6xl sm:text-8xl lg:text-[9rem] text-white/80 max-w-4xl leading-none tracking-tighter uppercase"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.2)" }}
          >
            Darjeeling
          </h2>
        </div>
      </div>
      {/* Sun / dawn glow */}
      <div
        ref={sunRef}
        className="absolute left-1/2 top-[18%] h-56 w-56 -translate-x-1/2 rounded-full bg-marigold/70 blur-2xl sm:h-72 sm:w-72"
      />

      {/* Far ridge */}
      <svg
        ref={farRef}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[60%] w-full text-tea/20"
      >
        <path
          fill="currentColor"
          d="M0 320 L120 220 L260 300 L420 160 L600 280 L760 140 L940 260 L1100 180 L1260 270 L1440 200 L1440 400 L0 400 Z"
        />
      </svg>

      {/* Mid ridge */}
      <svg
        ref={midRef}
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[48%] w-full text-tea/45"
      >
        <path
          fill="currentColor"
          d="M0 360 L160 260 L320 340 L480 200 L660 320 L820 180 L1000 300 L1180 220 L1320 310 L1440 250 L1440 400 L0 400 Z"
        />
      </svg>

      {/* Near ridge */}
      <svg
        ref={nearRef}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[34%] w-full text-tea"
      >
        <path
          fill="currentColor"
          d="M0 280 L200 180 L380 260 L560 140 L760 250 L960 160 L1160 240 L1320 190 L1440 230 L1440 320 L0 320 Z"
        />
      </svg>

      {/* Legibility scrim behind the copy block */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[60%] bg-gradient-to-t from-mist via-mist/85 to-transparent" />

      {/* Copy */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-32 lg:px-10 lg:pb-28">
        <p ref={eyebrowRef} className="signage mb-4 text-xs text-tea/70">
          A travel guide built on the ridge, not in an office
        </p>
        <h1
          ref={headlineRef}
          className="font-display max-w-3xl text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl"
        >
          Made in Darjeeling.
          <br />
          Made for Darjeeling.
        </h1>
        <p ref={subRef} className="mt-5 max-w-md text-base text-tea/80 lg:text-lg">
          Homestays, drivers, routes, attractions, fruit in season, and the
          customs worth knowing before you arrive — written by people who
          live on this ridge, not scraped from somewhere else.
        </p>
        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#stays"
            className="rounded-full bg-rust px-6 py-3 text-sm font-medium text-mist-light transition-transform hover:-translate-y-0.5"
          >
            Find a place to stay
          </a>
          <a
            href="#attractions"
            className="signage text-xs text-tea underline decoration-tea/30 underline-offset-4 hover:decoration-rust"
          >
            See the stops along the way
          </a>
        </div>
      </div>
    </section>
  );
}
