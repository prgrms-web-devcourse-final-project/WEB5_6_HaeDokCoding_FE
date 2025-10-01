'use client';

import { useEffect, useState } from 'react';
import CommunityFilter from './CommunityFilter';
import CommunityTab from './CommunityTab';
import PostCard from './PostCard';
import WriteBtn from './WriteBtn';
import { Post } from '../types/post';
import { fetchPost } from '../api/fetchPost';

function Community() {
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
    <>
      <section
        aria-label="탭과 글쓰기"
        className="flex justify-between item-center sm:flex-row flex-col gap-4 mt-1"
      >
        <CommunityTab setPosts={setPosts} />
        <WriteBtn />
      </section>

      <section aria-label="게시물 목록">
        <CommunityFilter posts={posts} />
        <PostCard posts={posts} isLoading={isLoading} />
      </section>
    </>
  );
}

export default Community;
