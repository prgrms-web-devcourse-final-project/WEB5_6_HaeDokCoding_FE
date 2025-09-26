'use client';

import { navItem } from '@/shared/utills/navigation';
import Image from 'next/image';
import Close from '@/shared/assets/icons/close_32.svg';
import User from '@/shared/assets/icons/user_24.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAuthStore } from '@/shared/@store/auth';
import { createPortal } from 'react-dom';
import { setPreLoginPath } from '../auth/utils/setPreLoginPath';

interface Props {
  isClicked: boolean;
  setIsClicked: (state: boolean) => void;
  visible: boolean;
  setVisible: (state: boolean) => void;
}

function DropdownMenu({ isClicked, setIsClicked, visible, setVisible }: Props) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const [mounted, setMounted] = useState(false);

  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (!tlRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setVisible(false);
        },
      });

      tl.fromTo(
        menuRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'expo.inOut' }
      );

      tlRef.current = tl;
    }

    if (isClicked) {
      setVisible(true);
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }

    return () => {
      // tl.kill();
    };
  }, [isClicked]);

  if (!mounted) return null;

  // const handleMouseEnter = (index: number) => {
  //   const el = textRef.current[index];
  //   if (!el) return;
  //   gsap.to(el, {
  //     y: -5,
  //     duration: 0.3,
  //     ease: 'power1.out',
  //   });
  // };

  // const handleMouseLeave = (index: number) => {
  //   const el = textRef.current[index];
  //   if (!el) return;
  //   gsap.to(el, {
  //     y: 0,
  //     duration: 0.3,
  //     ease: 'power1.out',
  //   });
  // };

  return createPortal(
    <nav
      className={`w-full h-full z-1000 bg-secondary absolute top-0 left-0 px-[12px] font-serif block sm:hidden ${visible ? 'block' : 'hidden'} `}
      role="navigation"
      aria-label="메인 네비게이션 메뉴"
      tabIndex={-1}
      id="mobile-dropdown-menu"
      ref={menuRef}
    >
      <div className="flex items-center h-[44px] w-full justify-center">
        <Image
          src="/logoDark.svg"
          alt="Ssoul 로고"
          width={82}
          height={26}
          className="w-[62px] md:w-[82px] h-auto"
        />
      </div>
      <ul className="flex flex-col gap-[12px] text-black px-2 my-5">
        {navItem.map(({ label, href }, idx) => (
          <li
            className={`font-normal transition-colors duration-300 ease-in-out ${pathname === href ? 'pl-1' : 'px-3 py-[12px]'}`}
            key={href}
          >
            <Link
              href={href}
              onNavigate={() => setIsClicked(false)}
              className={`items-start ${pathname === href ? 'bg-tertiary/70 inline-flex pr-5 p-2 rounded-md text-secondary' : 'hover:text-black/70 flex'}`}
              aria-current={pathname === href ? 'page' : undefined}
            >
              <span className="text-[20px] mr-3">{idx + 1}. </span>
              <span
                className="text-[28px]"
                ref={(el) => {
                  textRef.current[idx] = el;
                }}
                // onMouseEnter={() => handleMouseEnter(idx)}
                // onMouseLeave={() => handleMouseLeave(idx)}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="border border-t-[1px] border-t-gray flex items-center py-[32px] gap-2">
        {isLoggedIn ? (
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 text-black font-light text-xl hover:text-black/70"
          >
            <User color="var(--color-primary)" aria-hidden />
            <span>로그아웃</span>
          </button>
        ) : (
          <Link
            href="/login"
            onNavigate={async () => {
              setIsClicked(false);
              await setPreLoginPath(window.location.pathname);
            }}
            className="flex items-center gap-2 text-black font-light text-xl hover:text-black/70"
          >
            <User color="var(--color-primary)" aria-hidden />
            <span>로그인/회원가입</span>
          </Link>
        )}
      </div>

      <div className="absolute top-1.5 left-3">
        <button
          type="button"
          aria-label="메인 네비게이션 메뉴 닫기"
          onClick={() => {
            setIsClicked(false);
          }}
        >
          <Close color="var(--color-primary)" className="w-8 h-8" aria-hidden />
        </button>
      </div>
    </nav>,
    document.body
  );
}

export default DropdownMenu;
