'use client';

import { fetchPostById, likePost } from '@/domains/community/api/fetchPost';
import DetailContent from '@/domains/community/detail/DetailContent';
import DetailHeader from '@/domains/community/detail/DetailHeader';
import DetailTitle from '@/domains/community/detail/DetailTitle';
import DetailTabDesktop from '@/domains/community/detail/tab/DetailTabDesktop';
import { Post } from '@/domains/community/types/post';
import Comment from '@/domains/community/detail/Comment';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DetailSkeleton from '@/domains/community/detail/DetailSkeleton';

function Page() {
  const params = useParams();
  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [prevLikeCount, setPrevLikeCount] = useState<number | undefined>(0);

  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const postId = params.id;
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchPostById(postId);
      if (!data) return;

      setPostDetail(data);
      setIsLoading(false);
    };
    fetchData();
  }, [params.id, setPostDetail]);

  useEffect(() => {
    if (postDetail) {
      setPrevLikeCount(postDetail.likeCount);
      // 여기에 isLiked도 함께 받아오면 setLike(postDetail.isLiked);
      console.log(prevLikeCount);
    }
  }, [postDetail]);

  if (isLoading) return <DetailSkeleton />;
  if (!postDetail) return null;

  const {
    categoryName,
    title,
    userNickName,
    createdAt,
    viewCount,
    imageUrls,
    postId,
    tags,
    content,
    likeCount,
    commentCount,
  } = postDetail;

  const handleLike = async () => {
    setLike((prev) => !prev);
    setPrevLikeCount((prev) => {
      return like ? prev! - 1 : prev! + 1;
    });

    try {
      await likePost(postId); // POST 요청 한 번으로 토글 처리
    } catch (err) {
      console.error('좋아요 토글 실패', err);
      setLike((prev) => !prev);
      setPrevLikeCount((prev) => (like ? prev! + 1 : prev! - 1));
    }
  };

  return (
    <div className="w-full relative mb-10">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <article className="page-layout max-w-824 z-5">
        <DetailHeader categoryName={categoryName} postId={postId} />
        <DetailTitle title={title} userNickname={userNickName} />
        <DetailContent
          content={content}
          createdAt={createdAt}
          viewCount={viewCount}
          postId={postId}
          tags={tags}
          imageUrls={imageUrls}
          prevLikeCount={prevLikeCount ?? 0}
          commentCount={commentCount}
          like={like}
          onLikeToggle={handleLike}
        />
        <section ref={commentRef}>
          <Comment postId={postId} />
        </section>
      </article>
      <div className="hidden md:block">
        <DetailTabDesktop
          likeCount={prevLikeCount ?? 0}
          commentCount={commentCount}
          commentRef={commentRef}
          like={like}
          onLikeToggle={handleLike}
        />
      </div>
    </div>
  );
}

export default Page;
