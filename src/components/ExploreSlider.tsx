import { useEffect, useRef, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(3); // "Hotels" as default active
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const lastScrollTime = useRef(0);

  // Height of each item in pixels (matches CSS sizing)
  const itemHeight = 48;
  // Padding/offset to center the active item vertically in the display box (h-[368px] = 368px)
  const centerOffset = 160; // (368px - 48px) / 2

  useEffect(() => {
    if (listRef.current) {
      // Animate the list to center the active item
      gsap.to(listRef.current, {
        y: centerOffset - activeIndex * itemHeight,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate the custom scrollbar handle
      const progress = activeIndex / (items.length - 1);
      const trackHeight = 368; // track height
      const handleHeight = 48; // handle height
      const maxHandleY = trackHeight - handleHeight;

      gsap.to(handleRef.current, {
        y: progress * maxHandleY,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [activeIndex]);


  const selectIndex = (index: number) => {
    setActiveIndex(index);
    const targetSection = document.getElementById(items[index].id);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle mouse drag on the custom scrollbar and non-passive wheel scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      // Throttle scroll events to once every 150ms for smooth step scrolling
      if (now - lastScrollTime.current < 150) return;

      if (Math.abs(e.deltaY) > 4) {
        if (e.deltaY > 0) {
          setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
        } else {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        lastScrollTime.current = now;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = e.clientY - startY.current;
      const trackHeight = 368;
      const handleHeight = 48;
      const maxHandleY = trackHeight - handleHeight;
      const itemRange = items.length - 1;

      // Calculate new active index based on drag distance
      const changeInIndex = Math.round((deltaY / maxHandleY) * itemRange);
      const newIndex = Math.max(0, Math.min(itemRange, startScrollTop.current + changeInIndex));
      setActiveIndex(newIndex);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startScrollTop.current = activeIndex;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[406px] h-[439px] bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex items-center justify-between shadow-2xl select-none overflow-hidden"
    >
      {/* Left Section: Explore Link */}
      <a
        href={`#${items[activeIndex].id}`}
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
          className="absolute w-full flex flex-col items-start transition-all"
          style={{ transform: `translateY(${centerOffset}px)` }}
        >
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => selectIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{ height: `${itemHeight}px` }}
                className={`w-full text-left font-googlesansflex transition-all duration-300 ${
                  isActive
                    ? "text-white text-2xl sm:text-3xl font-semibold opacity-100 scale-105"
                    : "text-white/40 text-base sm:text-lg font-medium opacity-40 hover:opacity-70"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Section: Scroll Track and Handle */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-[368px] bg-white/5 rounded-full overflow-hidden z-30 pointer-events-auto">
        <div
          ref={handleRef}
          onMouseDown={onMouseDown}
          className="absolute w-full h-12 bg-white/30 hover:bg-white/50 rounded-full cursor-grab active:cursor-grabbing transition-colors"
        />
      </div>
    </div>
  );
}
