'use client';

import Send from '@/shared/assets/icons/send_36.svg';
import { keyDown } from '@/shared/utills/keyDown';
import { useState } from 'react';

function ChatForm() {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    if (target.value == '') {
      target.style.height = '';
    }
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="absolute w-[calc(100%-24px)] bottom-12 left-3"
    >
      <div className="flex items-end w-full gap-2">
        <label htmlFor="chatInput" className="sr-only">
          질문 입력창
        </label>
        <textarea
          id="chatInput"
          name="chatInput"
          onKeyDown={(e) => keyDown(e)}
          onInput={(e) => handleInput(e)}
          placeholder="칵테일 추천 질문을 입력해주세요."
          className="w-[calc(100%-3.75rem)] px-4 py-3.5 rounded-lg h-[52px] max-h-[280px] bg-white text-primary placeholder:text-gray-dark resize-none outline-none"
        />
        <button
          type="button"
          aria-label="보내기"
          className="flex-center w-13 h-13 rounded-xl border-1 border-white bg-secondary/20"
        >
          <Send className="text-secondary" />
        </button>
      </div>
    </form>
  );
}
export default ChatForm;
