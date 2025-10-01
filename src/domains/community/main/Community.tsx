'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CommunityFilter from './CommunityFilter';
import CommunityTab from './CommunityTab';
import PostCard from './PostCard';
import WriteBtn from './WriteBtn';
import { Post } from '../types/post';
import { fetchPost } from '../api/fetchPost';

function Community() {
  const [posts, setPosts] = useState<Post[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [morePost, setMorePost] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const lastId = useMemo(() => {
    return posts && posts.length > 0 ? posts[posts.length - 1].postId : null;
  }, [posts]);

  const fetchMorePosts = useCallback(async () => {
    if (!morePost || loading) {
      console.log('[더보기] 요청 차단 - morePost: ', morePost, 'isLoading: ', loading);
      return;
    }

    setIsLoading(true);
    console.log('[더보기] 요청 시작 - lastId: ', lastId);

    const data = await fetchPost(lastId);

    console.log('[더보기] 응답: ', data);

    if (!data || data.length === 0) {
      console.log('[더보기] 더 이상 데이터 없음');
      setMorePost(false);
    } else {
      setPosts((prev) => [...(prev ?? []), ...data]);
    }

    setIsLoading(false);
  }, [lastId, loading, morePost]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log('[초기 로딩] 게시물 요청 시작');

      const initialData = await fetchPost();
      console.log('[초기 로딩] 게시물 응답:', initialData);

      setPosts(initialData);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log('[관찰자] 감지됨?', entry.isIntersecting);
        if (entry.isIntersecting) {
          fetchMorePosts();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 1.0,
      }
    );

    console.log('[관찰자] 등록됨');
    observer.observe(observerRef.current);

    return () => {
      console.log('[관찰자] 해제됨');
      observer.disconnect();
    };
  }, [posts, isLoading, fetchMorePosts]);

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
        <CommunityFilter posts={posts} setPosts={setPosts} />
        <PostCard posts={posts} isLoading={isLoading} />
        {morePost && <div ref={observerRef} className="h-10" />}
      </section>
    </>
  );
}

export default Community;
