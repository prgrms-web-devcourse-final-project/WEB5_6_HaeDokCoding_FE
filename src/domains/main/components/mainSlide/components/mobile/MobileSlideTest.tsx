import { useState } from 'react';
import MainTestDummy from '../MainTestDummy';
import Add from '@/shared/assets/icons/add_24.svg';
import clsx from 'clsx';
const DUMMY_TEST = [
  {
    id: 1,
    message: '질문형 취향 찾기',
    active: false,
  },
  {
    id: 2,
    message: '단계별 취향 찾기',
    active: true,
  },
];

function MobileSlideTest() {
  const [isClick, setIsClick] = useState(false);
  return (
    <article className="p-4 sm:p-8 bg-primary rounded-2xl flex flex-col sm:justify-center gap-2">
      <p className="hidden sm:block text-xl md:text-2xl text-white">1</p>
      <div className="flex flex-col gap-5">
        <header className="flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-black text-white">AI기반 취향테스트</h2>
          <button
            type="button"
            className={clsx(
              `block duration-300  z-1 sm:hidden`,
              isClick ? 'rotate-[135deg]' : 'rotate-0'
            )}
            onClick={() => {
              setIsClick(!isClick);
            }}
          >
            <Add className="pointer-events-none" />
          </button>
        </header>
        <div
          className={clsx(
            `overflow-hidden flex flex-col gap-3 transition-all duration-500 `,
            isClick
              ? 'opacity-100 max-h-[1000px] sm:opacity-100 sm:max-h-none sm:block'
              : 'opacity-0 max-h-0 hidden sm:opacity-100 sm:max-h-none sm:block'
          )}
        >
          <p className="text-sm sm:text-md leading-[1.5] font-normal text-white">
            내 취향 칵테일 찾기 어려우셨나요? <br />
            AI쑤리가 당신에게 딱 맞는 칵테일을 추천해 드려요!
          </p>
          <ul className="flex flex-col mt-4 lg:flex-row gap-5">
            <MainTestDummy
              message={
                <>
                  안녕하세요! 🍹바텐더 쑤리에요.
                  <br />
                  취향에 맞는 칵테일을 추천해드릴게요. <br />
                  어떤 유형으로 찾아드릴까요?
                </>
              }
              option={DUMMY_TEST}
              type="option"
            />
            <MainTestDummy type="text" />
          </ul>
        </div>
      </div>
    </article>
  );
}
export default MobileSlideTest;
