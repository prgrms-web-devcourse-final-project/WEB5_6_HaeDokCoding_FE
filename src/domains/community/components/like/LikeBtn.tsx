import LikeIcon from '@/shared/assets/icons/like_28.svg';
import { useState } from 'react';

type Props = {
  size: 'sm' | 'md';
  onClick?: () => void;
  isClick?: boolean | null; // 외부에서 제어
};

function LikeBtn({ size, onClick, isClick = false }: Props) {
  return (
    <button
      type="button"
      className={`${size === 'md' ? 'w-13.75 h-13.75 flex-center border-1 border-white rounded-full' : ''} bg-primary`}
      aria-label="좋아요 버튼"
      aria-pressed={isClick ? isClick : false}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <LikeIcon
        fill={`${isClick ? '#81689d' : 'transparent'}`}
        className="duration-100  hover:[&_*]:fill-tertiary/50 [&_*]:duration-200"
        aria-hidden
      />
    </button>
  );
}
export default LikeBtn;
