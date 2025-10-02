'use client';

import { useState, useEffect } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import { getApi } from '@/app/api/config/appConfig';
import { Cocktail } from '../types/types';
import { useScrollRestoration } from '../../shared/hook/useMemoScroll';

function Cocktails() {
  const SIZE = 20;
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    setData,
    lastId,
    setLastId,
    hasNextPage,
    setHasNextPage,
    handleItemClick,
    shouldFetch,
  } = useScrollRestoration<Cocktail>({
    storageKey: 'cocktails_scroll_state',
    eventName: 'resetCocktailsScroll',
  });

  const num = data.map((a) => a.cocktailId);

  const RecipeFetch = async () => {
    if (isLoading || !hasNextPage) {
      return;
    }

    setIsLoading(true);

    try {
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // shouldFetch가 true일 때 fetch 실행
  useEffect(() => {
    if (shouldFetch && data.length === 0) {
      RecipeFetch();
    }
  }, [shouldFetch]);

  return (
    <section>
      <CocktailFilter cocktailsEA={num} />
      <section className="mt-5">
        <CocktailList
          cocktails={data}
          RecipeFetch={RecipeFetch}
          hasNextPage={hasNextPage}
          lastId={lastId}
          onItemClick={handleItemClick}
        />
      </section>
    </section>
  );
}

export default Cocktails;
