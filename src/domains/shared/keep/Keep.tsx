'use client';
import KeepIcon from '@/shared/assets/icons/keep_36.svg';
import KeepIconActive from '@/shared/assets/icons/keep_active_36.svg';
import { useState } from 'react';

interface Props {
  className?: string;
}

function Keep({ className }: Props) {
  const [isClick, setIsClick] = useState(false);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsClick(!isClick);
  };

  return (
    <button type="button" className={className} onClick={handleClick} aria-label="킵 버튼">
      {isClick ? (
        <KeepIconActive
          fill="transparent"
          className="   
          [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.8))]
         [&_*]:duration-200
         &_g>g>path[stroke]]:stroke-black
          [&_g>path[fill='black']]:black
          hover:[&_g>g>path]:fill-secondary/60
          "
          aria-hidden
        />
      ) : (
        <KeepIcon
          fill="transparent"
          className="[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.8))] [&_*]:duration-100 hover:[&_*]:fill-secondary/60"
          aria-hidden
        />
      )}
    </button>
  );
}
export default Keep;
