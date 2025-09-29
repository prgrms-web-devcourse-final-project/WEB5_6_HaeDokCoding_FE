'use client';

import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from '../components/post-info/PostInfo';
import Label from '@/domains/shared/components/label/Label';
import { useEffect } from 'react';
import { fetchPost } from '../api/fetchPost';
import { Post } from '@/domains/community/types/post';
import { useRouter } from 'next/navigation';

type Props = {
  posts: Post[];
  setPosts: (value: Post[]) => void;
};

function PostCard({ posts, setPosts }: Props) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPost();
      if (!data) return;
      setPosts(data);
    };
    fetchData();
  }, [setPosts]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const handlePost = (id: number) => {
    router.push(`/community/${id}`);
  };

  return (
    <>
      {posts &&
        posts.map(
          ({
            postId,
            categoryName,
            title,
            content,
            userNickName,
            commentCount,
            viewCount,
            createdAt,
            imageUrl,
          }) => (
            <article className="pt-5 pb-3 border-b-1 border-gray-light" key={postId}>
              <Label title={categoryName} />

              <section
                onClick={() => handlePost(postId)}
                className="flex items-start justify-between mt-3 cursor-pointer h-full content-between"
                role="link"
              >
                <div className="flex flex-col gap-2 max-w-[860px] h-[115px] content-between flex-grow min-h-[115px]">
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
                    commentCount={commentCount}
                    viewCount={viewCount}
                    createdAt={createdAt}
                  />
                </div>
                <figure className="flex items-center flex-shrink-0 w-[115px] h-[115px]">
                  <Image
                    src={prePost}
                    alt="예비사진"
                    width={105}
                    height={105}
                    className="w-full h-full object-cover"
                  />
                </figure>
              </section>
            </article>
          )
        )}
    </>
  );
}

export default PostCard;
