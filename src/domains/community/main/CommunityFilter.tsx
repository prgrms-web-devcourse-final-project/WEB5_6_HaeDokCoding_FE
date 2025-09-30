'use client';

import { Post } from '../types/post';
import SelectBox from '@/shared/components/select-box/SelectBox';

type Props = {
  posts: Post[];
};

function CommunityFilter({ posts }: Props) {
  return (
    <section
      className="w-full flex justify-between items-center border-b-1 border-gray-light pb-1.5"
      aria-label="커뮤니티 정렬 필터"
    >
      <p aria-live="polite">{posts.length}개</p>
      <SelectBox option={['최신순', '인기순', '댓글순']} title={'최신순'} />
    </section>
  );
}

export default CommunityFilter;
