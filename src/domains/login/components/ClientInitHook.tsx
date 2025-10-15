'use client';

import { useFetchInterceptor } from '@/shared/hook/useFetchInterceptor';
import { useIdleLogout } from '../hook/useIdleLogout';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/domains/shared/store/auth';

function ClientInitHook() {
  const { isAuthChecked } = useAuthStore();
  const checkAuthRef = useRef(useAuthStore.getState().checkAuth);

  useIdleLogout();

  useFetchInterceptor();

  useEffect(() => {
    // ref를 최신 함수로 업데이트
    checkAuthRef.current = useAuthStore.getState().checkAuth;
  });

  useEffect(() => {
    if (!isAuthChecked) {
      checkAuthRef.current();
    }
  }, [isAuthChecked]);

  return null;
}

export default ClientInitHook;
