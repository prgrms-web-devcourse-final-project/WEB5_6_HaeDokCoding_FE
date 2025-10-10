import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const { toastSuccess, toastError } = useToast();
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toastSuccess('로그아웃 되었습니다.');

      // 마이페이지 일 시 메인페이지로 이동
      if (window.location.pathname.startsWith('/mypage')) {
        router.push('/');
      }
    } catch (err) {
      console.error('로그아웃 실패', err);
      toastError('로그아웃 실패 ❌ 다시 시도해주세요.');
    }
  }, [logout, toastSuccess, toastError, router]);

  return handleLogout;
};
