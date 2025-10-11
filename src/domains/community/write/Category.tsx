import SelectBox from '@/shared/components/select-box/SelectBox';
import { FormType } from './WriteSection';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  formData: FormType;
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function Category({ formData, setFormData }: Props) {
  return (
    <div className="w-full h-[38px] flex items-center justify-end mt-10">
      <SelectBox
        option={['레시피', '팁', '질문', '자유']}
        title="카테고리"
        use="write"
        value={formData.categoryName}
        onChange={(categoryRef) => {
          setFormData((prev) => ({ ...prev, categoryName: categoryRef }));
        }}
      />
    </div>
  );
}

export default Category;
