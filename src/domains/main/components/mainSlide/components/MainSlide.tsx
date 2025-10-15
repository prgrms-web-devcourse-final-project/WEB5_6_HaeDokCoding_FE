'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileSlide from './mobile/MobileSlide';
import MainSlideIntro from './MainSlideIntro';
import MainSlideTest from './pc/MainSlideTest';
import MainSlideCommunity from './pc/MainSlideCommunity';
import MainSlideAbv from './pc/MainSlideAbv';

gsap.registerPlugin(ScrollTrigger);

function MainSlide({ isDesktop }: { isDesktop: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const initialRoot = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const cleanupFnRef = useRef<(() => void) | null>(null);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // GSAP 초기화 - 데스크탑에서만
  useLayoutEffect(() => {
    if (!mounted || !isDesktop || !root.current) return;

    const el = root.current;
    const stage = el.querySelector('.stage') as HTMLElement;
    if (!stage) return;

    const ctx = gsap.context(() => {
      // 첫 진입 애니메이션
      gsap.fromTo(
        initialRoot.current,
        { opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power5.out',
          scrollTrigger: {
            trigger: initialRoot.current,
            start: 'top 80%',
            end: 'top top',
            scrub: 0.2,
          },
        }
      );

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

      // pin-spacer 정리
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

    return () => {
      cleanupFnRef.current?.();
      cleanupFnRef.current = null;
    };
  }, [isDesktop, mounted]);
  // SSR 방지
  if (!mounted) {
    return null;
  }

  return (
    <>
      {!isDesktop ? (
        <MobileSlide key="mobile" />
      ) : (
        <div ref={initialRoot} className="w-full overflow-hidden">
          <section key="desktop" ref={root} className="w-full stage h-screen" id="scroll-fixed">
            <div className="stage relative w-full h-full overflow-hidden bg-secondary">
              <div className="panel absolute inset-0 overflow-hidden">
                <MainSlideIntro />
              </div>
              <div className="panel absolute inset-0 overflow-hidden">
                <MainSlideTest />
              </div>
              <div className="panel absolute inset-0 overflow-hidden">
                <MainSlideCommunity />
              </div>
              <div className="panel absolute inset-0 overflow-hidden">
                <MainSlideAbv />
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default MainSlide;
