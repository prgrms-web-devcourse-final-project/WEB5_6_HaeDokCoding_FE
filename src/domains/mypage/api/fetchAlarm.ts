import { getApi } from "@/app/api/config/appConfig";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useFetchAlarm() {
  const queryClient = useQueryClient()

  const fetchAlarm = async () => {
    const res = await fetch(`${getApi}/me/notifications`, {
      method: 'GET',
      credentials:'include'
    })
    const json = await res.json()
    return json.data
  }

  const deleteAlarm = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${getApi}/me/notifications`, {
        method: 'DELETE',
        credentials:'include'
      })
      if (!res.ok) throw new Error('알림 제거 에러')
      const json = await res.json()
      return json.data
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['alarm'] })
      const prev = queryClient.getQueryData(['alarm'])
      queryClient.setQueryData(['alarm'], [])
      return {prev}
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['alarm']})
    }
  })
  return {fetchAlarm,deleteAlarm}
}
export default useFetchAlarm