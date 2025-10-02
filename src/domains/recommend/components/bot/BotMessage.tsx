'use client';

import Ssury from '@/shared/assets/ssury/ssury_shaker.webp';
import Image from 'next/image';
import { useState } from 'react';
import BotCocktailCard from './BotCocktailCard';
import BotOptions from './BotOptions';
import { StepOption, StepRecommendation, RecommendationItem } from '../../types/recommend';

interface BotMessage {
  id: string;
  message: string;
  type: string;
  options?: StepOption[];
  recommendations?: RecommendationItem[];
}

interface BotMessages {
  messages: BotMessage[];
  stepData?: StepRecommendation | null;
  currentStep?: number;
  onSelectedOption?: (value: string) => void;
}

function BotMessage({ messages, stepData, currentStep, onSelectedOption }: BotMessages) {
  const [selected, setSelected] = useState('');

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
            {msg.type === 'CARD_LIST' && msg.recommendations?.length ? (
              <ul className="inline-grid grid-cols-1 sm:grid-cols-3 gap-2 justify-start">
                {msg.recommendations.map((rec) => (
                  <li key={rec.cocktailId}>
                    <BotCocktailCard
                      cocktailId={rec.cocktailId}
                      cocktailName={rec.cocktailName}
                      cocktailNameKo={rec.cocktailNameKo}
                      cocktailImgUrl={rec.cocktailImgUrl}
                      alcoholStrength={rec.alcoholStrength}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col w-fit max-w-[80%] min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black">
                {msg.message && <p className="whitespace-pre-line">{msg.message}</p>}

                {/* radio */}
                {msg.type === 'RADIO_OPTIONS' && msg.options?.length && (
                  <BotOptions
                    options={msg.options}
                    step={stepData?.currentStep ?? 0}
                    currentStep={currentStep ?? 0}
                    value={selected}
                    onChange={(val) => {
                      setSelected(val);
                      onSelectedOption?.(val);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
export default BotMessage;
