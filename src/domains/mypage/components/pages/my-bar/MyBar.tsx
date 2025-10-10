'use client';
import { getApi } from '@/app/api/config/appConfig';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MyCocktail {
  cocktailId: number;
  cocktailName: string;
  id: number;
  imageUrl: string;
}

function MyBar() {
  const [myCocktail, setMyCocktail] = useState<MyCocktail[]>([]);
  const fetchData = async () => {
    const res = await fetch(`${getApi}/me/bar`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setMyCocktail(json.data.items ?? []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {myCocktail.length !== 0 ? (
        <div
          className="
    grid gap-8 md:justify-between justify-center
    [grid-template-columns:repeat(1,minmax(0,250px))]
    sm:[grid-template-columns:repeat(2,minmax(0,250px))]
    md:[grid-template-columns:repeat(3,minmax(0,250px))]
  "
        >
          {myCocktail.map(({ cocktailId, cocktailName, imageUrl }) => (
            <Link href={`/recipe/${cocktailId}`} key={cocktailId}>
              <CocktailCard
                src={imageUrl}
                textSize1="text-xl"
                name={cocktailName}
                nameKo="올드 패션드"
                keep={false}
              ></CocktailCard>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center">
          <p>아직 저장하신 칵테일이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
export default MyBar;
