interface MobileHeaderProps {
  onSearch?: () => void;
  onProfile?: () => void;
}

/**
 * Compact top app-bar for the mobile experience.
 * Logo on the left, a cluster of ghost icon-buttons on the right (language, search, bell, profile).
 * Matches the reference mobile UI header.
 */
export default function MobileHeader({ onSearch, onProfile }: MobileHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 px-4 flex items-center justify-between bg-white/95 backdrop-blur-md border-b border-hairline">
      <a href="/" className="flex items-center font-bold text-[17px] tracking-tight leading-none">
        <span className="text-emerald-700">1</span>
        <span className="text-ink">Darjeeling</span>
      </a>

      <div className="flex items-center gap-1">
        <button className="h-9 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-semibold text-ink hover:bg-canvas-soft transition-colors" aria-label="Language">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5 0 4.5-4 4.5-9S14.5 3 12 3m0 18c-2.5 0-4.5-4-4.5-9S9.5 3 12 3M3.5 9h17M3.5 15h17" />
          </svg>
          EN
        </button>
        <button onClick={onSearch} className="h-9 w-9 rounded-full flex items-center justify-center text-ink hover:bg-canvas-soft transition-colors" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.9} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
          </svg>
        </button>
        <button className="h-9 w-9 rounded-full flex items-center justify-center text-ink hover:bg-canvas-soft transition-colors" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a24 24 0 0 0 5.454-1.31A8.97 8.97 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.97 8.97 0 0 1-2.311 6.022 24 24 0 0 0 5.454 1.31m6.714 0a3 3 0 1 1-5.714 0m5.714 0a24 24 0 0 1-5.714 0" />
          </svg>
        </button>
        <button onClick={onProfile} className="h-9 w-9 rounded-full flex items-center justify-center text-ink hover:bg-canvas-soft transition-colors" aria-label="Account">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="w-[19px] h-[19px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75c-2.676 0-5.216-.584-7.5-1.65Z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
