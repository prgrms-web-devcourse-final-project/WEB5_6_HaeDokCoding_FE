'use client';

import Image from 'next/image';
import prePost from '@/shared/assets/images/prepost_img.webp';

import PostInfo from '../components/post-info/PostInfo';
import Label from '@/domains/shared/components/label/Label';
import { useEffect, useState } from 'react';
import { fetchPost } from '../api/fetchPost';
import { Post } from '@/domains/community/types/post';

function PostCard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPost();
      if (!data) return;
      setPosts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

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

              <section className="flex items-start justify-between mt-3 cursor-pointer" role="link">
                <div className="flex flex-col gap-3 max-w-[500px]">
                  <p className="font-bold sm:text-xl text-lg">{title}</p>
                  <div className="font-light sm:text-[15px] text-sm">
                    <p>{content}</p>
                  </div>
                  <PostInfo
                    hasUserName={true}
                    userNickName={userNickName}
                    commentCount={commentCount}
                    viewCount={viewCount}
                    createdAt={createdAt}
                  />
                </div>
                <figure className="flex items-start">
                  <Image
                    src={prePost}
                    alt="예비사진"
                    width={120}
                    height={120}
                    className="md:w-[120px] sm:w-[100px] w-[80px] self-start"
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
