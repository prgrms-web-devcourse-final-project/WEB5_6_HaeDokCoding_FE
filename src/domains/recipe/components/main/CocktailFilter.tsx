
import SelectBox from '@/shared/components/select-box/SelectBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter} from 'next/navigation';


interface Props {
  cocktailsEA: number;
}

function CocktailFilter({ cocktailsEA }: Props) {
  const sortMap = {
    최신순: 'recent',
    인기순: 'keeps',
    댓글순: 'comments',
  };
 const queryClient = useQueryClient();
  const router = useRouter();
  const handleChange = async (selectTitle: string) => {
    const sortValue = sortMap[selectTitle as keyof typeof sortMap]
    queryClient.removeQueries({
      queryKey: ['cocktails', 'infinite'],
      exact:false
    })
     router.push(`?sortBy=${sortValue}`);
  };

  return (
    <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
      <p>{cocktailsEA}개+</p>
      <SelectBox
        option={['최신순', '댓글순', '인기순']}
        title="최신순"
        onChange={handleChange}
      />
    </div>
  );
}
export default CocktailFilter;
