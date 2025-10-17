'use client';

import { Post } from '../types/post';
import SelectBox from '@/shared/components/select-box/SelectBox';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { fetchPostByTab } from '../api/fetchPost';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  posts: Post[] | null;
  setPosts: Dispatch<SetStateAction<Post[] | null>>;
};

const sortMap = {
  최신순: 'LATEST',
  인기순: 'POPULAR',
  댓글순: 'COMMENTS',
} as const;

function CommunityFilter({ posts, setPosts }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get('category');
  const router = useRouter();

  const handleChange = async (selectTitle: string) => {
    if (!query) return;

    const data = await fetchPostByTab({
      category: query,
      filter: sortMap[selectTitle as keyof typeof sortMap],
    });
    if (!data) return;
    setPosts(data);
  };

  return (
    <section
      className="w-full flex justify-between items-center border-b-1 border-gray-light pb-1.5"
      aria-label="커뮤니티 정렬 필터"
    >
      <p aria-live="polite">{posts && posts.length}개</p>
      <SelectBox
        option={['최신순', '인기순', '댓글순']}
        title={'최신순'}
        onChange={(value) => {
          const sortValue = sortMap[value as keyof typeof sortMap];

          handleChange(value);
          router.push(`?category=${query || '전체'}&postSortStatus=${sortValue}`);
        }}
      />
    </section>
  );
}

export default CommunityFilter;
