import PageHeader from '@/shared/components/pageHeader/PageHeader';
import { Metadata } from 'next';
import Glass from '@/shared/assets/images/recipe_page_header.png';
import SelectBox from '@/shared/components/InputBox/SelectBox';
import Input from '@/shared/components/InputBox/Input';

import Cocktails from '@/shared/components/recipePage/cocktails/Cocktails';

export const metadata: Metadata = {
  title: 'SSOUL | 칵테일레시피',
  description: '칵테일 레시피가 궁금하신 분들을 위한 레시피 페이지',
};

const selectOption = [
  {
    option: ['', '약한 도수', '가벼운 도수', '중간 도수', '센 도수', '매우 센 도수'],
    title: '도수',
  },
  {
    option: ['', '위스키', '진', '럼', '보드카', '데킬라', '리큐르'],
    title: '베이스',
  },
  {
    option: ['', '클래식', '롱', '슈터', '숏'],
    title: '글라스',
  },
];
function Page() {
  return (
    <div className="w-full">
      <PageHeader
        src={Glass}
        title="Cocktail Recipes"
        description="다양하고 재밌는 칵테일 레시피"
      />
      <div className="page-layout max-w-1224 mt-3">
        <section className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:items-center ">
          <ul className="flex gap-3">
            {selectOption.map(({ option, title }, i) => (
              <li key={title + i}>
                <SelectBox option={option} title={title} />
              </li>
            ))}
          </ul>
          <Input placeholder="내용을 입력해 주세요." id="search" variant="search" />
        </section>
        <section className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
          <p>n개</p>
          <SelectBox option={['', '댓글순']} title="최신순" />
        </section>
        <section className="mt-5">
          <Cocktails />
        </section>
      </div>
    </div>
  );
}
export default Page;
