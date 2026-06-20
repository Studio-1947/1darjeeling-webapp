import { useEffect, useState } from "react";

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
  const [showNavbar, setShowNavbar] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowNavbar(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        showNavbar ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
      } ${
        scrolled ? "bg-mist/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="font-display text-xl tracking-tight text-tea">
          1darjeeling
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="signage text-xs text-tea/70 transition-colors hover:text-rust"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="signage text-xs text-tea md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-tea/10 bg-mist px-6 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="signage block py-2 text-sm text-tea/80"
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
