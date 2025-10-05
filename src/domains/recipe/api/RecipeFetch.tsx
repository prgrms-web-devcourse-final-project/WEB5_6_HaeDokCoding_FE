'use client';

import { getApi } from '@/app/api/config/appConfig';
import { Cocktail } from '../types/types';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface Props {
  setData: React.Dispatch<React.SetStateAction<Cocktail[]>>;
  lastId: number | null;
  setLastId: Dispatch<SetStateAction<number | null>>;
  hasNextPage: boolean;
  setHasNextPage: Dispatch<SetStateAction<boolean>>;
  SIZE?: number;
}

export const RecipeFetch = ({
  setData,
  lastId,
  setLastId,
  hasNextPage,
  setHasNextPage,
  SIZE = 20,
}: Props) => {
  const fetchData = useCallback(async () => {
    if (!hasNextPage) return;
    const url = new URL(`${getApi}/cocktails`);
    url.searchParams.set('size', String(SIZE));
    if (typeof lastId === 'number') {
      url.searchParams.set('lastId', String(lastId));
    }

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('레시피 데이터 요청실패');

    const json = await res.json();
    const list: Cocktail[] = json.data ?? [];

    setData((prev) =>
      Array.from(new Map([...prev, ...list].map((i) => [i.cocktailId, i])).values())
    );

    if (list.length > 0) {
      setLastId(list[list.length - 1].cocktailId);
    }

    setHasNextPage(list.length === SIZE);
  }, [hasNextPage, lastId, setData, setLastId, setHasNextPage, SIZE]);
  return { fetchData };
};
