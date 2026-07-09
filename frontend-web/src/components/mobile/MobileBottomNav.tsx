import type { ReactNode } from 'react';

export type MobileNavKey = 'home' | 'search' | 'explore' | 'culture';

interface MobileBottomNavProps {
  active: MobileNavKey;
  onChange: (key: MobileNavKey) => void;
}

const items: { key: MobileNavKey; label: string; icon: ReactNode }[] = [
  {
    key: 'home',
    label: 'Home',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
    ),
  },
  {
    key: 'search',
    label: 'Search',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
    ),
  },
  {
    key: 'explore',
    label: 'Explore',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z" />
    ),
  },
  {
    key: 'culture',
    label: 'Culture',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9c0 1.657-.895 3-2 3s-2-1.343-2-3 .895-3 2-3M9 9h6m0 0V4.5M15 9c0 1.657.895 3 2 3s2-1.343 2-3-.895-3-2-3M6 21h12M9 12v9m6-9v9" />
    ),
  },
];

/**
 * Fixed bottom navigation bar, app-level. Matches the reference mobile UI.
 */
export default function MobileBottomNav({ active, onChange }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-hairline pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch h-16">
        {items.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-emerald-700' : 'text-mute'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={isActive ? 2 : 1.7} stroke="currentColor" className="w-5 h-5">
                {item.icon}
              </svg>
              <span className={`text-[10.5px] ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
