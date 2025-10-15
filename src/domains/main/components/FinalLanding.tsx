'use client';
import { useEffect, useRef, useState } from 'react';
import Landing from './3d/Landing';
import MainSlide from './mainSlide/components/MainSlide';
import Spinner from '@/shared/components/spinner/Spinner';
import gsap from 'gsap';
import { ScrollSmoother, ScrollTrigger } from 'gsap/all';
import StarMain from './3d/StarMain';
import CocktailDrop from '../cocktailDrop/CocktailDrop';
import Scroll from './3d/Scroll';

function FinalLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkViewport();
    setHasMounted(true);

    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // ScrollSmoother는 클라이언트에서 한 번만 초기화
    if (isDesktop && !smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#scroll-wrapper',
        content: '#scroll-content',
        smooth: 2.0,
        normalizeScroll: {
          allowNestedScroll: true,
        },
        ignoreMobileResize: true,
        effects: true,
      });
    }

    // ⚠️ 모바일에서 smoother 적용 안 하도록 명시적 분기
    if (!isDesktop && smootherRef.current) {
      smootherRef.current.kill();
      smootherRef.current = null;
    }

    return () => {
      // cleanup: 컴포넌트 언마운트 시 smoother 제거
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, [isDesktop]);

  if (!hasMounted) return null;

  return (
    <div className="overflow-x-hidden">
      <StarMain />
      {isDesktop ? (
        <div id="scroll-wrapper">
          <div id="scroll-content">
            {isLoading && <Spinner />}
            <Landing setIsLoading={setIsLoading} isDesktop={isDesktop} />
            {!isLoading && (
              <>
                <MainSlide isDesktop={isDesktop} />
                <CocktailDrop isDesktop={isDesktop} />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-hidden">
          {isLoading && <Spinner />}
          <Landing setIsLoading={setIsLoading} isDesktop={isDesktop} />
          {!isLoading && (
            <>
              <MainSlide isDesktop={isDesktop} />
              <CocktailDrop isDesktop={isDesktop} />
            </>
          )}
        </div>
      )}

      <Scroll />
    </div>
  );
}

export default FinalLanding;
