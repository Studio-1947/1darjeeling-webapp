import { useEffect, useRef, useState, useCallback, type PointerEvent } from "react";
import { gsap } from "../lib/gsap";

const items = [
  { name: "Offbeat Areas", id: "attractions" },
  { name: "Homestays", id: "stays" },
  { name: "Cafes", id: "stays" },
  { name: "Hotels", id: "stays" },
  { name: "Taxy Drivers", id: "routes" },
  { name: "Culture", id: "culture" },
  { name: "Fruits", id: "produce" },
  { name: "Routes", id: "routes" },
];

const ITEM_HEIGHT = 48;
const TRACK_HEIGHT = 320;
const HANDLE_HEIGHT = 44;
const CENTER_OFFSET = 160;

export default function ExploreSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartIndex = useRef(0);
  const lastWheelTime = useRef(0);

  const maxHandleY = TRACK_HEIGHT - HANDLE_HEIGHT;
  const indexRange = items.length - 1;

  useEffect(() => {
    if (isDragging.current) return;
    const targetListY = CENTER_OFFSET - activeIndex * ITEM_HEIGHT;
    if (listRef.current) {
      gsap.to(listRef.current, { y: targetListY, duration: 0.45, ease: "power3.out" });
    }
    if (handleRef.current) {
      const progress = activeIndex / indexRange;
      gsap.to(handleRef.current, { y: progress * maxHandleY, duration: 0.45, ease: "power3.out" });
    }
  }, [activeIndex, maxHandleY]);

  const navigateToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const selectIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      navigateToSection(items[index].id);
    },
    [navigateToSection]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault();
      e.stopPropagation();
      const now = Date.now();
      if (now - lastWheelTime.current < 180) return;
      lastWheelTime.current = now;
      setActiveIndex((prev) =>
        e.deltaY > 0 ? Math.min(prev + 1, indexRange) : Math.max(prev - 1, 0)
      );
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const delta = touchStartY - e.touches[0].clientY;
      if (Math.abs(delta) < 20) return;
      const now = Date.now();
      if (now - lastWheelTime.current < 220) return;
      lastWheelTime.current = now;
      touchStartY = e.touches[0].clientY;
      setActiveIndex((prev) =>
        delta > 0 ? Math.min(prev + 1, indexRange) : Math.max(prev - 1, 0)
      );
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const onTrackPointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      const rawY = e.clientY - rect.top - HANDLE_HEIGHT / 2;
      const clampY = Math.max(0, Math.min(maxHandleY, rawY));
      const startIndex = Math.round((clampY / maxHandleY) * indexRange);

      e.currentTarget.setPointerCapture(e.pointerId);
      isDragging.current = true;
      dragStartY.current = e.clientY;
      dragStartIndex.current = startIndex;

      if (handleRef.current) gsap.set(handleRef.current, { y: clampY });
      if (listRef.current) gsap.set(listRef.current, { y: CENTER_OFFSET - startIndex * ITEM_HEIGHT });
      setActiveIndex(startIndex);
    },
    [maxHandleY]
  );

  const onTrackPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      e.preventDefault();

      const deltaY = e.clientY - dragStartY.current;
      const rawY = (dragStartIndex.current / indexRange) * maxHandleY + deltaY;
      const clampY = Math.max(0, Math.min(maxHandleY, rawY));
      const newIndex = Math.max(0, Math.min(indexRange, Math.round((clampY / maxHandleY) * indexRange)));

      if (handleRef.current) gsap.set(handleRef.current, { y: clampY });
      if (listRef.current) gsap.set(listRef.current, { y: CENTER_OFFSET - newIndex * ITEM_HEIGHT });

      setActiveIndex(newIndex);
    },
    [maxHandleY]
  );

  const endDrag = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }

      if (handleRef.current) {
        const progress = activeIndex / indexRange;
        gsap.to(handleRef.current, { y: progress * maxHandleY, duration: 0.25, ease: "power2.out" });
      }

      if (activeIndex !== dragStartIndex.current) {
        navigateToSection(items[activeIndex].id);
      }
    },
    [activeIndex, maxHandleY, navigateToSection]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-[406px] h-[439px] bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex items-center justify-between shadow-2xl select-none overflow-hidden pointer-events-auto"
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          navigateToSection(items[activeIndex].id);
        }}
        className="group flex items-center gap-2 text-white font-googlesansflex text-xl sm:text-2xl font-medium tracking-wide transition-all duration-300 hover:text-sky-300"
      >
        <span>Explore</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
          &rarr;
        </span>
      </a>

      <div className="relative h-[368px] w-48 overflow-hidden pointer-events-auto">
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-slate-950/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950/30 to-transparent z-10 pointer-events-none" />

        <div
          ref={listRef}
          className="absolute w-full flex flex-col items-start"
          style={{ transform: `translateY(${CENTER_OFFSET}px)` }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => selectIndex(idx)}
                style={{ height: `${ITEM_HEIGHT}px` }}
                className={`w-full text-left font-googlesansflex text-lg sm:text-xl font-medium transition-all duration-300 ${
                  isActive ? "text-sky-300 opacity-100" : "text-white/40 opacity-40 hover:opacity-70"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onTrackPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        style={{ height: `${TRACK_HEIGHT}px`, touchAction: "none" }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-[10px] bg-white/10 rounded-full z-30 pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        <div
          className="absolute inset-x-0 top-0 bg-white/20 rounded-full pointer-events-none"
          style={{ height: `${(activeIndex / indexRange) * TRACK_HEIGHT}px` }}
        />

        <div
          ref={handleRef}
          style={{ height: `${HANDLE_HEIGHT}px` }}
          className="absolute inset-x-0 top-0 bg-white/50 hover:bg-white/70 active:bg-sky-300/80 rounded-full transition-colors duration-150 shadow-lg pointer-events-none"
        />
      </div>
    </div>
  );
}