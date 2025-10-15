'use client';

import Link from 'next/link';
import { Cocktail } from '../../types/types';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import { useSaveScroll } from '../../hook/useSaveScroll';

interface Props {
  cocktails: Cocktail[];
}

function CocktailList({ cocktails }: Props) {
  const { saveAndNavigate } = useSaveScroll({
    storageKey: 'cocktail_list_scroll',
  });

  const handleClick = (cocktailId: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    saveAndNavigate(`/recipe/${cocktailId}`);
  };

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
        (
          { cocktailImgUrl, cocktailId, cocktailName, cocktailNameKo, alcoholStrength, isKeep },
          i
        ) => (
          <li key={`${cocktailId} - ${i}`} className="w-full">
            <Link href={`/recipe/${cocktailId}`} onClick={handleClick(cocktailId)}>
              <CocktailCard
                favor={isKeep}
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
