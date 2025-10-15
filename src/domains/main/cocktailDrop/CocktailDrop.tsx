'use client';

import Image from 'next/image';
import Cocktailcup from '../../../../public/CocktailDrop_4x.webp';
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
            // markers: true, // ✅ 디버
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
          y: -40,
          opacity: 1,
          duration: 3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            // markers: true, // ✅ 디버
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
      className="relative w-full min-h-[110vh] flex flex-col justify-center items-center mt-10"
      id="scroll-fixed"
    >
      {/* 대각선 줄 1 */}
      <div
        ref={line1Ref}
        className="absolute top-[80px] left-[-50%] w-[200%] h-[40px] bg-secondary/80 rotate-[8deg] z-10"
      />
      {/* 대각선 줄 2 */}
      <div
        ref={line2Ref}
        className="absolute top-[140px] left-[-50%] w-[200%] h-[40px] bg-secondary rotate-[8deg] z-10"
      />

      {/* 로고 */}
      <div ref={logoRef} className="absolute z-20">
        <Image
          src="/logo.svg"
          alt="로고 이미지"
          width={600}
          height={600}
          className="rotate-[-9deg]"
        />
      </div>

      <div className="w-full h-90"></div>

      {/* 컵 이미지 */}
      <div className="z-10">
        <Image src={Cocktailcup} alt="칵테일 컵" width={800} height={800} priority />
      </div>
    </div>
  );
}

export default CocktailDrop;
