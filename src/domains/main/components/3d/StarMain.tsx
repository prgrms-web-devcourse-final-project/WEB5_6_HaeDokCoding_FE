'use client';

import { useEffect, useRef } from 'react';
import foreStar from '../../../../../public/1star.webp';
import backStar from '../../../../../public/2star.webp';
import gsap from 'gsap';

function StarMain() {
  const background = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!background.current || !foreground.current) return;

    const bgX = gsap.quickSetter(background.current, 'x', 'px');
    const bgY = gsap.quickSetter(background.current, 'y', 'px');
    const bgRotate = gsap.quickSetter(background.current, 'rotate', 'deg');

    const fgX = gsap.quickSetter(foreground.current, 'x', 'px');
    const fgY = gsap.quickSetter(foreground.current, 'y', 'px');
    const fgRotate = gsap.quickSetter(foreground.current, 'rotate', 'deg');

    const update = () => {
      const { x, y } = mouse.current;

      bgX(x * -1);
      bgY(y * -1);
      bgRotate(x * -0.1);

      fgX(x * 1);
      fgY(y * 1);
      fgRotate(y * 0.2);

      rafId.current = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // 화면 중앙 기준으로 얼마나 벗어났는지 (-1 ~ 1 범위)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.current = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = (touch.clientX / window.innerWidth - 0.5) * 2;
      const y = (touch.clientY / window.innerHeight - 0.5) * 2;
      mouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* 배경 별 레이어 (뒤쪽) - 반복 패턴 */}
      <div
        className="absolute inset-0 w-full h-full"
        ref={background}
        style={{
          backgroundImage: `url(${backStar.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          backgroundPosition: '0 0',
          opacity: 0.8,
        }}
      />

      {/* 전경 별 레이어 (앞쪽) - 반복 패턴 */}
      <div
        className="absolute inset-0 w-full h-full"
        ref={foreground}
        style={{
          backgroundImage: `url(${foreStar.src})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '150px 150px',
          backgroundPosition: '50px 50px',
          opacity: 0.9,
        }}
      />
    </div>
  );
}

export default StarMain;
