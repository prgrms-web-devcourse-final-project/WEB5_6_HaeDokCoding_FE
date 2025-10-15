'use client';

import Image from 'next/image';
import Cocktailcup from '../../../../public/CocktailDrop.webp';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

function CocktailDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 양쪽 대각선 줄 들어오기 (line1, line2)
      gsap.fromTo(
        [line1Ref.current, line2Ref.current],
        {
          x: (i) => (i === 0 ? '-100%' : '100%'),
          opacity: 0,
        },
        {
          x: '0%',
          opacity: 1,
          ease: 'power4.out',
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
            toggleActions: 'restart none none none',
            once: false,
          },
        }
      );

      // 로고 위에서 아래로 자연스럽게 등장
      const isMobile = window.innerWidth < 768;
      gsap.fromTo(
        logoRef.current,
        { y: -300, opacity: 0 },
        {
          y: isMobile ? -140 : -40, // 모바일에서는 더 위로
          opacity: 1,
          duration: 3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            toggleActions: 'restart none none none',
            once: false,
          },
        }
      );
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full md:min-h-[110vh] min-h-[74vh] flex flex-col md:justify-center justify-end items-center mt-10 overflow-hidden"
      id="scroll-fixed"
    >
      {/* 대각선 줄 1 */}
      <div
        ref={line1Ref}
        className="absolute md:top-[100px] top-[75px] left-[-50%] w-[200%] md:h-[80px] h-[50px] bg-secondary/80 rotate-[8deg] z-10"
      />
      {/* 대각선 줄 2 */}
      <div
        ref={line2Ref}
        className="absolute md:top-[200px] top-[150px] left-[-50%] w-[200%] md:h-[80px] h-[50px] bg-secondary rotate-[8deg] z-10"
      />

      {/* 로고 */}
      <div ref={logoRef} className="absolute z-20 md:w-115 w-65 md:h-90 h-40">
        <Image
          src="/logo.svg"
          alt="로고 이미지"
          className="rotate-[-9deg]"
          fill
          priority
          // style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      <div className="w-full md:h-90 h-30"></div>

      {/* 컵 이미지 - 모바일에서 바닥에 붙도록 */}
      <div className="z-10 md:relative absolute bottom-0">
        <Image
          src={Cocktailcup}
          alt="칵테일 컵"
          width={900}
          height={800}
          priority
          style={{ width: 'auto', height: 'auto' }}
          className="md:w-auto md:h-auto w-[300px] h-[300px] object-contain"
        />
      </div>
    </div>
  );
}

export default CocktailDrop;
