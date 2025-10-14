import { getApi } from "@/app/api/config/appConfig";
import { useAuthStore } from "@/domains/shared/store/auth";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Cocktail } from "../types/types";



interface CocktailResponse {
  data: Cocktail[]
}

interface KeepResponse{
  data: Array<{cocktailId:number}>
}

interface SearchFilters {
  keyword?: string;
  alcoholStrengths: string[];
  cocktailTypes: string[];
  alcoholBaseTypes: string[];
}

type Sort = 'recent' | 'keeps' | 'comments'

interface CocktailFilter extends SearchFilters{
  sortBy?:Sort
}


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


  const fetchRecipe = async (
  lastId: number | null,
  size: number,
    sortBy?: Sort
  ): Promise<Cocktail[]> => {
    
    const url = new URL(`${getApi}/cocktails`)
    url.searchParams.set('SIZE',String(size))
    url.searchParams.set('lastId', String(lastId))
    url.searchParams.set('lastValue', String(lastId));


    if (sortBy) {
      url.searchParams.set('sortBy',sortBy)
    }


    const res = await fetch(url.toString(), {
      method:'GET'
    })

    if (!res.ok) throw new Error('레시피 패치 실패')
    
    const json:CocktailResponse = await res.json()

    return json.data ?? []
  }

  

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
    body:JSON.stringify(body)
  })

  if(!res.ok) throw new Error('검색 POST 실패')

    const json:CocktailResponse = await res.json()
    return json.data ?? []
}
  

const hasActiveFilters = (filters: SearchFilters): boolean => {
  return !!(
    filters.keyword?.trim() ||
    filters.alcoholStrengths.length > 0 ||
    filters.cocktailTypes.length > 0 ||
    filters.alcoholBaseTypes.length > 0
  );
};


export const useCocktailsInfiniteQuery = (
  size: number = 20,
  sortBy?: Sort
) => {
    const user = useAuthStore((state) => state.user);
    
    return useInfiniteQuery({
      queryKey: ['cocktails','infinite',sortBy, size, user?.id],
      queryFn: async ({ pageParam }) => {
        const cocktails = await fetchRecipe(pageParam,size,sortBy)

        if (user) {
          const keepId = await fetchKeep()
          return cocktails.map((item) => ({
            ...item,
            isKeep: keepId.has(item.cocktailId)
          }))
        }

        return cocktails
      },
      getNextPageParam: (lastpage) => {
        if(lastpage.length < size) return undefined
        return lastpage[lastpage.length - 1]?.cocktailId ?? undefined
      },
      initialPageParam: 345
    })
}


export const useCocktailsSearchQuery = (filters:SearchFilters) => {
  const user = useAuthStore(state => state.user)
  const isActive = hasActiveFilters(filters)

  return useQuery({
    queryKey: ['cocktails', 'search',  filters, user?.id],
    queryFn: async () => {
      const cocktails = await searchCocktails(filters)
      if (user && cocktails.length > 0) {
        const keepId = await fetchKeep()
        return cocktails.map((item) => ({
          ...item,
          isKeep: keepId.has(item.cocktailId)
        }))
      }
      return cocktails
    },
    enabled: isActive,
    refetchOnMount:false,
  })
}

export const useCocktails = (filters: CocktailFilter, infiniteScrollSize: number = 20) => {
  const isSearchMode = hasActiveFilters(filters);
  const infiniteQuery = useCocktailsInfiniteQuery(infiniteScrollSize, filters.sortBy);
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

  return {
    data: allCocktails,
    noResults: false,
    isSearchMode: false,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
  };
};
