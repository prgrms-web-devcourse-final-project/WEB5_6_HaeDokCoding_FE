// import PostCard from '@/domains/community/main/PostCard';
import MyLike from '@/domains/mypage/components/pages/my-active/MyLike';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function Page() {
  return <MyLike />;
}
export default Page;
