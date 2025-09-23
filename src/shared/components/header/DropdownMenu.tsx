import { navItem } from '@/shared/utills/navigation';
import Image from 'next/image';
import Close from '@/shared/assets/icons/close_32.svg';
import User from '@/shared/assets/icons/user_24.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  isClicked: boolean;
  setIsClicked: (state: boolean) => void;
}

function DropdownMenu({ isClicked, setIsClicked }: Props) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isClicked) {
      gsap.fromTo(
        menuRef.current,
        {
          x: -200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.inOut',
        }
      );
    }
  }, [isClicked]);

  const handleMouseEnter = (index: number) => {
    const el = textRef.current[index];
    if (!el) return;
    gsap.to(el, {
      y: -5,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const el = textRef.current[index];
    if (!el) return;
    gsap.to(el, {
      y: 0,
      duration: 0.3,
      ease: 'power1.out',
    });
  };

  return (
    <div
      className="w-full h-screen bg-secondary absolute top-0 left-0 px-[12px] font-serif block sm:hidden"
      role="menu"
      aria-label="메인 네비게이션 메뉴"
      tabIndex={-1}
      id="mobile-dropdown-menu"
      ref={menuRef}
    >
      <div className="flex items-center h-[44px] w-full justify-center">
        <Image
          src="/logoDark.svg"
          alt="Ssoul 로고"
          width={60}
          height={19}
          className="md:w-[82px] sm:h-[26px]"
        />
      </div>
      <div className="my-5">
        <ul className="flex flex-col gap-[12px] text-black px-2">
          {navItem.map(({ label, href }, idx) => (
            <li className={`font-normal ${pathname === href ? '' : 'px-3 py-[12px]'}`} key={href}>
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
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                >
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-t-[1px] border-t-gray flex py-[32px] gap-4">
        <User width={32} height={32} />
        <button type="button" className="text-black font-light text-xl hover:text-black/70">
          로그인/회원가입
        </button>
      </div>
      <div className="absolute top-1.5 left-3">
        <button
          type="button"
          onClick={() => {
            setIsClicked(false);
          }}
        >
          <Close stroke={'black'} className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
