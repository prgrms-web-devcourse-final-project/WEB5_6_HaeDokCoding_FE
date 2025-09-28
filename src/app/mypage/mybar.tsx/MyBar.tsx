'use client';
import CocktailCard from '@/domains/recipe/CocktailCard';
import Img from '@/shared/assets/images/dummy/exampleCocktail.png';

function MyBar() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full justify-center  md:justify-evenly md:[grid-template-columns:repeat(2,320px)] lg:justify-between lg:[grid-template-columns:repeat(auto-fit,250px)]">
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
      <CocktailCard src={Img} name="Old Pashioned" nameKo="올드 패션드"></CocktailCard>
    </div>
  );
}
export default MyBar;
