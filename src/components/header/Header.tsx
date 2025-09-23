'use client';

import { usePathname } from 'next/navigation';
import HeaderBtn from './HeaderBtn';
import HeaderLogo from './HeaderLogo';
import NavItem from './NavItem';
import HamburgerMenu from './HamburgerMenu';

function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-primary w-full h-[60px] flex items-center justify-between px-[12px] relative">
      <HamburgerMenu />
      <HeaderLogo />
      <NavItem pathname={pathname} className="sm:block hidden" />
      <HeaderBtn pathname={pathname} />
    </header>
  );
}

export default Header;
