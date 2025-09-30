import { Metadata } from 'next';

import Input from '@/shared/components/Input-box/Input';

import Accordion from '../../domains/recipe/components/main/Accordion';
import CocktailList from '@/domains/recipe/CocktailList';
import PageHeader from '@/domains/shared/components/page-header/PageHeader';
import { Suspense } from 'react';
import SkeletonRecipe from '@/domains/recipe/skeleton/SkeletonRecipe';
import SelectBox from '@/shared/components/select-box/SelectBox';

export const metadata: Metadata = {
  title: 'SSOUL | 칵테일레시피',
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
          <section className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
            <Accordion />
            <Input
              placeholder="내용을 입력해 주세요."
              id="search"
              variant="search"
              className="w-full md:max-w-80"
            />
          </section>
          <section>
            <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
              <p>n개</p>
              <SelectBox option={['', '댓글순', '인기순']} title="최신순" />
            </div>
            <section className="mt-5 ">
              <CocktailList />
            </section>
          </section>
        </Suspense>
      </div>
    </div>
  );
}
export default Page;
