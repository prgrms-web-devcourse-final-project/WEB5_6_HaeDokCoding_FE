'use client';

import Ssury from '@/shared/assets/ssury/ssury_shaker.webp';
import Image from 'next/image';
import { useState } from 'react';
import BotCocktailCard from './BotCocktailCard';
import BotOptions from './BotOptions';
import { StepOption, StepRecommendation, RecommendationItem } from '../../types/recommend';
import TypingIndicator from './TypingIndicator';

interface BotMessage {
  id: string;
  message: string;
  type: string;
  stepData?: StepRecommendation | null;
}

interface BotMessages {
  messages: BotMessage[];
  showProfile: boolean;
  currentStep?: number;
  onSelectedOption?: (value: string) => void;
  isTyping?: boolean;
}

function BotMessage({
  messages,
  showProfile,
  currentStep,
  onSelectedOption,
  isTyping,
}: BotMessages) {
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});

  const handleOptionChange = (step: number, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [step]: value }));
    onSelectedOption?.(value);
  };

  return (
    <article aria-label="취향추천 챗봇 메시지" className="">
      {showProfile && (
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
      )}

      {/* 메시지 그룹 */}
      <div className="flex flex-col gap-3 mt-3 pl-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className="flex flex-col w-fit max-w-[80%] min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black opacity-0 animate-fadeIn">
              <div>
                {isTyping ? (
                  <TypingIndicator />
                ) : (
                  <p className="whitespace-pre-line">{msg.message}</p>
                )}
              </div>

              {/* radio */}
              {msg.type === 'RADIO_OPTIONS' && msg.stepData?.options?.length ? (
                <BotOptions
                  options={msg.stepData.options}
                  step={msg.stepData.currentStep ?? 0}
                  value={selectedOptions[msg.stepData.currentStep ?? 0] ?? ''}
                  onChange={(val) => handleOptionChange(msg.stepData?.currentStep ?? 0, val)}
                  disabled={currentStep !== undefined && currentStep > msg.stepData.currentStep!}
                />
              ) : null}
            </div>
            {msg.type === 'CARD_LIST' && msg.stepData?.recommendations?.length ? (
              <>
                {/* 카드 목록 */}
                <ul className="inline-grid grid-cols-1 mt-5 sm:grid-cols-3 gap-2 justify-start">
                  {msg.stepData.recommendations.map((rec) => (
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

                {/* 카드 목록 마지막 restart */}
                {msg.stepData?.options && msg.stepData.options?.length > 0 && (
                  <div className="flex flex-col w-fit max-w-[80%] min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black opacity-0 animate-fadeIn mt-3">
                    <p>다시 추천받기를 원하시나요?</p>
                    <BotOptions
                      options={msg.stepData.options}
                      step={msg.stepData.currentStep ?? 0}
                      value={selectedOptions[msg.stepData.currentStep ?? 0] ?? ''}
                      onChange={(val) => handleOptionChange(msg.stepData?.currentStep ?? 0, val)}
                      disabled={currentStep ? currentStep > (msg.stepData.currentStep ?? 0) : false}
                    />
                  </div>
                )}
              </>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </article>
  );
}
export default BotMessage;
