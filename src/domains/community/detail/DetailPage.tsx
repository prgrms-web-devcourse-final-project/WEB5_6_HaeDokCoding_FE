'use client';

import { fetchPostById, getLikePost, likePost } from '@/domains/community/api/fetchPost';
import DetailContent from '@/domains/community/detail/DetailContent';
import DetailHeader from '@/domains/community/detail/DetailHeader';
import DetailTitle from '@/domains/community/detail/DetailTitle';
import DetailTabDesktop from '@/domains/community/detail/tab/DetailTabDesktop';
import { Post } from '@/domains/community/types/post';
import Comment from '@/domains/community/detail/Comment';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useEffect, useRef, useState } from 'react';
import DetailSkeleton from '@/domains/community/detail/DetailSkeleton';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/domains/shared/store/auth';
import Button from '@/shared/components/button/Button';
import { useRouter } from 'next/navigation';
import { useComments } from '../hook/useComment';

function DetailPage() {
  const params = useParams();
  const postId = params.id;

  const user = useAuthStore((state) => state.user);

  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [like, setLike] = useState<boolean | null>(null);
  const [prevLikeCount, setPrevLikeCount] = useState<number | undefined>(0);

  useEffect(() => {
    console.log('like:', like);
    console.log('prevLikeCount:', prevLikeCount);
  }, [like, prevLikeCount]);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const router = useRouter();

  const { comments } = useComments(postId, user);

  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchPostById(postId);
      if (!data) return;

      setPostDetail(data);
      setIsLoading(false);
    };
    fetchData();
  }, [postId, setPostDetail]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const liked = await getLikePost(postId);
        console.log(liked);
        setLike(liked === 'LIKE');
      } catch (err) {
        console.error('좋아요 상태 불러오기 실패', err);
      }
    };
    fetchLikeStatus();
  }, [postId]);

  useEffect(() => {
    if (postDetail) {
      setPrevLikeCount(postDetail.likeCount);
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
    tags,
    content,
    commentCount,
  } = postDetail;

  const handleLike = async () => {
    setLike((prev) => {
      const newLike = !prev;
      setPrevLikeCount((count) => (newLike ? count! + 1 : count! - 1));
      return newLike;
    });

    try {
      await likePost(postId); // POST 요청 한 번으로 토글 처리
    } catch (err) {
      console.error('좋아요 토글 실패', err);
      setLike((prev) => {
        const newLike = !prev;
        setPrevLikeCount((count) => (newLike ? count! + 1 : count! - 1));
        return newLike;
      });
    }
  };

  return (
    <>
      <div className="w-full relative mb-10">
        <StarBg className="w-full h-32 absolute" />
        <article className="page-layout max-w-824 z-5">
          <DetailHeader categoryName={categoryName} postId={postId} userNickName={userNickName} />
          <DetailTitle title={title} userNickname={userNickName} />

          {isLoggedIn ? (
            <>
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
                title={title}
                onLikeToggle={handleLike}
              />
            </>
          ) : (
            <div className="relative mt-10 flex justify-center items-center">
              <div className="absolute inset-0 bg-white/60 backdrop-blur-2xl z-10 rounded-md mb-4" />
              <div className="relative z-20 text-center flex flex-col justify-center items-center p-8">
                <p className="text-gray-600 text-sm mb-4">
                  이 게시글을 보시려면 로그인이 필요합니다.
                </p>
                <Button onClick={() => router.push('/login')} className="w-[80%]">
                  로그인 하러 가기
                </Button>
              </div>
            </div>
          )}
          <section ref={commentRef}>
            <Comment postId={postId} />
          </section>
        </article>
        {isLoggedIn && (
          <div className="hidden lg:block">
            <DetailTabDesktop
              likeCount={prevLikeCount}
              commentCount={commentCount}
              commentRef={commentRef}
              like={like}
              onLikeToggle={handleLike}
              title={title}
              imageUrls={imageUrls}
              comments={comments}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default DetailPage;
