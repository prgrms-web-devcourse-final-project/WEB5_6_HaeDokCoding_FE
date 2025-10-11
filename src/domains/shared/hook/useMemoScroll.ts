// useScrollRestore.ts
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

interface UseScrollRestoreProps {
  lastId: number | null; // 현재까지 로드한 "최소 id"(내림차순에서 커서)
  fetchData: (cursor?: string) => Promise<void>;
  currentDataLength: number;
  hasNextPage?: boolean; // 선택: 있으면 조기 종료에 사용
}

type SavedShape = { targetId: number | null; scrollY: number };

export function useScrollRestore({
  lastId,
  fetchData,
  currentDataLength,
  hasNextPage,
}: UseScrollRestoreProps) {
  const pathname = usePathname();
  const KEY = `scroll-${pathname}`;

  const isRestoringRef = useRef(false);
  const hasRestoredRef = useRef(false);
  const lastIdRef = useRef<number | null>(lastId);
  const lenRef = useRef<number>(currentDataLength);

  useEffect(() => {
    lastIdRef.current = lastId;
  }, [lastId]);
  useEffect(() => {
    lenRef.current = currentDataLength;
  }, [currentDataLength]);

  // 브라우저 기본 복원 비활성화
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      try {
        history.scrollRestoration = 'manual';
      } catch {}
    }
  }, []);

  const jumpOnce = useCallback(
    (y: number) => {
      const el = document.scrollingElement || document.documentElement;
      const enough = () => document.body.scrollHeight >= y + window.innerHeight;
      let done = false;

      const finish = () => {
        if (done) return;
        done = true;
        el.scrollTo({ top: y, behavior: 'auto' });
        isRestoringRef.current = false;
        hasRestoredRef.current = true;
        sessionStorage.removeItem(KEY);
      };

      if (enough()) {
        requestAnimationFrame(finish);
        return;
      }

      const ro = new ResizeObserver(() => {
        if (enough()) {
          ro.disconnect();
          finish();
        }
      });
      ro.observe(document.body);
      window.addEventListener(
        'load',
        () => {
          if (enough()) finish();
        },
        { once: true }
      );
      setTimeout(() => finish(), 1000); 
    },
    [KEY]
  );

  // 복원
  useEffect(() => {
    if (hasRestoredRef.current) return;

    const raw = sessionStorage.getItem(KEY);
    if (!raw) {
      hasRestoredRef.current = true;
      return;
    }

    let saved: SavedShape | null = null;
    try {
      saved = JSON.parse(raw) as SavedShape;
    } catch {
      sessionStorage.removeItem(KEY);
      return;
    }
    if (!saved) {
      sessionStorage.removeItem(KEY);
      return;
    }

    const { targetId, scrollY } = saved;
    isRestoringRef.current = true;

    const MAX_FETCH = 50;

    const restore = async () => {
      let tries = 0;
      let lastProgressLen = lenRef.current;
      let lastProgressId = lastIdRef.current;

      // 내림차순 전제:
      // 더 불러올수록 현재 최소 id(=lastIdRef.current)가 "작아진다"
      // 목표 지점 도달 조건: currentMinId <= targetId  또는 targetId==null
      while (
        targetId != null &&
        (lastIdRef.current == null || (lastIdRef.current as number) > targetId)
      ) {
        if (hasNextPage === false) break; // 더 없음
        if (tries++ >= MAX_FETCH) break; // 안전망

        await fetchData();

        // 진행 없음(길이와 lastId 모두 동일) → 중단
        const noLenChange = lenRef.current === lastProgressLen;
        const noIdChange = lastIdRef.current === lastProgressId;
        if (noLenChange && noIdChange) break;

        lastProgressLen = lenRef.current;
        lastProgressId = lastIdRef.current;

        // 다음 렌더로 넘겨 레이아웃 안정화
        await new Promise((r) => setTimeout(r, 0));
      }

      requestAnimationFrame(() => jumpOnce(scrollY));
    };

    restore();
  }, [KEY, fetchData, hasNextPage, jumpOnce]);

  // 저장
  const saveScroll = useCallback(() => {
    const payload: SavedShape = {
      targetId: lastIdRef.current,
      scrollY: window.scrollY,
    };
    sessionStorage.setItem(KEY, JSON.stringify(payload));
    sessionStorage.setItem('saveUrl', location.href);
  }, [KEY]);

  return saveScroll;
}
