'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { useIntersectionObserver } from '@/domains/shared/hook/useIntersectionObserver';
import { Cocktail } from '../../types/types';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { useScrollRestore } from '@/domains/shared/hook/useMemoScroll';

interface Props {
  cocktails: Cocktail[];
  RecipeFetch?: (cursor?: string | undefined) => Promise<void>;
  hasNextPage: boolean;
  lastId: number | null;
}

function CocktailList({ cocktails, RecipeFetch, hasNextPage, lastId }: Props) {
  const cocktailRef = useRef(null);
  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (!RecipeFetch) return;
    if (!lastId) return;
    if (entry.isIntersecting && lastId > 1) {
      RecipeFetch();
    }
  };

  useIntersectionObserver(cocktailRef, onIntersect, hasNextPage);
  const saveScroll = useScrollRestore({
    lastId,
    fetchData: RecipeFetch!,
    hasNextPage,
    currentDataLength: cocktails.length,
  });
  return (
    <ul
      className="
    grid gap-8 lg:justify-between justify-center
    [grid-template-columns:repeat(1,minmax(0,250px))]
    sm:[grid-template-columns:repeat(2,minmax(0,250px))]
    md:[grid-template-columns:repeat(3,minmax(0,250px))]
    lg:[grid-template-columns:repeat(4,minmax(0,250px))]
  "
    >
      {cocktails.map(
        ({
          cocktailImgUrl,
          cocktailId,
          cocktailName,
          cocktailNameKo,
          alcoholStrength,
          isFavorited,
        }) => (
          <li key={cocktailId} onClick={saveScroll} className="w-full">
            <Link href={`/recipe/${cocktailId}`}>
              <CocktailCard
                favor={isFavorited}
                id={cocktailId}
                src={cocktailImgUrl}
                name={cocktailName}
                nameKo={cocktailNameKo}
                alcohol={alcoholStrength}
              />
            </Link>
          </li>
        )
      )}
      <div ref={cocktailRef} className="h-2"></div>
    </ul>
  );
}
export default CocktailList;
