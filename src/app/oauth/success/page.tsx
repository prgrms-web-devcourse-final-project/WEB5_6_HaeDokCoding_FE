'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/shared/@store/auth';
import Spinner from '@/shared/components/spinner/Spinner';

function Page() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      const prevPath = sessionStorage.getItem('preLoginPath') || '/';
      router.push(prevPath);
      sessionStorage.removeItem('preLoginPath');
    }
  }, [user, router]);
  return (
    <div className="page-layout max-w-824 flex-center">
      <Spinner />
    </div>
  );
}
export default Page;
