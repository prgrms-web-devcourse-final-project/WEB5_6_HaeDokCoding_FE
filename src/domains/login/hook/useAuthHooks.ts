import { useAuthStore } from '@/domains/shared/store/auth';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie, removeCookie } from '@/domains/shared/auth/utils/cookie';
import { useToast } from '@/shared/hook/useToast';

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

export const useLoginRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, updateUser } = useAuthStore();
  const { toastSuccess } = useToast();

  const [loading, setLoading] = useState(true);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  useEffect(() => {
    if (!user && loading) {
      updateUser()
        .then((fetchedUser) => {
          if (!fetchedUser) router.replace('/login');
        })
        .catch(() => router.replace('/login'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, loading, updateUser, router]);

  useEffect(() => {
    if (!user || loading) return;

    const preLoginPath = getCookie('preLoginPath') || '/';

    if (user && preLoginPath === '/login') {
      router.replace('/');
      removeCookie('preLoginPath');
      return;
    }

    if (pathname.startsWith('/login/user/first-user')) {
      setWelcomeModalOpen(true);
    } else if (pathname.startsWith('/login/user/success')) {
      toastSuccess(`${user.nickname}님 \n 로그인 성공 🎉`);
      router.replace(preLoginPath);
      removeCookie('preLoginPath');
    }
  }, [pathname, user, loading, router, toastSuccess]);

  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    const preLoginPath = getCookie('preLoginPath') || '/';
    removeCookie('preLoginPath');
    router.replace(preLoginPath);
  };

  return { loading, welcomeModalOpen, handleCloseWelcomeModal, user };
};
