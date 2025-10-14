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
        // URL 문자열 추출
        const url =
          typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;

        // refresh API 자체가 401이면 무한루프 방지
        if (url.includes('/user/auth/refresh')) {
          return response;
        }

        try {
          const refreshRes = await originalFetch(`${getApi}/user/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
          });

          if (refreshRes.ok) {
            // 토큰 갱신 성공 시 원래 요청 재시도
            return originalFetch(input, { ...init, credentials: 'include' });
          } else {
            // refresh 실패 → 로그인 페이지로
            toastInfo('로그인 인증 만료로 다시 로그인해주세요.');
            router.push('/login');
            return response;
          }
        } catch {
          toastInfo('로그인 인증 만료로 다시 로그인해주세요.');
          router.push('/login');
          return response;
        }
      }
      return response;
    };

    return () => {
      global.fetch = originalFetch;
    };
  }, [router, toastInfo]);
};
