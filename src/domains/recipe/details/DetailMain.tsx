import DetailItem from './DetailItem';
import DetailRecipe from './DetailRecipe';
import DetailsHeader from './DetailsHeader';
import SsuryShake from '@/shared/assets/ssury/ssury_make.webp';
import SsuryDrink from '@/shared/assets/ssury/ssury_drink.webp';
import Image from 'next/image';

function DetailMain() {
  return (
    <div className="max-w-1024 page-layout">
      <DetailsHeader />

      <article className="flex flex-col items-center mt-4 lg:mt-0">
        <span className="md:bg-secondary w-1 h-100 -translate-y-19 absolute top-0 left-1/2 -translate-x-1/2 md: z-2"></span>
        <span className="h-3 w-3 rounded-full absolute  top-80 left-1/2 -translate-x-1/2 z-99 md:bg-secondary"></span>
        <DetailItem />
      </article>

      <section className="mt-20 flex flex-col gap-5">
        <div className="border-b-1 h-18 border-white">
          <div className="flex items-center gap-3">
            <Image src={SsuryShake} alt="" width="48" height="48" />
            <h3 className="text-3xl font-bold">레시피</h3>
          </div>
        </div>
        <DetailRecipe />
      </section>

      <section className="mt-20">
        <div className="border-b-1 h-18 border-white">
          <div className="flex items-center gap-3">
            <Image src={SsuryDrink} alt="" width="48" height="48" />
            <h3 className="text-3xl font-bold">추천리스트</h3>
          </div>
        </div>
        {/* 여기에 컴포넌트 */}
      </section>

      <section>{/* 여기에 댓글 컴포넌트 */}</section>
    </div>
  );
}
export default DetailMain;
