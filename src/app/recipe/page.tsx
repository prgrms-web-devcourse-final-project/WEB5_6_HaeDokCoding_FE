import PageHeader from '@/shared/components/pageHeader/PageHeader';
import { Metadata } from 'next';
import Glass from '@/shared/assets/images/recipe_page_header.png';

export const metadata: Metadata = {
  title: 'SSOUL | 칵테일레시피',
  description: '칵테일 레시피가 궁금하신 분들을 위한 레시피 페이지',
};

function Page() {
  return (
    <div className="w-full">
      <PageHeader
        src={Glass}
        title="Cocktail Recipes"
        description="다양하고 재밌는 칵테일 레시피"
      />
      <div className="page-layout max-w-1224"></div>
    </div>
  );
}
export default Page;
