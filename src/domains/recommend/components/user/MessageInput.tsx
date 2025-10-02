'use client';

import Send from '@/shared/assets/icons/send_36.svg';
import { handleTextareaSubmit } from '@/shared/utills/handleTextareaSubmit';
import { resizeTextarea } from '@/shared/utills/textareaResize';
import { useRef, useState } from 'react';

interface Props {
  onSubmit: (message: string) => void;
}

function MessageInput({ onSubmit }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (value: string) => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue('');
  };

  return (
    <div className="fixed left-1/2 bottom-0 -translate-x-1/2 w-full max-w-[64rem] px-3 py-4 bg-primary">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-end w-full gap-2">
          <label htmlFor="chatInput" className="sr-only">
            질문 입력창
          </label>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleTextareaSubmit(e, textareaRef.current, handleSubmit)}
            id="chatInput"
            name="chatInput"
            onInput={(e) => resizeTextarea(e.currentTarget)}
            placeholder="칵테일 추천 질문을 입력해주세요."
            className="w-[calc(100%-3rem)] md:w-[calc(100%-3.75rem)] px-4 py-2 md:py-3.5 rounded-lg h-[40px] md:h-[52px] max-h-[160px] md:max-h-[280px] bg-white text-primary placeholder:text-gray-dark resize-none outline-none"
          />
          <button
            type="button"
            onClick={() => handleTextareaSubmit(null, textareaRef.current, handleSubmit)}
            aria-label="보내기"
            className="flex-center w-10 md:w-13 h-10 md:h-13 rounded-xl border-1 border-white bg-secondary/20"
          >
            <Send className="text-secondary" />
          </button>
        </div>
      </form>
    </div>
  );
}
export default MessageInput;
