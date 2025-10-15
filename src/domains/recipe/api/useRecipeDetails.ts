import { getApi } from '@/app/api/config/appConfig';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useQuery } from '@tanstack/react-query';

const fetchKeep = async () => {
  const res = await fetch(`${getApi}/me/bar`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) return new Set();

  const json = await res.json();
  const mykeep = json.data;

  return new Set(mykeep.map((v: { cocktailId: number }) => v.cocktailId));
};

const fetchRecipe = async (id: number) => {
  const res = await fetch(`${getApi}/cocktails/${id}`, {
    method: 'GET',
  });

  if (!res.ok) throw new Error('상세페이지 fetch 실패');
  const json = await res.json();
  return json.data ?? [];
};

export const useDetailRecipe = (id: number) => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['detail', id, user?.id],
    queryFn: async () => {
      const recipe = await fetchRecipe(id);
      const keep = user ? await fetchKeep() : null;
      const iskept = keep ? keep.has(Number(id)) : false;
      return { recipe, iskept };
    },
  });
};
