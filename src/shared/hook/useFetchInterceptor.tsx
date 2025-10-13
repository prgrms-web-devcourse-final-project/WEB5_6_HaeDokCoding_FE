'use client';

import { useEffect } from 'react';
import { getApi } from '@/app/api/config/appConfig';
import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/hook/useToast';

export const useFetchInterceptor = () => {
  const router = useRouter();
  const { toastInfo } = useToast();

  useEffect(() => {
    const originalFetch = global.fetch;

    (global.fetch as typeof global.fetch) = async (input, init?) => {
      const response = await originalFetch(input, { ...init, credentials: 'include' });

      if (response.status === 401) {
        try {
          const refreshRes = await originalFetch(`${getApi}/user/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshRes.ok) {
            return originalFetch(input, { ...init, credentials: 'include' });
          } else {
            toastInfo('로그인 인증 만료로 다시 로그인해주세요.');
            router.push('/login');
          }
        } catch {
          toastInfo('로그인 인증 만료로 다시 로그인해주세요.');
          router.push('/login');
        }
      }
      return response;
    };

    return () => {
      global.fetch = originalFetch;
    };
  }, [router, toastInfo]);
};
