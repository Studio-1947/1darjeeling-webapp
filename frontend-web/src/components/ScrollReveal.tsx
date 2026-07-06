import { useEffect, useRef, useMemo } from 'react';
import type { ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  scrub?: boolean | number;
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  scrub = 1 // Default to 1 for smooth catching-up animation
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Only use an explicit scroller when a custom container ref is provided.
    // When using Lenis smooth scroll, the default (document) scroller is
    // already kept in sync via `lenis.on('scroll', ScrollTrigger.update)`,
    // so setting `scroller: window` explicitly can cause a mismatch where
    // ScrollTrigger reads a stale native scroll position instead of
    // the Lenis-interpolated one — which is what causes the "stuck" state.
    const scrollerConfig = scrollContainerRef?.current
      ? { scroller: scrollContainerRef.current }
      : {};

    const ctx = gsap.context(() => {
      // Rotation animation
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              ...scrollerConfig,
              start: 'top bottom',
              end: rotationEnd,
              scrub: scrub,
              invalidateOnRefresh: true
            }
          }
        );
      }

      const wordElements = el.querySelectorAll('.word');

      // Opacity animation
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            ...scrollerConfig,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: scrub,
            invalidateOnRefresh: true
          }
        }
      );

      // Blur animation
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.03,
            scrollTrigger: {
              trigger: el,
              ...scrollerConfig,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: scrub,
              invalidateOnRefresh: true
            }
          }
        );
      }
    }, el);

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, scrub]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
}
