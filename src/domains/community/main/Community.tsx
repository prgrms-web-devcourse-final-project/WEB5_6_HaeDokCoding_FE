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

  const lastLikeCount =
    posts && posts.length > 0 ? Math.min(...posts.map((post) => post.likeCount)) : null;

  const lastCommentCount =
    posts && posts.length > 0 ? Math.min(...posts.map((post) => post.commentCount)) : null;

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setPosts([]);
    setIsEnd(false);
    setLastLoadedId(null);
    loadInitialPosts();
  }, [category, filter]);

  const loadInitialPosts = async () => {
    setIsLoading(true);
    setIsEnd(false);

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
    } catch (error) {
      console.error('게시글 로딩 실패:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMorePosts = async (lastPostId: number) => {
    if (isEnd || isLoading) return;
    if (!posts || posts.length === 0) return;

    if (lastLoadedId === lastPostId) return;
    setLastLoadedId(lastPostId);

    setIsLoading(true);
    try {
      const newPosts = await fetchPostByTab({
        category,
        filter,
        lastLikeCount,
        lastCommentCount,
        lastId: lastPostId,
      });

      if (!newPosts || newPosts?.length === 0) {
        setIsEnd(true);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev?.map((p) => p.postId));
          const filtered = newPosts.filter((p) => !existingIds.has(p.postId));
          return [...(prev || []), ...filtered];
        });
      }
    } catch (error) {
      console.error('추가 게시글 로딩 실패:', error);
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
        <CommunityTab />
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
