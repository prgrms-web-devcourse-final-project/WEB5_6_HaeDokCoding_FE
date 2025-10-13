'use client';

import { useFetchInterceptor } from '@/shared/hook/useFetchInterceptor';
import { useIdleLogout } from '../hook/useIdleLogout';
import { useEffect } from 'react';
import { useAuthStore } from '@/domains/shared/store/auth';

function ClientInitHook() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useIdleLogout();
  useFetchInterceptor();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return null;
}
export default ClientInitHook;
