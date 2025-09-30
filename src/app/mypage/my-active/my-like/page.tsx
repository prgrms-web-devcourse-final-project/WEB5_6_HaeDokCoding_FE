'use client';

import PostCard from '@/domains/community/main/PostCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function Page() {
  return <section>{/* <PostCard posts={posts} isLoading={isLoading} /> */}</section>;
}
export default Page;
