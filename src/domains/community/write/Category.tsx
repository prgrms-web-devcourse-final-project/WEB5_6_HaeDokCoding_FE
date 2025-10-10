import SelectBox from '@/shared/components/select-box/SelectBox';
import { RefObject } from 'react';
import { FormType } from './WriteSection';

type Props = {
  formData: RefObject<FormType>;
};

function Category({ formData }: Props) {
  return (
    <div className="w-full h-[38px] flex items-center justify-end mt-10">
      <SelectBox
        option={['레시피', '팁', '질문', '자유']}
        title="카테고리"
        use="write"
        onChange={(categoryRef) => {
          console.log(categoryRef);
          formData.current.categoryName = categoryRef;
        }}
      />
    </div>
  );
}

export default Category;
