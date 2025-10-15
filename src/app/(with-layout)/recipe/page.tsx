import { Metadata } from 'next';

import PageHeader from '@/domains/shared/components/page-header/PageHeader';
import { Suspense } from 'react';
import SkeletonRecipe from '@/domains/recipe/skeleton/SkeletonRecipe';
import Cocktails from '@/domains/recipe/components/main/Cocktails';

export const metadata: Metadata = {
  title: '칵테일레시피',
  description: '칵테일 레시피가 궁금하신 분들을 위한 레시피 페이지',
};

function Page() {
  return (
    <div className="w-full">
      <section>
        <PageHeader title="Cocktail Recipes" description="다양하고 재밌는 칵테일 레시피" />
      </section>
      <div className="page-layout max-w-1224 mt-6">
        <Suspense fallback={<SkeletonRecipe />}>
          <Cocktails />
        </Suspense>
      </div>
    </div>
  );
}
export default Page;
