import KeepIcon from '@/shared/assets/icons/keep_36.svg';
import KeepIconActive from '@/shared/assets/icons/keep_active_36.svg';

import { useState } from 'react';
function Keep() {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <button type="button" onClick={handleClick} aria-label="킵 버튼">
      {isClick ? (
        <KeepIcon
          fill="transparent"
          className="[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.8))] [&_*]:duration-100 hover:[&_*]:fill-secondary/60"
          aria-hidden
        />
      ) : (
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
      )}
    </button>
  );
}
export default Keep;
