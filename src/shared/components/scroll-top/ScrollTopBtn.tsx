'use client';

import Arrow from '@/shared/assets/icons/arrow_up_24.svg';
import { throttle } from '@/shared/utills/throttle';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollToPlugin);

function ScrollTopBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false); // 실제로 렌더링 여부
  const buttonRef = useRef<HTMLButtonElement>(null);

  // scrollTop 버튼 클릭 시 - GSAP으로 자연스러운 스크롤 애니메이션
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 2.2,
      scrollTo: { y: 0, autoKill: false },
      ease: 'power2.out',
    });
  };

  // 버튼 나타나기/사라지기 애니메이션
  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        setShouldRender(true); // 먼저 렌더링되게 함
        // 나타날 때 애니메이션
        gsap.fromTo(
          buttonRef.current,
          { scale: 0, opacity: 0, y: 80 },
          { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'back.out(1.7)' }
        );
      } else {
        // 사라질 때 애니메이션
        gsap.to(buttonRef.current, {
          scale: 0,
          opacity: 0,
          y: 80,
          duration: 1.0,
          ease: 'back.in(1.7)',
          onComplete: () => {
            setShouldRender(false); // 애니메이션 끝난 뒤 렌더링 제거
          },
        });
      }
    }
  }, [isVisible]);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      setIsVisible(currentScroll > 30);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleScroll);
    };
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <button
        ref={buttonRef}
        type="button"
        aria-label="최상단으로 스크롤 이동"
        onClick={scrollToTop}
        className="flex-center w-10 h-10 shadow-[0_4px_12px_0_rgba(0,0,0,0.5)] bg-secondary rounded-full"
        style={{ display: isVisible ? 'flex' : 'none' }}
      >
        <Arrow color="var(--color-primary)" aria-hidden />
      </button>
    </div>
  );
}
export default ScrollTopBtn;
