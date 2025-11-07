import SelectBox from '@/shared/components/select-box/SelectBox';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  cocktailsEA: number;
}

function CocktailFilter({ cocktailsEA }: Props) {
  const sortMap = {
    최신순: 'recent',
    인기순: 'keeps',
    댓글순: 'comments',
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const getCurrentSort = () => {
    const sortBy = searchParams.get('sortBy') || 'recent';

    const entry = Object.entries(sortMap).find(([_, value]) => value === sortBy);
    return entry ? entry[0] : '최신순';
  };

  const handleChange = (selectTitle: string) => {
    const sortValue = sortMap[selectTitle as keyof typeof sortMap];

    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortValue);

    router.push(`?sortBy=${sortValue}`);
  };

  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      <p>{cocktailsEA}개+</p>
      <SelectBox
        option={['최신순', '댓글순', '인기순']}
        title="최신순"
        onChange={handleChange}
        value={getCurrentSort()}
      />
    </div>
  );
}
export default CocktailFilter;
