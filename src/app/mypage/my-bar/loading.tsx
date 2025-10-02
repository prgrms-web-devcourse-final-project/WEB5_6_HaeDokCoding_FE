import SkeletonCocktailCard from '@/domains/recipe/skeleton/SkeletonCocktailCard';

function Loading() {
  return (
    <div
      className="grid grid-cols-1 justify-items-center mt-10 gap-8
                 sm:[grid-template-columns:repeat(2,minmax(0,320px))]
                 sm:justify-evenly
                 md:[grid-template-columns:repeat(3,minmax(0,250px))]"
    >
      <SkeletonCocktailCard />
      <SkeletonCocktailCard />
      <SkeletonCocktailCard />
      <SkeletonCocktailCard />
      <SkeletonCocktailCard />
      <SkeletonCocktailCard />

      {/* {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCocktailCard key={i} />
      ))} */}
    </div>
  );
}
export default Loading;
