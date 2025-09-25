import CommentIcon from '@/shared/assets/icons/comment_28.svg';
import { useState } from 'react';

function CommentBtn({ size }: { size: 'sm' | 'md' }) {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <button
      type="button"
      className={`${size === 'md' ? 'w-13.75 h-13.75 flex-center border-1 border-white rounded-full' : ''} bg-primary`}
      aria-label="코멘트 버튼"
      aria-pressed={isClick}
      onClick={handleClick}
    >
      <CommentIcon
        className="duration-100  hover:[&_*]:fill-tertiary/50 [&_*]:duration-200"
        aria-hidden
      />
    </button>
  );
}
export default CommentBtn;
