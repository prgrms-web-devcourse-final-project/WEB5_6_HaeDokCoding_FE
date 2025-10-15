'use client';

import Image from 'next/image';

import PostInfo from '../components/post-info/PostInfo';
import Label from '@/domains/shared/components/label/Label';
import { Post } from '@/domains/community/types/post';
import { useRouter } from 'next/navigation';
import { useInfiniteScrollObserver } from '@/shared/hook/useInfiniteScrollObserver';
import { useRef } from 'react';

type Props = {
  posts: Post[] | null;
  setPost?: (value: Post[] | null) => void;
  isLoading: boolean;
  setIsLoading?: (value: boolean) => void;
  isEnd?: boolean;
  onLoadMore?: (lastPostId: number) => Promise<void>;
};

function PostCard({ posts, isLoading, isEnd, onLoadMore }: Props) {
  const router = useRouter();
  const firstItemRef = useRef<HTMLElement | null>(null);

  const handlePost = (id: number) => {
    router.push(`/community/${id}`);
  };

  const observeLastItem = useInfiniteScrollObserver<HTMLElement>({
    items: posts,
    isEnd,
    onLoadMore: onLoadMore ?? (() => {}),
  });

  if (posts && posts.length === 0 && !isLoading)
    return (
      <div className="w-full flex items-center justify-center mt-20">작성된 글이 없습니다.</div>
    );

  return (
    <>
      {posts &&
        posts.map(
          (
            {
              postId,
              categoryName,
              title,
              content,
              userNickName,
              viewCount,
              createdAt,
              commentCount,
              imageUrls,
            },
            index
          ) => {
            const isLast = index === posts.length - 1;
            return (
              <article
                className="py-4 sm:py-5 border-b-1 border-gray-light"
                key={postId + createdAt}
                ref={(el) => {
                  if (index === 0) firstItemRef.current = el;
                  if (isLast) {
                    observeLastItem(el);
                  }
                }}
              >
                <Label title={categoryName} />

                <section
                  onClick={() => handlePost(postId)}
                  className="flex items-center gap-3 justify-between mt-3 cursor-pointer h-full"
                  role="link"
                >
                  <div className="flex flex-col gap-3 md:max-w-[51.25rem] sm:max-w-[27.5rem] max-w-[19.375rem] flex-grow content-between h-full">
                    <p className="font-bold sm:text-xl text-lg">{title}</p>
                    <div className="font-light sm:text-[15px] text-sm md:max-w-[820px] sm:max-w-[440px] max-w-[210px] h-full">
                      <p
                        className="h-10 whitespace-pre-line"
                        style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {content}
                      </p>
                    </div>
                    <PostInfo
                      hasUserName={true}
                      userNickName={userNickName}
                      viewCount={viewCount}
                      createdAt={createdAt}
                      commentCount={commentCount}
                    />
                  </div>
                  <figure className="flex items-center flex-shrink-0 md:w-[115px] md:h-[115px] w-[85px] h-[85px]">
                    {imageUrls.length > 0 && (
                      <Image
                        src={imageUrls[0]}
                        alt="예비사진"
                        width={105}
                        height={105}
                        className="w-full h-full object-cover self-center rounded-md"
                      />
                    )}
                  </figure>
                </section>
              </article>
            );
          }
        )}

      {/* 무한 스크롤 로딩 인디케이터 */}
      {isLoading && posts && posts.length > 0 && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <span className="text-sm">더 많은 게시글을 불러오는 중...</span>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;
