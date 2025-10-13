'use client';

import DetailItem from './DetailItem';
import DetailRecipe from './DetailRecipe';
import DetailsHeader from './DetailsHeader';
import SsuryShake from '@/shared/assets/ssury/ssury_make.webp';
import SsuryDrink from '@/shared/assets/ssury/ssury_drink.webp';
import Image from 'next/image';
import DetailList from './DetailList';
import { Suspense, useEffect, useState } from 'react';
import SkeletonDetail from '../skeleton/SkeletonDetail';
import RecipeComment from '../components/details/RecipeComment';
import { getApi } from '@/app/api/config/appConfig';
import { useAuthStore } from '@/domains/shared/store/auth';

interface Kept {
  cocktailId: number;
  id: number;
  keptAt: Date;
}

function DetailMain({ id }: { id: number }) {
  const user = useAuthStore();
  const [cocktail, setCocktail] = useState();
  const [isKept, setIsKept] = useState<boolean | null>(null);

  const fetchData = async () => {
    const res = await fetch(`${getApi}/cocktails/${id}`);
    const json = await res.json();
    if (!res.ok) throw new Error('데이터 요청 실패');
    setCocktail(json.data);

    if (!user) {
      setIsKept(false);
      return;
    } else {
      const keepRes = await fetch(`${getApi}/me/bar`, {
        method: 'GET',
        credentials: 'include',
      });
      const keepjson = await keepRes.json();
      const keepIds = keepjson.data.map((a: Kept) => String(a.cocktailId));
      setIsKept(keepIds.includes(String(id)));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      // 레시피 페이지로 돌아가지 않는 경우 (헤더 탭 클릭 등)
      // 네비게이션 플래그를 제거하여 스크롤 복원 방지
      const currentPath = window.location.pathname;

      // 디테일 페이지를 벗어나는 경우
      if (!currentPath.includes('/recipe')) {
        sessionStorage.removeItem('cocktails_scroll_state_nav_flag');
      }
    };
  }, []);

  if (!cocktail) return;
  const {
    cocktailId,
    cocktailImgUrl,
    cocktailName,
    cocktailNameKo,
    cocktailStory,
    alcoholStrength,
    cocktailType,
    ingredient,
    recipe,
  } = cocktail;

  return (
    <Suspense fallback={<SkeletonDetail />}>
      <h1 className="sr-only">${cocktailNameKo} 상세정보</h1>
      <div className="max-w-1024 page-layout pt-4 pb-6 sm:pb-12">
        <DetailsHeader id={id} favor={isKept} />

        <article className="flex flex-col items-center mt-4 lg:mt-0">
          <span className="md:bg-secondary w-1 h-104 -translate-y-19 absolute top-0 left-1/2 -translate-x-1/2 md: z-2"></span>
          <span className="h-3 w-3 rounded-full absolute  top-82 left-1/2 -translate-x-1/2 z-2 md:bg-secondary"></span>
          <DetailItem
            name={cocktailName}
            nameKo={cocktailNameKo}
            story={cocktailStory}
            src={cocktailImgUrl}
            abv={alcoholStrength}
            glassType={cocktailType}
          />
        </article>

        <section className="mt-20 flex flex-col gap-5">
          <div className="border-b-1 h-18 border-white flex gap-3 items-center">
            <Image src={SsuryShake} alt="" width="48" height="48" />
            <h3 className="text-2xl font-bold">레시피</h3>
          </div>
          <DetailRecipe ingredient={ingredient} recipe={recipe} />
        </section>

        <section className="mt-20">
          <div className="border-b-1 h-18 border-white flex items-center gap-3">
            <Image src={SsuryDrink} alt="" width="48" height="48" />
            <h3 className="text-2xl font-bold">추천리스트</h3>
          </div>

          <div className="mt-5">
            <DetailList />
          </div>
        </section>

        <section className="mt-20">
          <RecipeComment cocktailId={cocktailId} />
        </section>
      </div>
    </Suspense>
  );
}
export default DetailMain;
