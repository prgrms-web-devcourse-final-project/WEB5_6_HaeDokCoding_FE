'use client';
import { getApi } from '@/app/api/config/appConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Profile } from '../types/type';

function useFetchProfile() {

  const queryClient = useQueryClient()

  const fetchProfile = async () => {
    const res = await fetch(`${getApi}/me/profile`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
 
    return json.data
  };

  const patchNickName = useMutation({
    mutationFn: async (nickname: string) => {
      const res = await fetch(`${getApi}/me/profile`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nickname})
      })
      if (!res.ok) throw new Error('닉네임 수정 실패')
      const json = await res.json()
      return json.data
    },

    onMutate: async (nickname) => {
      // 같은 키로 요청중인 fetch 중단
      await queryClient.cancelQueries({ queryKey: ['myProfile'] })
      // 캐시에 저장된 데이터를 즉시  가져오는 역할 실패시 prev로 롤백
      const prev = queryClient.getQueryData(['myProfile'])
      // 캐시 내용을 수정
      queryClient.setQueryData(['myProfile'], (old:Profile) => ({ ...old, nickname }))
      return {prev}
    }
  })
  const profile = useQuery({queryKey:['myProfile'], queryFn:fetchProfile})

return{fetchProfile , profile, patchNickName}
}
export default useFetchProfile;
