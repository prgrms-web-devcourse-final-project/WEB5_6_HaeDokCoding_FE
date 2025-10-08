'use client';
import { getApi } from '@/app/api/config/appConfig';
import { useToast } from '@/shared/hook/useToast';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

function ToggleBtn() {
  const [isClick, setIsClick] = useState<boolean | null>(null);
  const { toastSuccess } = useToast();

  useEffect(() => {
    const fetchToggle = async () => {
      try {
        const res = await fetch(`${getApi}/me/notification-setting`, {
          method: 'GET',
          credentials: 'include',
        });
        const json = await res.json();
        setIsClick(json.data.enabled);
      } catch {
        console.error();
      }
    };
    fetchToggle();
  }, []);

  const handleClick = async () => {
    if (isClick === null) return;
    const next = !isClick;
    setIsClick(next);

    await fetch(`${getApi}/me/notification-setting`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: next,
      }),
    });
    next ? toastSuccess('알림이 설정되었습니다.') : toastSuccess('알림이 해제되었습니다');
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
