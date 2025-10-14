'use client';

import Link from 'next/link';
import { Cocktail } from '../../types/types';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';

interface Props {
  cocktails: Cocktail[];
}

function CocktailList({ cocktails}: Props) {
 
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
          <li key={cocktailId} className="w-full">
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
    </ul>
  );
}
export default CocktailList;
