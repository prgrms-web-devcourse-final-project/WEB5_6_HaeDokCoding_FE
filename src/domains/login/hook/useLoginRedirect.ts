import { useAuthStore } from '@/domains/shared/store/auth';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie, removeCookie } from '@/domains/shared/auth/utils/cookie';
import { useToast } from '@/shared/hook/useToast';

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
      setTimeout(() => removeCookie('preLoginPath'), 500);
      return;
    }

    if (pathname.startsWith('/login/user/first-user')) {
      setWelcomeModalOpen(true);
    } else if (pathname.startsWith('/login/user/success')) {
      toastSuccess(`${user.nickname}님 \n 로그인 성공 🎉`);
      router.replace(preLoginPath);
      setTimeout(() => removeCookie('preLoginPath'), 500);
    }
  }, [pathname, user, loading, router, toastSuccess]);

  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    const preLoginPath = getCookie('preLoginPath') || '/';
    setTimeout(() => removeCookie('preLoginPath'), 500);
    router.replace(preLoginPath);
  };

  return { loading, welcomeModalOpen, handleCloseWelcomeModal, user };
};
