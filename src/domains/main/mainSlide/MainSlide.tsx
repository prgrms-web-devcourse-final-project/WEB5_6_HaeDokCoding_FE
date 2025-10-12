'use client'
import { useLayoutEffect, useRef } from "react";
import MainSlideAbv from "./MainSlideAbv";
import MainSlideCommunity from "./MainSlideCommunity";
import MainSlideIntro from "./MainSlideIntro";
import MainSlideTest from "./MainSlideTest";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function MainSlide() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    
  const el = root.current!
  const stage = el.querySelector('.stage') as HTMLElement;
  const ctx = gsap.context(() => {
    const panels = Array.from(el.querySelectorAll<HTMLElement>('.panel'))
    const contents = Array.from(el.querySelectorAll<HTMLElement>('.slide-content'))

    // 화면(섹션) 폭만큼 우측으로 숨기기
    gsap.set(contents, { x: () => el.clientWidth })  // ← 핵심

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
    panels.forEach((panel, i) => {
      const c = panel.querySelector<HTMLElement>('.slide-content')
      if (!c) return

const getW = (t: HTMLElement) => t.getBoundingClientRect().width;

tl.fromTo(
  c,
  { x: () => stage.clientWidth }, // 오른쪽 완전 숨김
  { x: () => stage.clientWidth - getW(c), duration: 1, immediateRender: false }, // 자기 너비만큼만 노출
  i
);
    })

    ScrollTrigger.create({
      trigger: el, start: 'top top',
      end: `+=${panels.length * 100}%`,
      pin: true, scrub: true, animation: tl,
    })
  }, root)
  return () => ctx.revert()
}, [])


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