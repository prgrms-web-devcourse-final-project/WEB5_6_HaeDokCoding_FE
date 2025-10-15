'use client';

import { usePathname } from 'next/navigation';
import HeaderBtn from './HeaderBtn';
import HeaderLogo from './HeaderLogo';
import NavItem from './NavItem';
import HamburgerMenu from './HamburgerMenu';
import { useEffect, useState } from 'react';
import tw from '@/shared/utills/tw';
import { useWindowScroll } from 'react-use';

interface Props {
  className?: string;
  isMain?: boolean;
}

function Header({ className, isMain = false }: Props) {
  const pathname = usePathname();
  const [showShadow, setShowShadow] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0); // 마지막 스크롤 위치 저장
  const [visible, setVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'none'>('none');

  const { y } = useWindowScroll();

  useEffect(() => {
    const diff = y - lastScrollTop;
    if (Math.abs(diff) < 5) return; // 10px 이하는 무시하도록 너무 민감하게 하는것도 안좋음

    if (diff > 0 && y > 30) {
      // 유저가 아래로 스크롤 -> 헤더 숨기기
      setVisible(false);
      setShowShadow(false);
      setScrollDirection('down');
    } else if (diff < 0) {
      // 유저가 위로 스크롤 -> 헤더 다시 보이기
      setVisible(true);
      setShowShadow(true);
      setScrollDirection('up');
    }

    if (y <= 10) {
      setVisible(true);
      setShowShadow(false);
      setScrollDirection('none');
      return;
    }

    if (y <= 10) {
      setVisible(true);
      setShowShadow(false);
      return;
    }

    setLastScrollTop(y); // 마지막 위치 갱신
  }, [lastScrollTop, y]);

  return (
    <header
      className={tw(
        visible ? 'translate-y-0' : 'md:-translate-y-[60px] -translate-y-[44px]',
        'w-full h-[44px] md:h-[60px] flex items-center justify-between px-[12px] fixed top-0 left-0 z-50 transition-transform duration-200 ease-in-out',
        // 메인 페이지에서는 스크롤 시에만 배경색과 쉐도우 적용
        isMain ? (y > 10 ? 'bg-primary!' : 'bg-transparent') : 'bg-primary',
        // 메인 페이지에서는 위로 스크롤할 때만 쉐도우 적용
        isMain
          ? y > 10 && scrollDirection === 'up'
            ? 'shadow-header'
            : ''
          : showShadow && 'shadow-header',
        className
      )}
    >
      <HamburgerMenu />
      <HeaderLogo />
      <NavItem
        pathname={pathname}
        className="hidden sm:block sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
      />
      <HeaderBtn pathname={pathname} />
    </header>
  );
}

export default Header;
