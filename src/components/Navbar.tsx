/* import { useEffect, useState } from "react";

const links = [
  { href: "#attractions", label: "Attractions" },
  { href: "#stays", label: "Stays" },
  { href: "#routes", label: "Routes" },
  { href: "#produce", label: "Produce" },
  { href: "#culture", label: "Culture" },
  { href: "#tips", label: "Tips" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroSection = document.getElementById("top");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Scrolled past the Hero section when its bottom is above the navbar height
        setScrolled(rect.bottom <= 70);
      } else {
        setScrolled(window.scrollY > window.innerHeight);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          className={`font-display text-xl tracking-tight transition-colors duration-300 ${
            scrolled ? "text-black font-semibold" : "text-white font-semibold"
          }`}
        >
          1darjeeling
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`signage text-sm transition-colors duration-300 ${
                  scrolled ? "text-black hover:text-black" : "text-white hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`signage text-xs transition-colors duration-300 md:hidden ${
            scrolled ? "text-black" : "text-white"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className={`flex flex-col gap-1 border-t px-6 pb-4 md:hidden ${
          scrolled ? "bg-white border-black/10 text-black" : "bg-black/90 border-white/10 text-white"
        }`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={`signage block py-2 text-sm ${
                  scrolled ? "text-black/80" : "text-white/80"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
 */