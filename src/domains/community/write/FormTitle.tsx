import { FormType } from '@/domains/recipe/types/types';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  formData: FormType;
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function FormTitle({ formData, setFormData }: Props) {
  return (
    <div className="w-full h-[69px] relative border-b-1 border-gray mt-5 flex items-end pb-2">
      <label id="title-label" htmlFor="writingTitle" className="sr-only">
        글 제목
      </label>
      <input
        className="w-full text-2xl px-1 focus:outline-none "
        placeholder="제목을 입력해주세요."
        name="writingTitle"
        id="writingTitle"
        maxLength={30}
        aria-describedby="title-count"
        value={formData.title}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, title: e.target.value }));
        }}
      />
      <span id="title-count" aria-live="polite" className="text-gray ">
        {formData.title.length}/30
      </span>
    </div>
  );
}

export default FormTitle;
