'use client';
import SsuryAlram from '@/shared/assets/ssury/ssury_bell.webp';
import { elapsedTime } from '@/shared/utills/elapsedTime';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  title: string;
  content: string;
  createdAt:Date
  read:boolean
}

function Alarm({ title, content,createdAt,read }: Props) {
  const [isClick, setIsClick] = useState(read);
  const date = new Date(createdAt)
  const alarmDate = `${date.getMonth() + 1}월 ${date.getDate()}일`
  const time = elapsedTime(createdAt.toString())
  
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
            <p className="text-sm text-white/80">{alarmDate}</p>
          </div>
          <p className="text-sm text-white/80">{time}</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">{content}</h2>
          <p className="text-sm text-white/80">{title}</p>
        </div>
      </div>
    </div>
  );
}
export default Alarm;
