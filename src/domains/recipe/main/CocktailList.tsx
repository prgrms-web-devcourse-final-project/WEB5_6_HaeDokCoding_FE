'use client';
import { useRef } from 'react';

import Link from 'next/link';
import { useIntersectionObserver } from '@/domains/shared/hook/useIntersectionObserver';
import { Cocktail } from '../types/types';
import CocktailCard from '@/domains/shared/components/cocktailCard/CocktailCard';

interface Props {
  cocktails: Cocktail[];
  RecipeFetch: (cursor?: string | undefined) => Promise<void>;
  hasNextPage: boolean;
  lastId: number | null;
  onItemClick: () => void;
}

function CocktailList({ cocktails, RecipeFetch, hasNextPage, lastId, onItemClick }: Props) {
  const cocktailRef = useRef(null);
  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (!lastId) return;
    if (entry.isIntersecting && lastId > 1) {
      RecipeFetch();
    }
  };

  useIntersectionObserver(cocktailRef, onIntersect, hasNextPage);

  return (
    <ul
      className="place-content-between
    grid gap-8 justify-items-center
    grid-cols-1 sm:justify-items-stretch
    sm:[grid-template-columns:repeat(2,minmax(0,320px))]  sm:gap-8 md:[grid-template-columns:repeat(3,minmax(0,250px))]  
     lg:[grid-template-columns:repeat(4,minmax(0,250px))]
  "
    >
      {cocktails.map(
        ({ cocktailImgUrl, cocktailId, cocktailName, cocktailNameKo, alcoholStrength }) => (
          <li key={cocktailId} onClick={onItemClick}>
            <Link
              href={`/recipe/${String(cocktailId)}`}
              onClick={() => {
                sessionStorage.setItem('listScrollY', String(window.scrollY));
              }}
            >
              <CocktailCard
                src={cocktailImgUrl}
                name={cocktailName}
                nameKo={cocktailNameKo}
                alcohol={alcoholStrength}
              />
            </Link>
          </li>
        )
      )}
      <div ref={cocktailRef} className="h-2.5"></div>
    </ul>
  );
}
export default CocktailList;
