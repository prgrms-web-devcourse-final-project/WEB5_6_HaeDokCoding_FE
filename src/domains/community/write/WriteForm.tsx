import { Dispatch, SetStateAction } from 'react';
import { FormType } from './WriteSection';

type Props = {
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function WriteForm({ setFormData }: Props) {
  return (
    <div className="mt-5">
      <label htmlFor="content" className="sr-only">
        글 내용
      </label>
      <div
        contentEditable
        id="content"
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
        className="w-full min-h-80 max-h-120 overflow-y-auto no-scrollbar bg-white rounded-3xl focus:outline-none py-7 px-5 text-primary"
        onInput={(e) => {
          setFormData((prev) => ({
            ...prev,
            content: (e.target as HTMLDivElement).innerText,
          }));
        }}
      ></div>
    </div>
  );
}

export default WriteForm;
