import { FormType } from '@/domains/recipe/types/types';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  formData: FormType;
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function WriteForm({ formData, setFormData }: Props) {
  return (
    <div className="mt-5">
      <label htmlFor="content" className="sr-only">
        글 내용
      </label>
      <textarea
        id="content"
        placeholder="내용을 입력해주세요."
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
        value={formData.content}
        className="w-full min-h-80 max-h-120 overflow-y-auto no-scrollbar bg-white rounded-3xl focus:outline-none py-7 px-5 text-primary"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const value = e.target.value;
          setFormData((prev) => ({ ...prev, content: value }));
        }}
      />
    </div>
  );
}

export default WriteForm;
