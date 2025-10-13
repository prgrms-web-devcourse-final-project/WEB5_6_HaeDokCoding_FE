import { getApi } from '@/app/api/config/appConfig';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction } from 'react';

export function useDeleteAll(
  setIsClick: Dispatch<SetStateAction<boolean>>
) {
  const { toastSuccess } = useToast();

  const deleteBar= async () => {
    await fetch(`${getApi}/me/bar`, {
      method: 'DELETE',
      credentials: 'include',
    });

    setIsClick(false);

    await toastSuccess('전부 삭제되셨습니다')
  };
  return { deleteBar };
}
