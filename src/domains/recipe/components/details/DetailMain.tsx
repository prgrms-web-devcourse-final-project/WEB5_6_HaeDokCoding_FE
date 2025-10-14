'use client';

import DetailItem from './DetailItem';
import DetailRecipe from './DetailRecipe';
import DetailsHeader from './DetailsHeader';
import SsuryShake from '@/shared/assets/ssury/ssury_make.webp';
import SsuryDrink from '@/shared/assets/ssury/ssury_drink.webp';
import Image from 'next/image';
import DetailList from './DetailList';
import { Suspense } from 'react';
import SkeletonDetail from '../../skeleton/SkeletonDetail';
import RecipeComment from './RecipeComment';
import { useDetailRecipe } from '../../api/useRecipeDetails';


function DetailMain({ id }: { id: number }) {

  const {
    data,
  } = useDetailRecipe(id)

  if(!data?.recipe) return null
  
  const {
    cocktailName,
    cocktailNameKo,
    cocktailStory,
    cocktailImgUrl,
    alcoholStrength,
    cocktailType,
    ingredient,
    recipe,
    cocktailId
  } =data?.recipe

  return (
    <Suspense fallback={<SkeletonDetail />}>
      <h1 className="sr-only">{`${cocktailNameKo} 상세정보`}</h1>
      <div className="max-w-1024 page-layout pt-4 pb-6 sm:pb-12">
        <DetailsHeader id={id} favor={data?.iskept} />

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
