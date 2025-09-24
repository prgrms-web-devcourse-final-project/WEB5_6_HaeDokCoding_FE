'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/@store/auth';
import { useModalStore } from '@/shared/@store/modal';
import Spinner from '@/shared/components/spinner/Spinner';

function Page() {
  const router = useRouter();
  const { setUser, updateUser } = useAuthStore();
  const { openWelcomeModal } = useModalStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await updateUser();

        console.log(data);
        // if (data && data.user && data.accessToken) {
        //   setUser(data.user, data.accessToken); // ✅ Zustand 상태 업데이트 + toast

        //   // 첫 로그인 시 웰컴 모달
        //   if (data.user.is_first_login) {
        //     openWelcomeModal(data.user.nickname);
        //   }

        //   const prevPath = sessionStorage.getItem('preLoginPath') || '/';
        //   router.push(prevPath);
        //   sessionStorage.removeItem('preLoginPath');
        // } else {
        //   router.push('/login');
        // }
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    fetchUser();
  }, [updateUser, setUser, openWelcomeModal, router]);

  return (
    <div className="page-layout max-w-824 flex-center">
      <Spinner />
    </div>
  );
}

export default Page;
