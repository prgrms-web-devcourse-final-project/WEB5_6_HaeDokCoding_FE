import SelectBox from '@/shared/components/select-box/SelectBox';

function CocktailFilter({ cocktailsEA }: { cocktailsEA: string }) {
  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      <p>{cocktailsEA}개</p>
      <SelectBox option={['', '댓글순', '인기순']} title="최신순" />
    </div>
  );
}
export default CocktailFilter;
