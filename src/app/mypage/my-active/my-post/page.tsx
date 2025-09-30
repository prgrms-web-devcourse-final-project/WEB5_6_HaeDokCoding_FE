'use client';

import { fetchPost } from '@/domains/community/api/fetchPost';
import PostCard from '@/domains/community/main/PostCard';
import { Post } from '@/domains/community/types/post';
import { useEffect, useState } from 'react';

function MyPost() {
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
      <PostCard posts={posts} setPosts={setPosts} isLoading={isLoading} />
    </div>
  );
}
export default MyPost;
