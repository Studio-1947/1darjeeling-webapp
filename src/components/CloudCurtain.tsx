import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function CloudCurtain() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const cloudLeftRef = useRef<HTMLDivElement>(null);
  const cloudRightRef = useRef<HTMLDivElement>(null);
  const videoLeftRef = useRef<HTMLVideoElement>(null);
  const videoRightRef = useRef<HTMLVideoElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);

  const welcomeText = "Welcome to the Queen of Hills";
  const darjeelingText = "Darjeeling";

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
          trigger: triggerRef.current,
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

      // Blink cursors
      gsap.to(".welcome-cursor", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });
      gsap.to(".darjeeling-cursor", {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
      });

      // Typing animation timeline
      const typingTl = gsap.timeline();
      gsap.set(".darjeeling-cursor", { display: "none" });

      typingTl
        .to(".welcome-char", {
          opacity: 1,
          duration: 0.01,
          stagger: 0.05,
          ease: "none",
        })
        .to(".welcome-cursor", {
          display: "none",
          duration: 0,
        })
        .set(".darjeeling-cursor", {
          display: "inline-block",
        })
        .to(".darjeeling-char", {
          opacity: 1,
          duration: 0.01,
          stagger: 0.08,
          ease: "none",
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Invisible trigger element in document flow to control scroll pinning */}
      <div ref={triggerRef} className="absolute left-0 top-0 z-50 h-[100vh] w-full pointer-events-none" />

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
          <span className="signage text-white text-3xl tracking-[0.3em] uppercase mb-3 inline-flex items-center justify-center">
            <span>
              {welcomeText.split("").map((char, index) => (
                <span key={index} className="welcome-char opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="welcome-cursor w-[2px] h-[1em] bg-white ml-1 inline-block"></span>
          </span>
          <h2
            className="font-display font-extrabold text-6xl sm:text-8xl lg:text-[9rem] text-white max-w-4xl leading-none tracking-tighter uppercase flex items-center justify-center"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.2)" }}
          >
            <span>
              {darjeelingText.split("").map((char, index) => (
                <span key={index} className="darjeeling-char opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="darjeeling-cursor w-[6px] h-[0.9em] bg-white ml-2 inline-block"></span>
          </h2>
        </div>
      </div>
    </>
  );
}
