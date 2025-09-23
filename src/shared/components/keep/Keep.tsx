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
        <KeepIcon fill="transparent" className="[&_*]:duration-100 hover:[&_*]:fill-secondary/50" />
      ) : (
        <KeepIconActive
          fill="transparent"
          className="[&_*]:duration-100 hover:[&_*]:fill-secondary/50 "
        />
      )}
    </button>
  );
}
export default Keep;
