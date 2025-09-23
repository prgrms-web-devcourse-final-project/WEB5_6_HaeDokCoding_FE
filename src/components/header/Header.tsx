'use client';

import { usePathname } from 'next/navigation';
import HeaderBtn from './HeaderBtn';
import HeaderLogo from './HeaderLogo';
import NavItem from './NavItem';
import HamburgerMenu from './HamburgerMenu';
import { useEffect, useRef, useState } from 'react';
import tw from '@/shared/utills/tw';

function Header() {
  const pathname = usePathname();

  const [showShadow, setShowShadow] = useState(true);

  const [lastScrollTop, setLastScrollTop] = useState(0); // 마지막 스크롤 위치 저장
  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      console.log(currentScrollTop, lastScrollTop);

      if (Math.abs(currentScrollTop - lastScrollTop) < -5) return;

      if (currentScrollTop > lastScrollTop) {
        // 유저가 아래로 스크롤 -> 헤더 숨기기
        if (headerRef.current) {
          headerRef.current.style.top = '-60px';
          setShowShadow(false);
        }
      } else {
        // 유저가 위로 스크롤 -> 헤더 다시 보이기
        if (headerRef.current) {
          headerRef.current.style.top = '0';
          setShowShadow(true);
        }
      }

      setLastScrollTop(currentScrollTop); // 마지막 위치 갱신
    };

    window.addEventListener('scroll', handleScroll);

    // 클린업 함수
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <header
      className={tw(
        `bg-primary w-full h-[60px] flex items-center justify-between px-[12px] fixed top-0 left-0 z-50 transition-all duration-300`,
        showShadow && 'shadow-header'
      )}
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
