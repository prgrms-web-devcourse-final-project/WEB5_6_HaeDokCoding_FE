import { getApi } from '@/app/api/config/appConfig';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Cocktail, Sort } from '../types/types';
import { useEffect, useRef } from 'react';

interface CocktailResponse {
  data: Cocktail[];
}

interface KeepResponse {
  data: Array<{ cocktailId: number }>;
}

interface SearchFilters {
  keyword?: string;
  alcoholStrengths: string[];
  cocktailTypes: string[];
  alcoholBaseTypes: string[];
}

interface CocktailFilter extends SearchFilters {
  sortBy?: Sort;
}

interface PageParam {
  lastId: number;
  lastValue: number | string;
}


// 로그인 한 유저의 킵 칵테일을 Get으로 불러옴
const fetchKeep = async (): Promise<Set<number>> => {
  const res = await fetch(`${getApi}/me/bar`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) return new Set();

  const json: KeepResponse = await res.json();
  const myKeep = json.data ?? [];
  return new Set(myKeep.map((v: { cocktailId: number }) => v.cocktailId));
};

// 비 로그인 유저도 볼 수 있는 칵테일 API fetch 각 종 정렬 파라미터를 문자열로 받아서 정렬함
const fetchRecipe = async (
  pageParam: PageParam | null,
  size: number,
  sortBy?: Sort
): Promise<Cocktail[]> => {
  const url = new URL(`${getApi}/cocktails`);
  url.searchParams.set('size', String(size));
  if (pageParam) {
    url.searchParams.set('lastId', String(pageParam.lastId));
    url.searchParams.set('lastValue', String(pageParam.lastValue));
  }

  if (sortBy) {
    url.searchParams.set('sortBy', String(sortBy));
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!res.ok) throw new Error('레시피 패치 실패');

  const json: CocktailResponse = await res.json();

  return json.data ?? [];
};

// 검색전용 API 여기서 필터링 토글도 받음
const searchCocktails = async (filters: SearchFilters): Promise<Cocktail[]> => {
  const body = {
    keyword: filters.keyword?.trim() ?? '',
    alcoholStrengths: filters.alcoholStrengths,
    cocktailTypes: filters.cocktailTypes,
    alcoholBaseTypes: filters.alcoholBaseTypes,
    page: 0,
    size: 20,
  };

  const res = await fetch(`${getApi}/cocktails/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error('검색 POST 실패');

  const json: CocktailResponse = await res.json();
  return json.data ?? [];
};

// 적용된 필터
const hasActiveFilters = (filters: SearchFilters): boolean => {
  return !!(
    filters.keyword?.trim() ||
    filters.alcoholStrengths.length > 0 ||
    filters.cocktailTypes.length > 0 ||
    filters.alcoholBaseTypes.length > 0
  );
};


export const useKeepQuery = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ['keeps', user?.id],
    queryFn: fetchKeep,
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
};

// 무한스크롤 fetch
export const useCocktailsInfiniteQuery = (size: number = 20, sortBy?: Sort) => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const prevSortBy = useRef(sortBy);
  const { data:keepIds } = useKeepQuery()

  useEffect(() => {
    if (prevSortBy.current !== undefined && prevSortBy.current !== sortBy) {
      queryClient.removeQueries({
        queryKey: ['cocktails', 'infinite', prevSortBy.current],
      });
    }
    prevSortBy.current = sortBy;
  }, [sortBy, queryClient]);

  return useInfiniteQuery({
    queryKey: ['cocktails', 'infinite', sortBy, size, user?.id],
    queryFn: async ({ pageParam }) => {
      const cocktails = await fetchRecipe(pageParam, size, sortBy);

      if (user && keepIds) {
        return cocktails.map((item) => ({
          ...item,
          isKeep : keepIds.has(item.cocktailId)
        }))
      }

      return cocktails;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.length < size) {
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1];
      if (!lastItem) return undefined;

      let lastValue: number | string;

      switch (sortBy) {
        case 'keeps':
          lastValue = lastItem.keepCount ?? lastItem.cocktailId;
          break;
        case 'comments':
          lastValue = lastItem.commentCount ?? lastItem.cocktailId;
          break;
        case 'recent':
        default:
          lastValue = lastItem.cocktailId;
          break;
      }

      return {
        lastId: lastItem.cocktailId,
        lastValue: lastValue,
      };
    },
    initialPageParam: null as PageParam | null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000
  });
};

// 검색용 fetch
export const useCocktailsSearchQuery = (filters: SearchFilters) => {
  const user = useAuthStore((state) => state.user);
  const isActive = hasActiveFilters(filters);
  const {data: keepIds} = useKeepQuery()

  return useQuery({
    queryKey: ['cocktails', 'search', filters, user?.id],
    queryFn: async () => {
      const cocktails = await searchCocktails(filters);
      if (user && cocktails.length > 0 && keepIds) {

        return cocktails.map((item) => ({
          ...item,
          isKeep: keepIds.has(item.cocktailId),
        }));
      }
      return cocktails;
    },
    enabled: isActive,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });
};

// 검색모드를 전환하여 어떤 fetch를 하는지 결정
export const useCocktails = (
  filters: CocktailFilter,
  infiniteScrollSize: number = 20,
  sortBy?: Sort
) => {
  const isSearchMode = hasActiveFilters(filters);
  const infiniteQuery = useCocktailsInfiniteQuery(infiniteScrollSize, sortBy);
  const searchQuery = useCocktailsSearchQuery(filters);

  if (isSearchMode) {
    return {
      data: searchQuery.data ?? [],
      noResults: searchQuery.data?.length === 0,
      isSearchMode: true,
      fetchNextPage: undefined,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }

  const allCocktails = infiniteQuery.data?.pages.flatMap((page) => page) ?? [];
  const uniqueCocktails = allCocktails.filter(
    (cocktail, index, self) => index === self.findIndex((c) => c.cocktailId === cocktail.cocktailId)
  );

  const hasDuplicates = allCocktails.length !== uniqueCocktails.length;
  return {
    data: uniqueCocktails,
    noResults: false,
    isSearchMode: false,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: hasDuplicates ? false : infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
};
