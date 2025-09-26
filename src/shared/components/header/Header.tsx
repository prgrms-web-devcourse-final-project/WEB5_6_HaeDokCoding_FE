'use client';

import { usePathname } from 'next/navigation';
import HeaderBtn from './HeaderBtn';
import HeaderLogo from './HeaderLogo';
import NavItem from './NavItem';
import HamburgerMenu from './HamburgerMenu';
import { useEffect, useState } from 'react';
import tw from '@/shared/utills/tw';
import { useWindowScroll } from 'react-use';

function Header() {
  const pathname = usePathname();
  const [showShadow, setShowShadow] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0); // 마지막 스크롤 위치 저장
  const [visible, setVisible] = useState(true);

  const { y } = useWindowScroll();

  useEffect(() => {
    const diff = y - lastScrollTop;
    if (Math.abs(diff) < 10) return; // 10px 이하는 무시하도록 너무 민감하게 하는것도 안좋음

    if (diff > 0) {
      // 유저가 아래로 스크롤 -> 헤더 숨기기
      setVisible(false);
      setShowShadow(false);
    } else if (diff < 0) {
      // 유저가 위로 스크롤 -> 헤더 다시 보이기
      setVisible(true);
      setShowShadow(true);
    }

    setLastScrollTop(y); // 마지막 위치 갱신
  }, [lastScrollTop, y]);

  return (
    <header
      className={tw(
        `bg-primary w-full h-[44px] md:h-[60px] flex items-center justify-between px-[12px] fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-out`,
        showShadow && 'shadow-header',
        visible ? 'translate-y-0' : 'md:-translate-y-[60px] -translate-y-[44px]'
      )}
    >
      <HamburgerMenu />
      <HeaderLogo />
      <NavItem pathname={pathname} className="sm:block hidden" />
      <HeaderBtn pathname={pathname} />
    </header>
  );
}

export default Header;
