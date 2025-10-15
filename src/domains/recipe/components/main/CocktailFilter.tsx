import SelectBox from '@/shared/components/select-box/SelectBox';
import { useRouter } from 'next/navigation';

interface Props {
  cocktailsEA: number;
  cocktailsEA: number;
}

function CocktailFilter({ cocktailsEA }: Props) {
function CocktailFilter({ cocktailsEA }: Props) {
  const sortMap = {
    최신순: 'recent',
    인기순: 'keeps',
    댓글순: 'comments',
  };

  const router = useRouter();

  const handleChange = (selectTitle: string) => {
    const sortValue = sortMap[selectTitle as keyof typeof sortMap];

    router.push(`?sortBy=${sortValue}`);
  };

  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      <p>{cocktailsEA}개+</p>
      <SelectBox option={['최신순', '댓글순', '인기순']} title="최신순" onChange={handleChange} />
      <p>{cocktailsEA}개+</p>
      <SelectBox option={['최신순', '댓글순', '인기순']} title="최신순" onChange={handleChange} />
    </div>
  );
}
export default CocktailFilter;
