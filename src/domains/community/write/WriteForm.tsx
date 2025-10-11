import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { FormType } from './WriteSection';

type Props = {
  formData: FormType;
  setFormData: Dispatch<SetStateAction<FormType>>;
};

function WriteForm({ formData, setFormData }: Props) {
  const divRef = useRef<HTMLDivElement>(null);

  // formData.content가 바뀔 때만 DOM 업데이트
  // useEffect(() => {
  //   console.log('useEffect 실행', divRef.current);
  //   if (!divRef.current) return; // null 체크 추가
  //   if (divRef.current.innerText !== formData.content) {
  //     divRef.current.innerText = formData.content;
  //   }
  // }, [formData.content]);
  return (
    <div className="mt-5">
      <label htmlFor="content" className="sr-only">
        글 내용
      </label>
      <textarea
        id="content"
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
