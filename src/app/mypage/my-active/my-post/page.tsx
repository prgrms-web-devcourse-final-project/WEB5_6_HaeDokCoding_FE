'use client';

import { fetchPost } from '@/domains/community/api/fetchPost';
import PostCard from '@/domains/community/main/PostCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};
import { Post } from '@/domains/community/types/post';
import { useEffect, useState } from 'react';

function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchPost();
      if (!data) return;
      setPosts(data);
      setIsLoading(false);
    };
    fetchData();
  }, [setPosts]);

  return (
    <div>
      <PostCard posts={posts} isLoading={isLoading} />
    </div>
  );
}
export default Page;
