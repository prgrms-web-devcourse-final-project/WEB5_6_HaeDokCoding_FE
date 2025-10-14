import { getApi } from '@/app/api/config/appConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useFetchMyBar() {
  const queryClient = useQueryClient();

  const fetchMyBar = async () => {
    const res = await fetch(`${getApi}/me/bar/detail`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    return json.data;
  };

  const deleteMyBar = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${getApi}/me/bar`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('전체 삭제 실패');
      const json = await res.json();
      return json.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['myBar'] });
      const prev = queryClient.getQueryData(['myBar']);
      queryClient.setQueryData(['myBar'], []);
      return { prev };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myBar'] });
    },
  });

  return { fetchMyBar, deleteMyBar };
}

export default useFetchMyBar;
