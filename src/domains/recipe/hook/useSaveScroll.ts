import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Scroll {
  storageKey?: string;
  enabled?: boolean;
  pageType?: 'list' | 'detail';
}

export const useSaveScroll = (opt: Scroll = {}) => {
  const { storageKey = 'cocktail_scroll', enabled = true, pageType = 'list' } = opt;
  const router = useRouter();
  const hasRestore = useRef(false);

  useEffect(() => {
    if (pageType === 'detail') return;

    if (!enabled || hasRestore.current) return;

    const savedPosition = sessionStorage.getItem(storageKey);
    const shouldRestore = sessionStorage.getItem(`${storageKey}_should_restore`);

    if (savedPosition && shouldRestore === 'true') {
      const position = parseInt(savedPosition, 10);

      const restoreScroll = () => {
        window.scrollTo(0, position);
        hasRestore.current = true;
      };

      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 0);
      setTimeout(restoreScroll, 100);

      sessionStorage.removeItem(`${storageKey}_should_restore`);
    }
  }, [storageKey, enabled, pageType]);

  const saveScroll = () => {
    if (!enabled) return;
    const currentScroll = window.scrollY;
    sessionStorage.setItem(storageKey, currentScroll.toString());
  };

  // 상세 페이지로 이동 (스크롤 위치만 저장, 복원 플래그는 설정 안함)
  const saveAndNavigate = (href: string) => {
    saveScroll();
    sessionStorage.setItem(`${storageKey}_url`, location.href);
    router.push(href);
  };

  // 뒤로가기 (복원 플래그 설정)
  const restoreAndGoBack = () => {
    const saveUrl = sessionStorage.getItem(`${storageKey}_url`);

    if (!saveUrl) return;

    // 뒤로가기할 때만 복원 플래그 설정
    sessionStorage.setItem(`${storageKey}_should_restore`, 'true');

    router.replace(saveUrl, { scroll: false });
  };

  return {
    saveScroll,
    saveAndNavigate,
    restoreAndGoBack,
  };
};
