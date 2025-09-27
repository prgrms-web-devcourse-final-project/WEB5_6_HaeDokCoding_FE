'use client';
import clsx from 'clsx';
import { useState } from 'react';

function ToggleBtn() {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <button
      className={clsx(
        'rounded-full flex py-0.5 pl-[2px] w-17 h-7 duration-300',
        isClick ? 'bg-tertiary' : 'bg-white'
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'rounded-full w-6 h-6 duration-300',
          isClick ? 'bg-secondary translate-x-10' : 'bg-gray-dark'
        )}
      ></div>
    </button>
  );
}
export default ToggleBtn;
