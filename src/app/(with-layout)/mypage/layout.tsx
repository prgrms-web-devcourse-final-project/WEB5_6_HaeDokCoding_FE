import MyNav from '@/domains/mypage/main/MyNav';
import MyProfile from '@/domains/mypage/main/MyProfile';
import SkeletonLayout from '@/domains/mypage/skeleton/main/SkeletonLayout';
import { Suspense } from 'react';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<SkeletonLayout />}>
      <div className="max-w-1024 page-layout py-12">
        <MyProfile />
        <MyNav />
        <div className="mt-5">{children}</div>
      </div>
    </Suspense>
  );
}
export default Layout;
