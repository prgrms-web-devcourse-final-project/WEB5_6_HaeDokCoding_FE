'use client';

import Share from '@/domains/shared/share/Share';
import LikeBtn from '../../components/like/LikeBtn';

function DetailTabMobile() {
  return (
    <section
      aria-label="게시글 인터랙션 버튼"
      className="absolute w-full bottom-5 left-0 transition-transform duration-150"
    >
      <div className="flex w-full h-full justify-start items-center gap-3">
        <div className="flex justify-center items-center gap-1 text-sm text-gray">
          <LikeBtn size="sm" />
          <span>2</span>
        </div>
        <div className="flex items-center">
          <Share variants="community" size="sm" />
        </div>
      </div>
    </section>
  );
}

export default DetailTabMobile;
