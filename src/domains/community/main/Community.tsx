'use client';

import { useEffect, useMemo, useState } from 'react';
import CommunityFilter from './CommunityFilter';
import CommunityTab from './CommunityTab';
import PostCard from './PostCard';
import WriteBtn from './WriteBtn';
import { Post } from '../types/post';
import { fetchPostByTab } from '../api/fetchPost';
import { useSearchParams } from 'next/navigation';

function Community() {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLoadedId, setLastLoadedId] = useState<number | null>(null);

  const searchParams = useSearchParams();

  const category = useMemo(() => searchParams.get('category') || 'all', [searchParams]);
  const filter = useMemo(
    () => (searchParams.get('postSortStatus') as 'LATEST' | 'POPULAR' | 'COMMENTS') || 'LATEST',
    [searchParams]
  );

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setPosts([]);
    setIsEnd(false);
    setLastLoadedId(null);
    loadInitialPosts();
  }, [category, filter]);

  const loadInitialPosts = async () => {
    const category = searchParams.get('category') || 'all';
    const filter =
      (searchParams.get('postSortStatus') as 'LATEST' | 'POPULAR' | 'COMMENTS') || 'LATEST';

    setIsLoading(true);
    setIsEnd(false);

    // const latestPost = posts?.sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
    // const latestLike = latestPost?.sort((a,b) => b.likeCount - a.likeCount );
    // const latestComment = latestPost?.sort((a,b) => b.commentCount - a.commentCount );

    try {
      const newPosts = await fetchPostByTab({
        category,
        filter,
      });

      if (!newPosts || newPosts.length === 0) {
        setIsEnd(true);
        setPosts([]);
      } else {
        setPosts(newPosts);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = async (lastPostId: number) => {
    if (isEnd || isLoading) return;
    if (!posts || posts.length === 0) return;
    console.log('시작', lastPostId);

    const lastPost = posts[posts.length - 1];
    if (lastPostId === lastPost.postId) return;
    setLastLoadedId(lastPost.postId);

    setIsLoading(true);
    try {
      const category = searchParams.get('category') || 'all';
      const filter =
        (searchParams.get('postSortStatus') as 'LATEST' | 'POPULAR' | 'COMMENTS') || 'LATEST';

      const newPosts = await fetchPostByTab({
        category,
        filter,
        lastId: lastPostId,
      });

      if (!newPosts || newPosts?.length === 0) {
        setIsEnd(true);
        console.log('끝');
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
        <CommunityTab setPosts={setPosts} setIsLoading={setIsLoading} setIsEnd={setIsEnd} />
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
