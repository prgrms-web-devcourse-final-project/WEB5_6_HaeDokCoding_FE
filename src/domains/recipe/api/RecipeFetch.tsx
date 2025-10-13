'use client';

import { getApi } from '@/app/api/config/appConfig';
import { Cocktail } from '../types/types';
import { Dispatch, SetStateAction, useCallback} from 'react';
import { useAuthStore } from '@/domains/shared/store/auth';

interface Props {
  setData: React.Dispatch<React.SetStateAction<Cocktail[]>>;
  lastId: number | null;
  setLastId: Dispatch<SetStateAction<number | null>>;
  hasNextPage: boolean;
  setHasNextPage: Dispatch<SetStateAction<boolean>>;
  SIZE?: number;
}

// api/cocktais fetch용
export const RecipeFetch = ({
  setData,
  lastId,
  setLastId,
  hasNextPage,
  setHasNextPage,
  SIZE = 20,
}: Props) => {
  const user = useAuthStore(state => state.user);
  const fetchData = useCallback(async () => {
    // 쿼리파라미터에 값 넣기
    if (!hasNextPage) return;
    const url = new URL(`${getApi}/cocktails`);
    url.searchParams.set('size', String(SIZE));
    if (typeof lastId === 'number') {
      url.searchParams.set('lastId', String(lastId));
    }
    url.searchParams.set('LastValue', String(lastId));

    const recipeRes = await fetch(url.toString(), {
      method: 'GET',
    });
    if (!recipeRes.ok) throw new Error('데이터 요청 실패');
    const recipeJson = await recipeRes.json();
    const list: Cocktail[] = recipeJson.data ?? [];

    if (user) {
      const keepRes = await fetch(`${getApi}/me/bar`, {
        method: 'GET',
        credentials: 'include',
      });
      const bars = keepRes.ok ? ((await keepRes.json()).data ?? []) : [];
      const favoriteIds = new Set(bars.map((m: { cocktailId: number }) => m.cocktailId));
      const merged = list.map((item) => ({
        ...item,
        isFavorited: favoriteIds.has(item.cocktailId),
      }));
      setData((prev) =>
        Array.from(
          new Map<number, Cocktail>([...prev, ...merged].map((i) => [i.cocktailId, i])).values()
        )
      );
    } else {
      setData((prev) =>
        Array.from(
          new Map<number, Cocktail>([...prev, ...list].map((i) => [i.cocktailId, i])).values()
        )
      );
    }

    if (list.length > 0) {
      setLastId(list[list.length - 1].cocktailId);
    }
    setHasNextPage(list.length === SIZE);
  }, [hasNextPage, lastId, setData, setLastId, setHasNextPage, SIZE]);
  return { fetchData };
};
