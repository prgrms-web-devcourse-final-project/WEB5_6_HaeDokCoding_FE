'use client';

import { usePathname } from 'next/navigation';
import HeaderBtn from './HeaderBtn';
import HeaderLogo from './HeaderLogo';
import NavItem from './NavItem';
import HamburgerMenu from './HamburgerMenu';
import { useEffect, useRef } from 'react';

function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = document.getElementById('observer-target');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!headerRef.current) return;

        // 요소가 화면에 보이는지 아닌지 판단
        if (!entry.isIntersecting) {
          // 아니면
          headerRef.current.classList.add('scroll-down');
        } else {
          // 맞으면
          headerRef.current.classList.remove('scroll-down');
        }
      },
      {
        threshold: 0, // 0이면 한 픽셀이라도 보이면 isIntersecting가 true
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="bg-primary w-full h-[60px] flex items-center justify-between px-[12px] fixed top-0 left-0 z-50 transition-all duration-300"
      ref={headerRef}
    >
      <HamburgerMenu />
      <HeaderLogo />
      <NavItem pathname={pathname} className="sm:block hidden" />
      <HeaderBtn pathname={pathname} />
    </header>
  );
}

export default Header;
