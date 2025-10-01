'use client';

import { useEffect, useState } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import { getApi } from '@/app/api/config/appConfig';

export interface Cocktail {
  alcoholStrength: 'NON_ALCOHOLIC' | 'WEAK' | 'LIGHT' | 'MEDIUM' | 'STRONG' | 'VERY_STRONG';
  cocktailId: number;
  cocktailName: string;
  cocktailImgUrl: string;
  cocktailNameKo: string;
}

function Cocktails() {
  const SIZE = 20;
  const [data, setData] = useState<Cocktail[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const num = data.map((a) => a.cocktailId);
  const RecipeFetch = async () => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);

    try {
      // lastId 초기값이 null값이어서 URL로 받음
      const url = new URL(`${getApi}/cocktails`);
      url.searchParams.set('size', String(SIZE));
      if (typeof lastId == 'number') {
        url.searchParams.set('lastId', String(lastId));
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('레시피 데이터 요청실패');

      const json = await res.json();
      const list: Cocktail[] = json.data ?? [];

      setData((prev) => [...prev, ...list]);

      if (list.length > 0) {
        setLastId(list[list.length - 1].cocktailId);
      }

      setHasNextPage(list.length === SIZE);
    } catch (err) {
      console.error('fetchError', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    RecipeFetch();
  }, []);

  return (
    <section>
      <CocktailFilter cocktailsEA={num} />
      <section className="mt-5 ">
        <CocktailList
          cocktails={data}
          RecipeFetch={RecipeFetch}
          hasNextPage={hasNextPage}
          lastId={lastId}
        />
      </section>
    </section>
  );
}
export default Cocktails;
