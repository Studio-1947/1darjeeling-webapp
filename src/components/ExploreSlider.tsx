import { useEffect, useRef, useState, useCallback } from "react";
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

export default function ExploreSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollIndex = useRef(0);
  const lastScrollTime = useRef(0);

  // Height of each item in pixels
  const itemHeight = 48;
  // Center offset within the visible area (h-[368px])
  const centerOffset = 160;

  // Animate list position and scrollbar handle when activeIndex changes
  useEffect(() => {
    if (listRef.current) {
      gsap.to(listRef.current, {
        y: centerOffset - activeIndex * itemHeight,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    if (handleRef.current) {
      const progress = activeIndex / (items.length - 1);
      const trackHeight = 368;
      const handleHeight = 48;
      const maxHandleY = trackHeight - handleHeight;

      gsap.to(handleRef.current, {
        y: progress * maxHandleY,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);

  // Navigate to section by its id
  const navigateToSection = useCallback((sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Select an item by index and navigate
  const selectIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      navigateToSection(items[index].id);
    },
    [navigateToSection]
  );

  // Handle wheel scroll within the slider to step through items
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only intercept if the scroll is primarily vertical and large enough
      if (Math.abs(e.deltaY) < 4) return;

      // Stop the event from bubbling up to parent scroll handlers
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastScrollTime.current < 200) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    // Touch support for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) < 20) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 250) return;
      lastScrollTime.current = now;
      touchStartY = e.touches[0].clientY;

      if (deltaY > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Handle drag on scrollbar handle
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.clientY - startY.current;
      const trackHeight = 368;
      const handleHeight = 48;
      const maxHandleY = trackHeight - handleHeight;
      const itemRange = items.length - 1;

      const changeInIndex = Math.round((deltaY / maxHandleY) * itemRange);
      const newIndex = Math.max(
        0,
        Math.min(itemRange, startScrollIndex.current + changeInIndex)
      );
      setActiveIndex(newIndex);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const onHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollIndex.current = activeIndex;
    document.body.style.cursor = "grabbing";
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[406px] h-[439px] bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex items-center justify-between shadow-2xl select-none overflow-hidden pointer-events-auto"
    >
      {/* Left Section: Explore Link */}
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

      {/* Middle Section: Vertical Items List */}
      <div className="relative h-[368px] w-48 overflow-hidden pointer-events-auto">
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/20 to-transparent z-10 pointer-events-none" />

        <div
          ref={listRef}
          className="absolute w-full flex flex-col items-start"
          style={{ transform: `translateY(${centerOffset}px)` }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => selectIndex(idx)}
                style={{ height: `${itemHeight}px` }}
                className={`w-full text-left font-googlesansflex text-lg sm:text-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "text-sky-300 opacity-100"
                    : "text-white/40 opacity-40 hover:opacity-70"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Section: Scroll Track and Handle */}
      <div
        className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-[368px] bg-white/10 rounded-full overflow-hidden z-30 pointer-events-auto cursor-pointer"
        onClick={(e) => {
          // Click on track to jump to that position
          const rect = e.currentTarget.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const progress = clickY / rect.height;
          const newIndex = Math.round(progress * (items.length - 1));
          setActiveIndex(Math.max(0, Math.min(items.length - 1, newIndex)));
        }}
      >
        <div
          ref={handleRef}
          onMouseDown={onHandleMouseDown}
          className="absolute w-full h-12 bg-white/40 hover:bg-white/60 rounded-full cursor-grab active:cursor-grabbing transition-colors"
        />
      </div>
    </div>
  );
}
