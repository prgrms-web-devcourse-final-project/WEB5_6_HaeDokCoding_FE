'use client';

import { useState } from 'react';
import CommunityFilter from './CommunityFilter';
import CommunityTab from './CommunityTab';
import PostCard from './PostCard';
import WriteBtn from './WriteBtn';
import { Post } from '../types/post';

function Community() {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <>
      <section
        aria-label="탭과 글쓰기"
        className="flex justify-between item-center sm:flex-row flex-col gap-4 mt-1"
      >
        <CommunityTab setPosts={setPosts} />
        <WriteBtn />
      </section>

      <section aria-label="게시물 목록">
        <CommunityFilter postNumber={posts.length} />
        <PostCard posts={posts} setPosts={setPosts} />
      </section>
    </>
  );
}

export default Community;
