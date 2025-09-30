import CocktailCard from '@/domains/recipe/CocktailCard';
import Img from '@/shared/assets/images/dummy/exampleCocktail.png';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSOUL | 마이페이지',
  description: 'SSOUL 서비스에서 나의 활동을 관리할 수 있는 페이지입니다',
};

function MyBar() {
  return (
    <div
      className="grid grid-cols-1 justify-items-center mt-10 gap-8  sm:[grid-template-columns:repeat(2,minmax(0,320px))]  sm:justify-evenly md:[grid-template-columns:repeat(3,minmax(0,250px))]  
  "
    >
      <CocktailCard
        src={Img}
        textSize1="text-xl"
        name="Old Pashioned"
        nameKo="올드 패션드"
        keep={false}
      ></CocktailCard>
      <CocktailCard
        src={Img}
        textSize1="text-xl"
        name="Old Pashioned"
        nameKo="올드 패션드"
        keep={false}
      ></CocktailCard>
      <CocktailCard
        src={Img}
        textSize1="text-xl"
        name="Old Pashioned"
        nameKo="올드 패션드"
        keep={false}
      ></CocktailCard>
      <CocktailCard
        src={Img}
        textSize1="text-xl"
        name="Old Pashioned"
        nameKo="올드 패션드"
        keep={false}
      ></CocktailCard>
      <CocktailCard
        src={Img}
        textSize1="text-xl"
        name="Old Pashioned"
        nameKo="올드 패션드"
        keep={false}
      ></CocktailCard>
    </div>
  );
}
export default MyBar;
