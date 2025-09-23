'use client';

import Arrow from '@/shared/assets/icons/arrow_up_24.svg';
import { useEffect, useRef } from 'react';

function ScrollTopBtn() {
  const animationRef = useRef<number | null>(null);

  // scrollTop 버튼 클릭 시
  const scrollToTop = () => {
    const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 0) {
      animationRef.current = requestAnimationFrame(scrollToTop);
      window.scrollTo(0, currentPosition - currentPosition / 8);
    }
  };

  // 사용자 스크롤 시 애니메이션 취소
  useEffect(() => {
    const cancelScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    window.addEventListener('wheel', cancelScroll, { passive: true });
    window.addEventListener('touchstart', cancelScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', cancelScroll);
      window.removeEventListener('touchstart', cancelScroll);
    };
  }, []);

  // if (!isVisible) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <button
        type="button"
        aria-label="최상단으로 스크롤 이동"
        onClick={scrollToTop}
        className="flex-center w-10 h-10 shadow-[0_4px_12px_0_rgba(255,255,255,0.2)] bg-secondary rounded-full"
      >
        <Arrow aria-hidden />
      </button>
    </div>
  );
}
export default ScrollTopBtn;
