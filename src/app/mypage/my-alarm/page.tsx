import Alarm from '@/domains/mypage/components/Alarm';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function Page() {
  return (
    <div className="flex flex-col gap-3">
      <Alarm></Alarm>
      <Alarm></Alarm>
      <Alarm></Alarm>
      <Alarm></Alarm>
    </div>
  );
}
export default Page;
