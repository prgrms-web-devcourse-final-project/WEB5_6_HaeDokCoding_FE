'use client';

import SelectBox from '../InputBox/SelectBox';
function CommunityFilter() {
  return (
    <div className="w-full flex justify-between items-center border-b-1 border-gray-light pb-1.5">
      <span>100개</span>
      <SelectBox option={['최신순', '인기순', '댓글순']} title={'최신순'} />
    </div>
  );
}

export default CommunityFilter;
