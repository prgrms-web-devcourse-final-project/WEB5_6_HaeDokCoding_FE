'use client';

import { useFetchInterceptor } from '@/shared/hook/useFetchInterceptor';
import { useIdleLogout } from '../hook/useIdleLogout';

function ClientInitHook() {
  useIdleLogout();
  useFetchInterceptor();
  return null;
}
export default ClientInitHook;
