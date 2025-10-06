'use client';
import { getApi } from '@/app/api/config/appConfig';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
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
    <div
      className="grid grid-cols-1 justify-items-center mt-10 gap-8  sm:[grid-template-columns:repeat(2,minmax(0,320px))]  sm:justify-evenly md:[grid-template-columns:repeat(3,minmax(0,250px))]  
  "
    >
      {myCocktail ? (
        myCocktail.map(({ cocktailId, cocktailName, imageUrl }) => (
          <CocktailCard
            key={cocktailId}
            src={imageUrl}
            textSize1="text-xl"
            name={cocktailName}
            nameKo="올드 패션드"
            keep={false}
          ></CocktailCard>
        ))
      ) : (
        <div>칵테일을 담아보세요</div>
      )}
    </div>
  );
}
export default MyBar;
