'use client';

import { useEffect, useState } from 'react';
import CommunityFilter from './CommunityFilter';
import CommunityTab from './CommunityTab';
import PostCard from './PostCard';
import WriteBtn from './WriteBtn';
import { Post } from '../types/post';
import { getApi } from '@/app/api/config/appConfig';
import { fetchPost } from '../api/fetchPost';

function Community() {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isEnd, setIsEnd] = useState(false);

  const loadMorePosts = async (lastPostId: number) => {
    if (isEnd || isLoading) return;
    console.log('시작');

    setIsLoading(true);
    try {
      const newPosts = await fetchPost(lastPostId);
      console.log(newPosts);

      if (newPosts?.length === 0) {
        setIsEnd(true);
      } else {
        setPosts((prev) => [...(prev ?? []), ...(newPosts ?? [])]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        aria-label="탭과 글쓰기"
        className="flex justify-between item-center sm:flex-row flex-col gap-4 mt-1"
      >
        <CommunityTab setPosts={setPosts} setIsLoading={setIsLoading} />
        <WriteBtn />
      </section>

      <section aria-label="게시물 목록">
        <CommunityFilter posts={posts} setPosts={setPosts} />
        <PostCard
          posts={posts}
          setPost={setPosts}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isEnd={isEnd}
          onLoadMore={loadMorePosts}
        />
      </section>
    </>
  );
}

export default Community;
