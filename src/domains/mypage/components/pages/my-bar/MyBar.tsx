'use client';
import { getApi } from '@/app/api/config/appConfig';
import { abvMap } from '@/domains/mypage/utills/abvMap';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import TextButton from '@/shared/components/button/TextButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MyCocktail {
  cocktailId: number;
  cocktailName: string;
  cocktailNameKo: string;
  id: number;
  imageUrl: string;
  alcoholStrength: string;
}

function MyBar() {
  const [myCocktail, setMyCocktail] = useState<MyCocktail[]>([]);
  const fetchData = async () => {
    const res = await fetch(`${getApi}/me/bar/detail`, {
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
      <div className="flex justify-end">
        <TextButton className="my-5">전체삭제</TextButton>
      </div>
      {myCocktail.length !== 0 ? (
        <div
          className="
           grid gap-8 md:justify-between justify-center
           [grid-template-columns:repeat(1,minmax(0,250px))]
           sm:[grid-template-columns:repeat(2,minmax(0,250px))]
           md:[grid-template-columns:repeat(3,minmax(0,250px))]
           "
        >
          {myCocktail.map(
            ({ cocktailId, cocktailName, imageUrl, cocktailNameKo, alcoholStrength }) => {
              const alcohol = abvMap(alcoholStrength);
              return (
                <Link href={`/recipe/${cocktailId}`} key={cocktailId}>
                  <CocktailCard
                    alcohol={alcohol}
                    src={imageUrl}
                    textSize1="text-xl"
                    name={cocktailName}
                    nameKo={cocktailNameKo}
                    keep={true}
                  ></CocktailCard>
                </Link>
              );
            }
          )}
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
