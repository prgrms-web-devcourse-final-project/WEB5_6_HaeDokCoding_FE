'use client';
import { getApi } from '@/app/api/config/appConfig';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import AlarmConfirm from './pages/my-alarm/AlarmConfirm';

function ToggleBtn() {
  const [isAlarm, setIsAlarm] = useState<boolean | null>(null);
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    const fetchToggle = async () => {
      try {
        const res = await fetch(`${getApi}/me/notification-setting`, {
          method: 'GET',
          credentials: 'include',
        });
        const json = await res.json();
        setIsAlarm(json.data.enabled);
      } catch {
        console.error();
      }
    };
    fetchToggle();
  }, []);

  const handleClick = async () => {
    setIsClick(true);
  };

  return (
    <div>
      {isClick && (
        <AlarmConfirm
          open={isClick}
          onClose={() => setIsClick(false)}
          state={isAlarm}
          cancle={() => setIsClick(isClick)}
          setIsAlarm={setIsAlarm}
          setIsClick={setIsClick}
        />
      )}
      <button
        className={clsx(
          'rounded-full flex py-0.5 pl-[2px] w-17 h-7 duration-300',
          isAlarm ? 'bg-tertiary' : 'bg-white'
        )}
        onClick={handleClick}
      >
        <div
          className={clsx(
            'rounded-full w-6 h-6 duration-300',
            isAlarm ? 'bg-secondary translate-x-10' : 'bg-gray-dark'
          )}
        ></div>
      </button>
    </div>
  );
}
export default ToggleBtn;
