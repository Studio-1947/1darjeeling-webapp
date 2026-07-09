import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import MobileTabs from './MobileTabs';
import type { MobileCategory } from './MobileTabs';
import MobileBottomNav from './MobileBottomNav';
import type { MobileNavKey } from './MobileBottomNav';
import HomeFeed from './screens/HomeFeed';
import DriversScreen from './screens/DriversScreen';
import RoutesScreen from './screens/RoutesScreen';
import AttractionsScreen from './screens/AttractionsScreen';
import CultureScreen from './screens/CultureScreen';

/**
 * Root of the mobile-only experience. Renders below the `md` breakpoint.
 * Owns the two navigation dimensions from the reference UI:
 *   - top pill tabs (category screens)
 *   - bottom app nav (Home / Search / Explore / Culture)
 */
export default function MobileHome() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<MobileCategory>('stays');
  const [nav, setNav] = useState<MobileNavKey>('home');
  const [search, setSearch] = useState('');

  const handleCategory = (cat: MobileCategory) => {
    setCategory(cat);
    setSearch('');
    // Keep the bottom nav in sync with the screens it overlaps.
    if (cat === 'culture') setNav('culture');
    else if (cat === 'attractions') setNav('explore');
    else setNav('home');
  };

  const handleNav = (key: MobileNavKey) => {
    setNav(key);
    if (key === 'home') setCategory('stays');
    else if (key === 'explore') setCategory('attractions');
    else if (key === 'culture') setCategory('culture');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpen = (id: string) => {
    // Stay listings route to the detail page; others are wired as screens land.
    if (id.startsWith('stay-')) navigate(`/stay/${id.replace('stay-', '')}`);
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <MobileHeader />
      <MobileTabs active={category} onChange={handleCategory} />

      <main className="pt-[104px] pb-20">
        {category === 'stays' && (
          <HomeFeed search={search} onSearchChange={setSearch} onOpen={handleOpen} />
        )}
        {category === 'drivers' && (
          <DriversScreen />
        )}
        {category === 'routes' && (
          <RoutesScreen onSwitchTab={handleCategory} />
        )}
        {category === 'attractions' && (
          <AttractionsScreen />
        )}
        {category === 'culture' && (
          <CultureScreen />
        )}
      </main>

      <MobileBottomNav active={nav} onChange={handleNav} />
    </div>
  );
}
