'use client';

import PostCard from '@/domains/community/main/PostCard';
import { Post } from '@/domains/community/types/post';
import { useState } from 'react';

function MyPost() {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div>
      <PostCard posts={posts} setPosts={setPosts} />
    </div>
  );
}
export default MyPost;
