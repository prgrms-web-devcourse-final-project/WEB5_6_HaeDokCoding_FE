'use client';
import SsuryAlram from '@/shared/assets/ssury/ssury_bell.webp';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

function Alarm() {
  const [isClick, setIsClick] = useState(false);

  const handleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <div
      className={clsx(
        `px-3 md:px-5 py-4 h-auto md:h-33 cursor-pointer bg-gray-dark/80 rounded-2xl`,
        isClick ? 'opacity-50' : 'bg-gray-dark/80'
      )}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image src={SsuryAlram} alt="알람" width={40} height={40} />
            <p className="text-sm text-white/80">9월 18일</p>
          </div>
          <p className="text-sm text-white/80">10분 전</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">새로운 좋아요 알림</h2>
          <p className="text-sm text-white/80">User님이 내 글에 좋아요를 누르셨습니다.</p>
        </div>
      </div>
    </div>
  );
}
export default Alarm;
