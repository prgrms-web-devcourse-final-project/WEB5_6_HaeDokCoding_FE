import PostCard from '@/domains/community/main/PostCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function page() {
  return (
    <ul>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
      <li>
        <PostCard label="레시피"></PostCard>
      </li>
    </ul>
  );
}
export default page;
