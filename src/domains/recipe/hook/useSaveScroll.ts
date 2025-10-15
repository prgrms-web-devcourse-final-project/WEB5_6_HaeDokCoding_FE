import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Scroll {
  storageKey?: string;
  enabled?: boolean;
  // 이 페이지가 리스트 페이지인지 상세 페이지인지 구분
  pageType?: 'list' | 'detail';
}

export const useSaveScroll = (opt: Scroll = {}) => {
  const {
    storageKey = 'cocktail_scroll',
    enabled = true,
    pageType = 'list', // 기본값은 리스트
  } = opt;
  const router = useRouter();
  const hasRestore = useRef(false);

  useEffect(() => {
    console.log('=== useEffect 실행 ===');
    console.log('pageType:', pageType);

    // 상세 페이지에서는 스크롤 복원 로직 실행 안함
    if (pageType === 'detail') {
      console.log('상세 페이지 - 복원 스킵');
      return;
    }

    if (!enabled || hasRestore.current) {
      console.log('조건 불만족');
      return;
    }

    const savedPosition = sessionStorage.getItem(storageKey);
    const shouldRestore = sessionStorage.getItem(`${storageKey}_should_restore`);

    console.log('savedPosition:', savedPosition);
    console.log('shouldRestore:', shouldRestore);

    // 리스트 페이지이고, 복원 플래그가 있을 때만 복원
    if (savedPosition && shouldRestore === 'true') {
      const position = parseInt(savedPosition, 10);

      console.log('스크롤 복원 시도:', position);

      const restoreScroll = () => {
        console.log('restoreScroll 함수 실행');
        window.scrollTo(0, position);
        console.log('현재 스크롤 위치:', window.scrollY);
        hasRestore.current = true;
      };

      // 여러 타이밍에 시도
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 0);
      setTimeout(restoreScroll, 100);

      // 복원 플래그 제거
      sessionStorage.removeItem(`${storageKey}_should_restore`);
    } else {
      console.log('복원 조건 불만족');
    }
  }, [storageKey, enabled, pageType]);

  const saveScroll = () => {
    if (!enabled) return;
    const currentScroll = window.scrollY;
    sessionStorage.setItem(storageKey, currentScroll.toString());
    console.log('스크롤 저장:', currentScroll);
  };

  // 상세 페이지로 이동 (스크롤 위치만 저장, 복원 플래그는 설정 안함)
  const saveAndNavigate = (href: string) => {
    saveScroll();
    sessionStorage.setItem(`${storageKey}_url`, location.href);
    console.log('상세 페이지로 이동 - 스크롤만 저장');
    router.push(href);
  };

  // 뒤로가기 (복원 플래그 설정)
  const restoreAndGoBack = () => {
    const saveUrl = sessionStorage.getItem(`${storageKey}_url`);
    console.log('뒤로가기 - saveUrl:', saveUrl);

    if (!saveUrl) return;

    // 뒤로가기할 때만 복원 플래그 설정
    sessionStorage.setItem(`${storageKey}_should_restore`, 'true');
    console.log('복원 플래그 설정 완료');

    router.replace(saveUrl, { scroll: false });
  };

  return {
    saveScroll,
    saveAndNavigate,
    restoreAndGoBack,
  };
};
