'use client';

import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from '../components/post-info/PostInfo';
import Label from '@/domains/shared/components/label/Label';
import { Post } from '@/domains/community/types/post';
import { useRouter } from 'next/navigation';
import CommunitySkeleton from './CommunitySkeleton';

type Props = {
  posts: Post[];
  isLoading: boolean;
};

function PostCard({ posts, isLoading }: Props) {
  const router = useRouter();

  const handlePost = (id: number) => {
    router.push(`/community/${id}`);
  };

  if (isLoading) return <CommunitySkeleton />;
  if (posts.length === 0)
    return (
      <div className="w-full flex items-center justify-center mt-20">작성된 글이 없습니다.</div>
    );

  return (
    <>
      {posts.map(({ postId, categoryName, title, content, userNickName, viewCount, createdAt }) => (
        <article className="pt-5 pb-3 border-b-1 border-gray-light" key={postId}>
          <Label title={categoryName} />

          <section
            onClick={() => handlePost(postId)}
            className="flex items-start justify-between mt-3 cursor-pointer h-full content-between"
            role="link"
          >
            <div className="flex flex-col gap-2 max-w-[860px] flex-grow">
              <p className="font-bold sm:text-xl text-lg">{title}</p>
              <div className="font-light sm:text-[15px] text-sm md:max-w-[850px] sm:max-w-[500px] max-w-[210px] h-full">
                <p
                  className="h-10"
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
                postId={postId}
              />
            </div>
            <figure className="flex items-center flex-shrink-0 md:w-[115px] md:h-[115px] w-[85px] h-[85px]">
              <Image
                src={prePost}
                alt="예비사진"
                width={105}
                height={105}
                className="w-full h-full object-cover self-center"
              />
            </figure>
          </section>
        </article>
      ))}
    </>
  );
}

export default PostCard;
