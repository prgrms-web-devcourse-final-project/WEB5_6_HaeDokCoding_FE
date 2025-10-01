import SelectBox from '@/shared/components/select-box/SelectBox';
import { Cocktail } from './Cocktails';

function CocktailFilter({ cocktailsEA }: { cocktailsEA: number[] }) {
  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      {/* 전체개수를 다 패치받지않으니 이런문제가 생기네 ID값이 계속 숫자면 ID - 1 하면 될것같은데 */}
      <p>{cocktailsEA[0]}개</p>
      <SelectBox option={['', '댓글순', '인기순']} title="최신순" />
    </div>
  );
}
export default CocktailFilter;
