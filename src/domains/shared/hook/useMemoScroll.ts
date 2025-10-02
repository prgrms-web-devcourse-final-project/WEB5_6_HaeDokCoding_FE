// hooks/useScrollRestoration.ts (또는 useMemoScroll.ts)
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
  timestamp: number;
}

export function useScrollRestoration<T>({
  storageKey,
  eventName = 'resetScroll',
}: UseScrollRestorationProps) {
  // 뒤로가기를 통해 목록 복원을 저장해주는 플래그
  const NAVIGATION_FLAG_KEY = `${storageKey}_nav_flag`;

  // 실제 렌더링 되는 데이터
  const [data, setData] = useState<T[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  // fetch필요 여부
  const [shouldFetch, setShouldFetch] = useState(false);

  // 스크롤 복원중일 때 값이 바뀜
  const isRestoringRef = useRef(false);
  // 스크롤 복원 후 값 바뀜
  const scrollRestoredRef = useRef(false);
  // 컴포넌트 마운트시 값 바뀜
  const hasMountedRef = useRef(false);

  // 스크롤 위치와 데이터 저장
  const saveScrollState = useCallback(() => {
    // 복원 중일때와 일정 스크롤 이상 안내려오면 저장 안함
    if (isRestoringRef.current || window.scrollY < 10) return;

    const scrollState: ScrollState<T> = {
      scrollY: window.scrollY,
      data: data,
      lastId: lastId,
      hasNextPage: hasNextPage,
      timestamp: Date.now(),
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
        timestamp,
      }: ScrollState<T> = parsed;

      // 세션이 30분 지나가면 세션 삭제
      const isRecent = Date.now() - timestamp < 30 * 60 * 1000;

      if (isRecent && savedData.length > 0 && scrollY > 10) {
        // 조건 충족 시 스크롤 데이터 복원

        isRestoringRef.current = true;

        setData(savedData);
        setLastId(savedLastId);
        setHasNextPage(savedHasNextPage);

        const restoreScroll = () => {
          // 스크롤 복원 시도 로직
          window.scrollTo({
            top: scrollY,
            behavior: 'instant',
          });

          setTimeout(() => {
            // 무한 스크롤시 데이터에따라 한번에 스크롤 복원 안되는 현상 발생 => 재시도 로직
            const currentScroll = window.scrollY;
            const diff = Math.abs(currentScroll - scrollY);

            if (diff > 5) {
              // 스크롤 재 조정이 필요한 경우 실행
              window.scrollTo({
                top: scrollY,
                behavior: 'instant',
              });
            }

            setTimeout(() => {
              // 복원 완료 ref초기화
              isRestoringRef.current = false;
              scrollRestoredRef.current = true;
            }, 300);
          }, 100);
        };

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

      // 뒤로가기임을 표시하는 플래그 설정
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
