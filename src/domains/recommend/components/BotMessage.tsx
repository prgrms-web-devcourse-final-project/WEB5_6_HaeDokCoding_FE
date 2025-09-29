'use client';

import Ssury from '@/shared/assets/ssury/ssury_shaker.webp';
import Image from 'next/image';
import { useState } from 'react';
import BotCocktailCard from './BotCocktailCard';
import BotOptions from './BotOptions';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  text?: string;
  type?: 'radio' | 'text' | 'recommend';
}

function BotMessage() {
  const [selected, setSelected] = useState('option1');

  // radio 옵션
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];

  // 메시지 (연속 메시지)
  const messages: Message[] = [
    {
      id: '1',
      text: '안녕하세요, 바텐더 쑤리에요. \n 취향에 맞는 칵테일을 추천해드릴게요!',
    },
    {
      id: '2',
      text: '어떤 유형으로 찾아드릴까요?',
      type: 'radio',
    },
    {
      id: '3',
      type: 'recommend',
    },
  ];

  return (
    <article aria-label="취향추천 챗봇 메시지" className="">
      <header className="flex items-end">
        <div className="relative w-15 md:w-20 h-15 md:h-20">
          <Image
            src={Ssury}
            alt="쑤리아바타"
            width={80}
            height={80}
            className="object-cover w-15 h-15 md:w-20 md:h-20"
          />
        </div>
        <strong>쑤리</strong>
      </header>

      {/* 메시지 그룹 */}
      <div className="flex flex-col gap-3 mt-3 pl-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.type === 'recommend' ? (
              <ul className="inline-grid grid-cols-1 sm:grid-cols-3 gap-2 justify-start">
                <li>
                  <BotCocktailCard />
                </li>
                <li>
                  <BotCocktailCard />
                </li>
                <li>
                  <BotCocktailCard />
                </li>
              </ul>
            ) : (
              <div className="flex flex-col w-fit max-w-[80%] min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black">
                {msg.text && <p className="whitespace-pre-line">{msg.text}</p>}

                {/* radio */}
                {msg.type === 'radio' && (
                  <BotOptions options={options} value={selected} onChange={setSelected} />
                )}
              </div>
            )}
          </div>
        ))}
        <TypingIndicator />
      </div>
    </article>
  );
}
export default BotMessage;
