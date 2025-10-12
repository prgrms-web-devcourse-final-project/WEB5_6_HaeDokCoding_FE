import { getApi } from '@/app/api/config/appConfig';
import SelectBox from '@/shared/components/select-box/SelectBox';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Cocktail } from '../../types/types';

interface Props {
  cocktailsEA: string;
  setData: Dispatch<SetStateAction<Cocktail[]>>;
}

function CocktailFilter({ cocktailsEA, setData }: Props) {
  const sortMap = {
    최신순: 'recent',
    인기순: 'keeps',
    댓글순: 'comments',
  };
  const searchParams = useSearchParams();
  const query = searchParams.get('sortBy');
  const router = useRouter();
  const handleChange = async (selectTitle: string) => {
    if (!query) return;
    try {
      const res = await fetch(`${getApi}/cocktails`);
      const json = await res.json();
      setData(json.data);
    } catch {
      console.error();
      console.log(selectTitle);
    }
  };

  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      <p>{cocktailsEA}개</p>
      <SelectBox
        option={['최신순', '댓글순', '인기순']}
        title="최신순"
        onChange={(value) => {
          const sortValue = sortMap[value as keyof typeof sortMap];
          handleChange(value);
          router.push(`?sortBy=${sortValue}`);
        }}
      />
    </div>
  );
}
export default CocktailFilter;
