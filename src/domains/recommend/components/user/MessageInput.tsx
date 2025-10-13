'use client';

import Send from '@/shared/assets/icons/send_36.svg';
import Crop from '@/shared/assets/icons/crop_32.svg';
import { handleTextareaSubmit } from '@/shared/utills/handleTextareaSubmit';
import { resizeTextarea } from '@/shared/utills/textareaResize';
import { useRef, useState } from 'react';

interface Props {
  onSubmit: (message: string) => void;
  onCapture: () => void;
  disabled: boolean;
}

function MessageInput({ onSubmit, disabled, onCapture }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (value: string) => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue('');
  };

  return (
    <div className="fixed left-0 bottom-0 gap-3 w-full px-3 py-4 flex-center bg-primary">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center w-full max-w-[64rem] gap-2 justify-between"
      >
        <button
          onClick={onCapture}
          aria-label="채팅 이미지 저장"
          title="채팅내용 이미지 저장"
          className="flex-center rounded-full sm:bg-secondary/20 sm:w-10 sm:h-10 hover:bg-white/10 active:bg-white/10"
        >
          <Crop />
        </button>
        <div className="flex w-[calc(100%-2.5rem)] sm:w-[calc(100%-3rem)] items-end gap-2">
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
            placeholder={disabled ? '옵션 선택' : '칵테일 추천 질문 입력'}
            disabled={disabled}
            className={`
    flex-1 px-4 py-2 md:py-3.5
    rounded-lg h-[40px] md:h-[52px] max-h-[160px] md:max-h-[280px]
    bg-white text-primary placeholder:text-gray-dark resize-none outline-none
    disabled:bg-gray disabled:text-gray-dark disabled:cursor-not-allowed
  `}
          />
          <button
            type="button"
            onClick={() => handleTextareaSubmit(null, textareaRef.current, handleSubmit)}
            aria-label="보내기"
            className="flex-center w-10 md:w-13 h-10 md:h-13 rounded-xl border-1 border-white bg-secondary/20 hover:bg-white/10 active:bg-white/10"
          >
            <Send className="text-secondary" />
          </button>
        </div>
      </form>
    </div>
  );
}
export default MessageInput;
