import { getApi } from '@/app/api/config/appConfig';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Cocktail } from '../types/types';

type Filters = {
  base: string[];
  abv: string[];
  type: string[];
  keyword: string;
  isSearching: boolean;
};

type PageResult<T> = { items: T[]; nextCursor?: number | { page: number } };

async function fetchCocktails(cursor?: number, size = 20): Promise<PageResult<Cocktail>> {
  const query = new URLSearchParams();
  if (cursor == null) query.set('lastId', String(cursor));
  query.set('size', size.toString());
  query.set('sortBy', 'recent');

  const res = await fetch(`${getApi}/cocktails?${query.toString()}`);
  if (!res.ok) throw new Error('칵테일 패치 실패');
  const json = await res.json();
  const items = json.data ?? [];

  const next = items.length < size ? undefined : items[items.length - 1].cocktail;
  return { items, nextCursor: next };
}

async function fetchSearch(page = 0, size = 20, f: Filters): Promise<PageResult<Cocktail>> {
  const body = {
    keyword: f.keyword || null,
    alcoholStrength: f.abv ?? [],
    cocktailTypes: f.type ?? [],
    alcoholBaseTypes: f.base ?? [],
    page,
    size,
  };
  const res = await fetch(`/${getApi}/cocktails/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('검색 실패');
  const json = await res.json();
  const items = json.data ?? [];

  const next = items.length < size ? undefined : { page: page + 1 };
  return { items, nextCursor: next };
}

function useCocktails(filters: Filters, pageSize = 20) {
  const mode = filters.isSearching ? 'search' : 'list';

  return useInfiniteQuery({
    queryKey: [
      'cocktails',
      { mode, base: filters.base, abv: filters.abv, type: filters.type, q: filters.keyword },
    ],
    queryFn: ({ pageParam }) => {
      if (mode === 'search') {
        const page = typeof pageParam === 'number' ? pageParam : 0;
        return fetchSearch(page, pageSize, filters);
      }
      const lastId = typeof pageParam === 'number' ? pageParam : undefined;
      return fetchCocktails(lastId, pageSize);
    },
    initialPageParam: mode === 'search' ? 0 : undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor, // number(=lastId) 또는 {page}
    enabled: mode === 'search' ? !!filters.keyword.trim() : true,

    staleTime: 30_000,
  });
}
export default useCocktails;
