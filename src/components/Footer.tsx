export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-mist lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="signage text-[11px] text-marigold">
          Darjeeling — 2,050 m, end of the line
        </p>
        <h2 className="font-display mt-4 max-w-xl text-2xl leading-snug text-mist sm:text-3xl">
          Made in Darjeeling. Made for Darjeeling.
        </h2>
        <p className="mt-4 max-w-md text-sm text-mist/60">
          A guide built on the ridge — for the people arriving, and the
          people already here.
        </p>

        <div className="mt-12 flex flex-col gap-4 border-t border-mist/15 pt-6 text-xs text-mist/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 1darjeeling</span>
          <div className="flex gap-5">
            <a href="#attractions" className="hover:text-marigold">Attractions</a>
            <a href="#stays" className="hover:text-marigold">Stays</a>
            <a href="#routes" className="hover:text-marigold">Routes</a>
            <a href="#tips" className="hover:text-marigold">Tips</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
