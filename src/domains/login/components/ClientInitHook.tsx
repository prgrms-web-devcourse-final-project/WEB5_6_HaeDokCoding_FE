'use client';

import { useFetchInterceptor } from '@/shared/hook/useFetchInterceptor';
import { useIdleLogout } from '../hook/useIdleLogout';
import { useEffect } from 'react';
import { useAuthStore } from '@/domains/shared/store/auth';

function ClientInitHook() {
  const { checkAuth, isLoggedIn, isAuthChecked } = useAuthStore();

  useIdleLogout();

  useFetchInterceptor();

  useEffect(() => {
    // 로그인 상태가 아니거나 이미 체크 완료면 호출하지 않음
    if (isLoggedIn && !isAuthChecked) {
      checkAuth(); // 쿠키 기반 인증 상태 확인
    }
  }, [checkAuth, isLoggedIn, isAuthChecked]);

  return null;
}

export default ClientInitHook;
