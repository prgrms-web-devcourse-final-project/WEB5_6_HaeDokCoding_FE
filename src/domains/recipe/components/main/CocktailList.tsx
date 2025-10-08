'use client';
import { useRef } from 'react';

import Link from 'next/link';
import { useIntersectionObserver } from '@/domains/shared/hook/useIntersectionObserver';
import { Cocktail } from '../../types/types';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  cocktails: Cocktail[];
  RecipeFetch?: (cursor?: string | undefined) => Promise<void>;
  hasNextPage: boolean;
  lastId: number | null;
  onItemClick: () => void;
}

function CocktailList({ cocktails, RecipeFetch, hasNextPage, lastId, onItemClick }: Props) {
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();
  const cocktailRef = useRef(null);
  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (!RecipeFetch) return;
    if (!lastId) return;
    if (entry.isIntersecting) {
      RecipeFetch();
    }
  };

  useIntersectionObserver(cocktailRef, onIntersect, hasNextPage);

  const handleClick = () => {
    sessionStorage.setItem('listScrollY', String(window.scrollY));
    sessionStorage.setItem('saveUrl', String(location.href))
}

  return (
    <ul
      className="place-content-between 
    grid gap-8 justify-items-center
    grid-cols-1 sm:justify-items-stretch
    sm:[grid-template-columns:repeat(2,minmax(0,1fr))]  sm:gap-8 md:[grid-template-columns:repeat(3,minmax(0,1fr))]  
     lg:[grid-template-columns:repeat(4,minmax(0,1fr))]
  "
    >
      {cocktails.map(
        ({ cocktailImgUrl, cocktailId, cocktailName, cocktailNameKo, alcoholStrength }) => (
          <li key={cocktailId} onClick={onItemClick}>
            <Link
              href={`/recipe/${cocktailId}`}
              onClick={handleClick}
            >
              <CocktailCard
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
      <div ref={cocktailRef} className="h-2.5"></div>
    </ul>
  );
}
export default CocktailList;
