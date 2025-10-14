'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import MainSlideAbv from './MainSlideAbv';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileSlide from './mobile/MobileSlide';
import MainSlideIntro from './MainSlideIntro';
import MainSlideTest from './MainSlideTest';
import MainSlideCommunity from './MainSlideCommunity';
import StarBg from '@/domains/shared/components/star-bg/StarBg';

gsap.registerPlugin(ScrollTrigger);

function MainSlide() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cleanupFnRef = useRef<(() => void) | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  setIsMobile(window.innerWidth < 1024);
  setMounted(true);

  const handleResize = () => {
    // 디바운스: resize 이벤트를 200ms 지연
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      const newIsMobile = window.innerWidth < 1024;

      // 모바일 ↔ 데스크탑 전환 시에만 cleanup 실행
      if (newIsMobile !== isMobile) {
        // GSAP을 먼저 완전히 정리
        if (cleanupFnRef.current) {
          cleanupFnRef.current();
          cleanupFnRef.current = null;
        }

        // 상태 업데이트
        setIsMobile(newIsMobile);
      } else if (!newIsMobile) {
        // 데스크탑 내에서의 리사이즈 - ScrollTrigger refresh
        ScrollTrigger.refresh(true);
      }
    }, 200);
  };

  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    if (cleanupFnRef.current) {
      cleanupFnRef.current();
    }
  };
}, [isMobile]);

// GSAP 초기화 - 데스크탑에서만
  useLayoutEffect(() => {
    if (!mounted) return;
    if (isMobile) return;
    if (!root.current) return;

    const el = root.current;
    const stage = el.querySelector('.stage') as HTMLElement;
    if (!stage) return;

    const timer = setTimeout(() => {
      if (!root.current) return;

      const ctx = gsap.context(() => {
        const panels = Array.from(el.querySelectorAll<HTMLElement>('.panel'));
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.inOut' } });

        panels.forEach((panel, i) => {
          const c = panel.querySelector<HTMLElement>('.slide-content');
          if (!c) return;
          const stageW = () => stage.clientWidth;
          const contentW = () => c.getBoundingClientRect().width;

          gsap.set(c, {
            x: () => stageW(),
            immediateRender: false,
          });

          tl.to(
            c,
            {
              x: () => stageW() - contentW(),
              duration: 2,
              immediateRender: false,
              onStart: () => c.classList.remove('invisible'),
            },
            i
          );
        });

        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: `+=${panels.length * 100}%`,
          pin: true,
          scrub: true,
          animation: tl,
          invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();
      }, root);

      cleanupFnRef.current = () => {
        const allTriggers = ScrollTrigger.getAll();
        allTriggers.forEach((st) => {
          if (st.trigger === el || el.contains(st.trigger as Node)) {
            st.kill(true);
          }
        });

        try {
          ctx.revert();
        } catch {}

        const pinSpacers = document.querySelectorAll('.pin-spacer');
        pinSpacers.forEach((spacer) => {
          if (spacer.contains(el) || el.contains(spacer)) {
            const child = spacer.querySelector('section');
            if (child && spacer.parentElement) {
              spacer.parentElement.appendChild(child);
            }
            spacer.remove();
          }
        });
      };
    }, 50);

    return () => {
      clearTimeout(timer);
      if (cleanupFnRef.current) {
        cleanupFnRef.current();
        cleanupFnRef.current = null;
      }
    };
  }, [isMobile, mounted]);
  // SSR 방지
  if (!mounted) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <StarBg className="">
          <MobileSlide key="mobile" />
        </StarBg>
      ) : (
        <StarBg className="bg-fixed">
          <section key="desktop" ref={root} className="stage h-screen">
            <div className="stage relative w-full h-full overflow-hidden">
              <div className="panel absolute inset-0">
                <MainSlideIntro />
              </div>
              <div className="panel absolute inset-0">
                <MainSlideTest />
              </div>
              <div className="panel absolute inset-0">
                <MainSlideCommunity />
              </div>
              <div className="panel absolute inset-0">
                <MainSlideAbv />
              </div>
            </div>
          </section>
        </StarBg>
      )}
    </>
  );
}

export default MainSlide;
