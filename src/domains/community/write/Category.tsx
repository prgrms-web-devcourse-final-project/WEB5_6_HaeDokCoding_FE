import SelectBox from '@/shared/components/select-box/SelectBox';
import { Dispatch, SetStateAction } from 'react';
import { FormType } from './WriteSection';

type Props = {
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function Category({ setFormData }: Props) {
  return (
    <div className="w-full h-[38px] flex items-center justify-end mt-10">
      <SelectBox
        option={['레시피', '팁', '질문', '자유']}
        title="카테고리"
        use="write"
        onChange={(categoryRef) =>
          setFormData((prev) => ({
            ...prev,
            categoryName: categoryRef,
          }))
        }
      />
    </div>
  );
}

export default Category;
