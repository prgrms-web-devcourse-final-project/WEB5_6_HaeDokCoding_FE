'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { customToast } from '@/shared/components/toast/CustomToastUtils';
import { getCookie, removeCookie } from '@/domains/shared/auth/utils/cookie';
import { useAuthStore } from '@/domains/shared/store/auth';
import Spinner from '@/shared/components/spinner/Spinner';
import WelcomeModal from '@/domains/login/components/WelcomeModal';

function LoginRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);

  useEffect(() => {
    if (!user && loading) {
      updateUser()
        .then((fetchedUser) => {
          if (!fetchedUser) {
            router.replace('/login');
          }
        })
        .catch(() => {
          router.replace('/login');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, loading, updateUser, router]);

  useEffect(() => {
    if (!user || loading) return;

    const preLoginPath = getCookie('preLoginPath') || '/';
    // 로그인 상태인데 이전 페이지가 /login이면 메인으로 이동
    if (user && preLoginPath === '/login') {
      router.replace('/');
      removeCookie('preLoginPath');
      return;
    }

    // 첫 유저일 경우 모달 오픈
    if (pathname.startsWith('/login/user/first-user')) {
      setWelcomeModalOpen(true);
    }
    // 기존 유저일 경우
    else if (pathname.startsWith('/login/user/success')) {
      customToast.success(`${user.nickname}님 \n 로그인 성공 🎉`);
      router.replace(preLoginPath);
      removeCookie('preLoginPath');
    }
  }, [pathname, user, loading, router]);

  // 환영 모달 닫힐 때 이동
  const handleCloseWelcomeModal = () => {
    setWelcomeModalOpen(false);
    const preLoginPath = getCookie('preLoginPath') || '/';
    removeCookie('preLoginPath');
    router.replace(preLoginPath);
  };

  if (loading) {
    return (
      <div className="page-layout max-w-824 flex-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* 첫 유저 모달 */}
      {user && (
        <WelcomeModal
          userNickname={user.nickname}
          open={welcomeModalOpen}
          onClose={handleCloseWelcomeModal}
        />
      )}
    </>
  );
}
export default LoginRedirectHandler;
