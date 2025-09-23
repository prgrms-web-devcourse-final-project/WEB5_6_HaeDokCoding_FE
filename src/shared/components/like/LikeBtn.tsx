import LikeIcon from '@/shared/assets/icons/like_28.svg';
import { useState } from 'react';

function LikeBtn() {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <button
      type="button"
      className="w-13.75 h-13.75 flex-center border-1 border-white rounded-full"
      aria-label="좋아요 버튼"
      aria-pressed={isClick}
      onClick={handleClick}
    >
      <LikeIcon
        fill={`${isClick ? '#81689d' : null}`}
        className="duration-100  hover:[&_*]:fill-tertiary/50 [&_*]:duration-200"
        aria-hidden
      />
    </button>
  );
}
export default LikeBtn;
