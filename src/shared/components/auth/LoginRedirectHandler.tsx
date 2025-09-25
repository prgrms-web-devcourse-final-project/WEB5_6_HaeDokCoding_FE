'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/@store/auth';
import { useModalStore } from '@/shared/@store/modal';
import { customToast } from '@/shared/components/toast/CustomToastUtils';
import Spinner from '../spinner/Spinner';

function LoginRedirectHandler() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const { openWelcomeModal } = useModalStore();
  const [loading, setLoading] = useState(true);

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

    const preLoginPath = sessionStorage.getItem('preLoginPath') || '/';

    if (pathname.startsWith('/login/first-user')) {
      openWelcomeModal(user.nickname);
    } else if (pathname.startsWith('/login/success')) {
      customToast.success(`${user.nickname}님 \n 로그인 성공 🎉`);
      router.replace(preLoginPath);
    }
  }, [pathname, user, router, openWelcomeModal, loading]);

  if (loading) {
    return (
      <div className="page-layout max-w-824 flex-center">
        <Spinner />
      </div>
    );
  }

  return null;
}
export default LoginRedirectHandler;
