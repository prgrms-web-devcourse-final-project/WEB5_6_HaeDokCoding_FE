import SkeletonMypageNav from '@/domains/mypage/skeleton/main/SkeletonMypageNav';
import SkeletonMyProfile from '@/domains/mypage/skeleton/main/SkeletonMyProfile';

function SkeletonLayout() {
  return (
    <div className="max-w-1024 page-layout py-12">
      <SkeletonMyProfile />
      <SkeletonMypageNav />
      <div className="mt-10"></div>
    </div>
  );
}
export default SkeletonLayout;
