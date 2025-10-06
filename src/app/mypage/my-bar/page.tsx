import MyBar from '@/domains/mypage/components/pages/my-bar/MyBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function Page() {
  return <MyBar />;
}
export default Page;
