import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';
import { useCallback } from 'react';

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const { toastSuccess, toastError } = useToast();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toastSuccess('로그아웃 되었습니다.');
    } catch (err) {
      console.error('로그아웃 실패', err);
      toastError('로그아웃 실패 ❌ 다시 시도해주세요.');
    }
  }, [logout, toastSuccess, toastError]);

  return handleLogout;
};
