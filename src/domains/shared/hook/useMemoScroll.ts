import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRestorationProps {
  storageKey: string;
  eventName?: string;
}

interface ScrollState<T> {
  scrollY: number;
  data: T[];
  lastId: number | null;
  hasNextPage: boolean;
}

// 뒤로가기시 스크롤위치 기억 함수

export function useMemoScroll<T>({
  storageKey,
  eventName = 'resetScroll',
}: UseScrollRestorationProps) {
  // 뒤로가기를 통해 목록 복원을 저장해주는 플래그
  const NAVIGATION_FLAG_KEY = `${storageKey}_nav_flag`;

  // 실제 렌더링 되는 데이터
  const [data, setData] = useState<T[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);

  // 스크롤 복원중일 때 값이 바뀜
  const isRestoringRef = useRef(false);
  // 스크롤 복원 후 값 바뀜
  const scrollRestoredRef = useRef(false);
  // 컴포넌트 마운트시 값 바뀜
  const hasMountedRef = useRef(false);

  // 스크롤 위치와 데이터 저장
  const saveScrollState = useCallback(() => {
    // 복원 중일때 저장 X
    if (isRestoringRef.current) return;

    const scrollState: ScrollState<T> = {
      scrollY: window.scrollY,
      data: data,
      lastId: lastId,
      hasNextPage: hasNextPage,
    };

    sessionStorage.setItem(storageKey, JSON.stringify(scrollState));
  }, [data, lastId, hasNextPage, storageKey]);

  // 저장된 상태 복원
  const restoreScrollState = useCallback(() => {
    const saved = sessionStorage.getItem(storageKey);
    const navFlag = sessionStorage.getItem(NAVIGATION_FLAG_KEY);

    if (!saved) return false;

    // 네비게이션 플래그가 없으면 복원하지 않음 (새로 진입한 경우)
    if (navFlag !== 'back') {
      sessionStorage.removeItem(storageKey);
      return false;
    }

    // 플래그 사용 후 제거
    sessionStorage.removeItem(NAVIGATION_FLAG_KEY);

    try {
      // 데이터 복원
      const parsed = JSON.parse(saved);

      const {
        scrollY,
        data: savedData,
        lastId: savedLastId,
        hasNextPage: savedHasNextPage,
      }: ScrollState<T> = parsed;

      if (savedData.length > 0 && scrollY > 10) {
        // 조건 충족 시 스크롤 데이터 복원
        isRestoringRef.current = true;

        setData(savedData);
        setLastId(savedLastId);
        setHasNextPage(savedHasNextPage);

        const restoreScroll = (targetScrollY: number, maxAttempts = 10, interval = 100) => {
          let attempts = 0;

          const tryScroll = () => {
            window.scrollTo({
              top: targetScrollY,
              behavior: 'auto',
            });

            const currentScroll = window.scrollY;
            const threshold = 50;
            console.log(
              `Attempt ${attempts + 1}: target=${targetScrollY}, current=${currentScroll}`
            );

            if (Math.abs(currentScroll - targetScrollY) < threshold || attempts >= maxAttempts) {
              console.log('Scroll restoration completed');
              return;
            }

            attempts++;
            setTimeout(tryScroll, interval);
          };

          tryScroll();
        };

        // 사용
        restoreScroll(scrollY);

        // 재 조정시 애니메이션 매끄럽게 처리
        setTimeout(restoreScroll, 0);
        requestAnimationFrame(() => {
          setTimeout(restoreScroll, 50);
        });

        return true;
      }
    } catch (err) {
      console.error(err);
      sessionStorage.removeItem(storageKey);
      return false;
    }
  }, [storageKey, NAVIGATION_FLAG_KEY]);

  // 스크롤 리셋
  const resetScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sessionStorage.removeItem(storageKey);
    sessionStorage.removeItem(NAVIGATION_FLAG_KEY);
  }, [storageKey, NAVIGATION_FLAG_KEY]);

  // 아이템 클릭 시 호출할 함수 (네비게이션 플래그 설정)
  const handleItemClick = useCallback(() => {
    if (!isRestoringRef.current && window.scrollY > 10) {
      saveScrollState();
      sessionStorage.setItem('saveUrl', String(location.href));
      sessionStorage.setItem(NAVIGATION_FLAG_KEY, 'back');
    }
  }, [saveScrollState, NAVIGATION_FLAG_KEY]);

  // 컴포넌트 마운트 시 복원 시도
  useEffect(() => {
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;
    const restored = restoreScrollState();

    if (!restored) {
      setShouldFetch(true);
    }
  }, [restoreScrollState]);

  // 헤더에서 같은 페이지 클릭 시 이벤트 리스너
  useEffect(() => {
    const handleResetScroll = () => {
      resetScroll();
    };

    window.addEventListener(eventName, handleResetScroll);

    return () => {
      window.removeEventListener(eventName, handleResetScroll);
    };
  }, [eventName, resetScroll]);

  // 언마운트 시 정리 (복원되지 않은 데이터 정리)
  useEffect(() => {
    return () => {
      // 네비게이션 플래그가 없으면 데이터도 삭제
      const navFlag = sessionStorage.getItem(NAVIGATION_FLAG_KEY);
      if (!navFlag) {
        sessionStorage.removeItem(storageKey);
      }
    };
  }, [storageKey, NAVIGATION_FLAG_KEY]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    if (data.length === 0) return;

    const handleScroll = () => {
      if (isRestoringRef.current) return;

      if (scrollRestoredRef.current) {
        scrollRestoredRef.current = false;
      }

      saveScrollState();
    };

    // 디바운스 유틸을 이벤트마다 새로 생성시 timer초기화 => 로컬timeout사용
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [data, saveScrollState]);

  return {
    data,
    setData,
    lastId,
    setLastId,
    hasNextPage,
    setHasNextPage,
    handleItemClick,
    saveScrollState,
    shouldFetch,
  };
}
