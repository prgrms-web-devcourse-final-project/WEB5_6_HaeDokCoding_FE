'use client';

import Image from 'next/image';
import Cocktailcup from '../../../../public/CocktailDrop.webp';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import PassBtn from './PassBtn';

gsap.registerPlugin(ScrollTrigger);

interface CocktailDropProps {
  isDesktop?: boolean;
}

function CocktailDrop({ isDesktop = false }: CocktailDropProps) {
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
      gsap.fromTo(
        logoRef.current,
        { y: -300, opacity: 0 },
        {
          y: !isDesktop ? -230 : -18, // 데스크톱이 아닐 때 더 위로
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
  }, [containerRef, isDesktop]);

  return (
    <div
      ref={containerRef}
      className="relative w-full lg:min-h-[110vh] min-h-[89vh] flex flex-col md:justify-center justify-end items-center mt-10 overflow-hidden"
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
      <div ref={logoRef} className="absolute md:w-115 w-85 md:h-90 h-40">
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
      <div className="md:relative absolute bottom-0">
        <Image
          src={Cocktailcup}
          alt="칵테일 컵"
          width={900}
          height={700}
          priority
          className="md:w-auto md:h-auto w-[500px] h-[400px] object-cover"
        />
      </div>
      <div className="absolute md:bottom-35 bottom-20 flex items-center justify-center z-3 w-full">
        <PassBtn />
      </div>
    </div>
  );
}

export default CocktailDrop;
