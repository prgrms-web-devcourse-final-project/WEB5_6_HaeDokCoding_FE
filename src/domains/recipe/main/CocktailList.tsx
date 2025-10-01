'use client';
import { useRef } from 'react';
import CocktailCard from '../CocktailCard';
import { Cocktail } from './Cocktails';
import Link from 'next/link';
import { useIntersectionObserver } from '@/domains/shared/hook/useIntersectionObserver';

interface Props {
  cocktails: Cocktail[];
  RecipeFetch: (cursor?: string | undefined) => Promise<void>;
  hasNextPage: boolean;
  lastId: number | null;
}

function CocktailList({ cocktails, RecipeFetch, hasNextPage, lastId }: Props) {
  const cocktailRef = useRef(null);
  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (!lastId) return;
    if (entry.isIntersecting && lastId > 0) {
      RecipeFetch();
    }
  };

  useIntersectionObserver(cocktailRef, onIntersect, hasNextPage);

  return (
    <ul
      className="place-content-between
    grid gap-8 justify-items-center
    grid-cols-1 sm:justify-items-stretch
    sm:[grid-template-columns:repeat(2,minmax(0,320px))]  sm:gap-8    md:[grid-template-columns:repeat(3,minmax(0,250px))]  
     lg:[grid-template-columns:repeat(4,minmax(0,250px))]
    
  "
    >
      {cocktails.map(({ cocktailImgUrl, cocktailId, cocktailName, cocktailNameKo }) => (
        <li key={cocktailName + cocktailImgUrl}>
          <Link href={`/recipe/${String(cocktailId)}`}>
            <CocktailCard src={cocktailImgUrl} name={cocktailName} nameKo={cocktailNameKo} />
          </Link>
        </li>
      ))}
      <div ref={cocktailRef} className="h-2.5"></div>
    </ul>
  );
}
export default CocktailList;
