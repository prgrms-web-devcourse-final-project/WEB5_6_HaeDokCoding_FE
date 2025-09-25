'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/@store/auth';
import { customToast } from '@/shared/components/toast/CustomToastUtils';
import Spinner from '../spinner/Spinner';
import WelcomeModal from './WelcomeModal';
import { getCookie, removeCookie } from './utils/cookie';

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
    }
  }, [user, loading, updateUser, router]);

  useEffect(() => {
    if (!user || loading) return;

    const preLoginPath = getCookie('preLoginPath') || '/';
    console.log(preLoginPath);

    // 첫 유저일 경우 모달 오픈
    if (pathname.startsWith('/login/first-user')) {
      setWelcomeModalOpen(true);
    }
    // 기존 유저일 경우
    else if (pathname.startsWith('/login/success')) {
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
