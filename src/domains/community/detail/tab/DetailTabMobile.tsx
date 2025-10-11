'use client';

import Share from '@/domains/shared/components/share/Share';
import LikeBtn from '../../components/like/LikeBtn';

type Props = {
  likeCount: number;
  like: boolean;
  onLikeToggle: () => void;
};

function DetailTabMobile({ likeCount, onLikeToggle, like }: Props) {
  return (
    <section
      aria-label="게시글 인터랙션 버튼"
      className="absolute w-full bottom-5 left-0 transition-transform duration-150"
    >
      <div className="flex w-full h-full justify-start items-center gap-3">
        <div className="flex justify-center w-auto items-center gap-1 text-sm text-gray">
          <LikeBtn size="sm" isClick={like} onClick={onLikeToggle} />
          <span>{likeCount}</span>
        </div>
        <div className="flex items-center">
          <Share variants="community" size="sm" />
        </div>
      </div>
    </section>
  );
}

export default DetailTabMobile;
