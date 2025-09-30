// domains/recipe/SkeletonCocktailCard.tsx
function SkeletonCocktailCard() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* 이미지 박스 (실제 카드와 동일한 크기) */}
      <div className="w-80 h-75 md:w-62.5 rounded-xl overflow-hidden bg-gray animate-pulse relative"></div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-1 font-bold font-serif">
        <div className="h-5 w-32 bg-gray animate-pulse rounded" />
        <div className="h-4 w-20 bg-gray animate-pulse rounded" />
      </div>
    </div>
  );
}
export default SkeletonCocktailCard;
