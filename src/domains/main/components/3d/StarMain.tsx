'use client';

import Image from 'next/image';
import foreStar from '../../../../../public/1Stars.webp';
import backStar from '../../../../../public/2Stars.webp';
import { useEffect, useRef } from 'react';
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

      bgX(x * -2);
      bgY(y * -2);
      bgRotate(x * -0.2);

      fgX(x * 3);
      fgY(y * 3);
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
    <>
      {/* <HomeBackground /> */}
      <div>
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
          <div
            ref={background}
            className="absolute w-full h-full top-0 left-0 will-change-transform"
          >
            <Image
              src={foreStar}
              alt="앞쪽 별"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
          <div ref={foreground} className="fixed w-full h-full top-0 left-0  will-change-transform">
            <Image
              src={backStar}
              alt="뒤쪽 별"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default StarMain;
