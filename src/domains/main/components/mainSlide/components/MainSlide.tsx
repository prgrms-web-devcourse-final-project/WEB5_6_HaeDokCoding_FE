'use client'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MainSlideAbv from "./MainSlideAbv";

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MobileSlide from "./mobile/MobileSlide";
import MainSlideIntro from "./MainSlideIntro";
import MainSlideTest from "./MainSlideTest";
import MainSlideCommunity from "./MainSlideCommunity";

gsap.registerPlugin(ScrollTrigger);

function MainSlide() {
  const root = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false)
  
  useLayoutEffect(() => {
   if (window.innerWidth <= 1024) return;
   const el = root.current!;
   const stage = el.querySelector('.stage') as HTMLElement;

   const ctx = gsap.context(() => {
     const panels = Array.from(el.querySelectorAll<HTMLElement>('.panel'));
     const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } });

     panels.forEach((panel, i) => {
       const c = panel.querySelector<HTMLElement>('.slide-content');
       if (!c) return;
       const stageW = () => stage.clientWidth;
       const contentW = () => c.getBoundingClientRect().width;

       // 초기 위치만 세팅(여기선 여전히 invisible)
       gsap.set(c, { x: stageW() });

       // 스크롤에 따라 자기 너비만큼만 화면에 노출
       tl.to(
         c,
         {
           x: () => stageW() - contentW(),
           duration: 1,
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

     requestAnimationFrame(() => ScrollTrigger.refresh());
   }, root);

   return () => ctx.revert();
  }, []);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <MobileSlide/>
    )
  }


  return (
    <section ref={root} className="h-screen">
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
  );
}
export default MainSlide