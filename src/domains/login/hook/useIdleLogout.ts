'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useLogout } from './useLogout';
import { useToast } from '@/shared/hook/useToast';
import { useAuthStore } from '@/domains/shared/store/auth';

const IDLE_TIMEOUT = 4 * 60 * 60 * 1000;

export const useIdleLogout = () => {
  const handleLogout = useLogout();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { toastInfo } = useToast();
  const { isLoggedIn } = useAuthStore();

  const resetTimer = useCallback(() => {
    if (!isLoggedIn) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

    timerRef.current = setTimeout(() => {
      toastInfo('5초 뒤 자동 로그아웃 예정 \n 움직이면 자동 로그아웃 취소됩니다.');
      warningTimerRef.current = setTimeout(() => handleLogout(), 5000);
    }, IDLE_TIMEOUT);
  }, [isLoggedIn, handleLogout, toastInfo]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [resetTimer]);
};
