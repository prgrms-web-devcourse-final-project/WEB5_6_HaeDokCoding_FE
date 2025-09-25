'use client';

import SelectBox from '../InputBox/SelectBox';
function CommunityFilter() {
  return (
    <section
      className="w-full flex justify-between items-center border-b-1 border-gray-light pb-1.5"
      aria-label="커뮤니티 정렬 필터"
    >
      <p aria-live="polite">100개</p>
      <SelectBox option={['최신순', '인기순', '댓글순']} title={'최신순'} />
    </section>
  );
}

export default CommunityFilter;
