import { getApi } from '@/app/api/config/appConfig';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction } from 'react';

export function useConfirm(
  state: boolean | null,
  setIsAlarm: Dispatch<SetStateAction<boolean | null>>,
  setIsClick: Dispatch<SetStateAction<boolean>>
) {
  const { toastSuccess } = useToast();
  const next = !state;
  const patchAlarm = async () => {
    await fetch(`${getApi}/me/notification-setting`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: next,
      }),
    });
    setIsAlarm(next);
    setIsClick(false);

    (await next) ? toastSuccess('알림이 설정되었습니다.') : toastSuccess('알림이 해제되었습니다');
  };
  return { patchAlarm };
}
