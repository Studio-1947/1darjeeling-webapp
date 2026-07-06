import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Sets up Lenis smooth scrolling and keeps it in sync with GSAP's
 * ticker + ScrollTrigger, so scroll-driven animations stay accurate.
 *
 * Pass `paused: true` while a blocking overlay (e.g. the onboarding
 * questionnaire) is open — the page stops scrolling until it flips back.
 */
export function useLenis(paused = false) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    (window as any).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Runs after the setup effect above, so the instance exists on first render —
  // unlike consumers reading window.lenis from their own mount effects.
  useEffect(() => {
    const lenis = (window as any).lenis as Lenis | undefined;
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);
}
