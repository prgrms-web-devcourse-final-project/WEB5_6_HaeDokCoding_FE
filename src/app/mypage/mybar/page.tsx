'use client';
import CocktailCard from '@/domains/recipe/CocktailCard';
import Img from '@/shared/assets/images/dummy/exampleCocktail.png';

function MyBar() {
  return (
    <div
      className="grid grid-cols-2 mt-10 gap-8 w-full sm:[grid-template-columns:repeat(2,minmax(0,320px))]  md:justify-evenly md:[grid-template-columns:repeat(3,minmax(0,250px))]  
     lg:[grid-template-columns:repeat(4,minmax(0,250px))]"
    >
      <CocktailCard src={Img} type="myBar" name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard
        src={Img}
        type="myBar"
        name="Old Pashioned"
        nameKo="올드 패션드"
      ></CocktailCard>{' '}
      <CocktailCard src={Img} type="myBar" name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>{' '}
      <CocktailCard src={Img} type="myBar" name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>{' '}
      <CocktailCard src={Img} type="myBar" name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>{' '}
      <CocktailCard src={Img} type="myBar" name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
    </div>
  );
}
export default MyBar;
