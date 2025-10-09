import { RefObject, useEffect, useRef } from 'react';

export const useIntersectionObserver = <T extends HTMLElement>(
  targetRef: RefObject<T | null>, // 관찰하는 요소
  onIntersect: IntersectionObserverCallback, // 관찰 될 때 실행할 함수
  hasNextPage: boolean | undefined // 무한스크롤로 더 불러올 요소가 있는지
) => {
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {

    observer.current?.disconnect()
    
    if (targetRef && targetRef.current) {
      observer.current = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });
      if (!hasNextPage) {
        observer.current?.unobserve(targetRef.current);
        return;
      }
      observer.current.observe(targetRef.current);
    }
    return () => observer && observer.current?.disconnect();
  }, [targetRef, onIntersect]);
};
