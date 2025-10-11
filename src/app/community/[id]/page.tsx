'use client';

import { fetchPostById } from '@/domains/community/api/fetchPost';
import DetailContent from '@/domains/community/detail/DetailContent';
import DetailHeader from '@/domains/community/detail/DetailHeader';
import DetailTitle from '@/domains/community/detail/DetailTitle';
import DetailTabDesktop from '@/domains/community/detail/tab/DetailTabDesktop';
import { Post } from '@/domains/community/types/post';
import Comment from '@/domains/community/detail/Comment';
import StarBg from '@/domains/shared/components/star-bg/StarBg';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import DetailSkeleton from '@/domains/community/detail/DetailSkeleton';

function Page() {
  const params = useParams();
  const [postDetail, setPostDetail] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) return <DetailSkeleton />;
  if (!postDetail) return null;

  const {
    categoryName,
    title,
    userNickName,
    createdAt,
    viewCount,
    postId,
    tags,
    content,
    likeCount,
    commentCount,
  } = postDetail;

  return (
    <div className="w-full relative mb-20">
      <StarBg className="w-full h-32 absolute"></StarBg>
      <article className="page-layout max-w-824 z-5">
        <DetailHeader categoryName={categoryName} />
        <DetailTitle title={title} userNickname={userNickName} />
        <DetailContent
          content={content}
          createdAt={createdAt}
          viewCount={viewCount}
          postId={postId}
          tags={tags}
          likeCount={likeCount}
          commentCount={commentCount}
        />
        <section className="mb-10">
          <Comment postId={postId} />
        </section>
      </article>
      <div className="hidden md:block">
        <DetailTabDesktop likeCount={likeCount} commentCount={commentCount} />
      </div>
    </div>
  );
}

export default Page;
