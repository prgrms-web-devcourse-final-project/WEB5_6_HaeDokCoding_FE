import { useState } from 'react';
import MainTestDummy from '../MainTestDummy';
import Add from '@/shared/assets/icons/add_24.svg'
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
  const [isClick,setIsClick] = useState(false)
  return (
    <section className="p-4 sm:p-12 bg-[#645a72] rounded-2xl sm:rounded-[30px] flex flex-col sm:justify-center">
      <span className=" hidden sm:text-xl sm:block md:text-2xl font-black text-secondary">1</span>
      <div className="flex flex-col gap-3">
        <article className="flex flex-col gap-5">
          <header className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-secondary text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
              AI기반 취향테스트
            </h2>
            <button
              type="button"
              className={clsx(`block duration-300 sm:hidden`, isClick ? 'rotate-135' : 'rotate-0')}
              onClick={() => setIsClick(!isClick)}
            >
              <Add />
            </button>
          </header>
          <article
            className={clsx(
              `overflow-hidden flex flex-col gap-3 transition-all duration-500 `,
              isClick
                ? 'opacity-100 max-h-[1000px] sm:opacity-100 sm:max-h-none sm:block'
                : 'opacity-0 max-h-0 hidden sm:opacity-100 sm:max-h-none sm:block'
            )}
          >
            <div>
              <p className="text-md sm:text-md leading-[1.5] font-normal text-secondary">
                복잡한 이름과 긴 설명 때문에 내 취향 칵테일 찾기 어려우셨나요? <br />
                AI쑤리가 당신에게 딱 맞는 칵테일을 추천해 드려요!
              </p>
            </div>
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
          </article>
        </article>
      </div>
    </section>
  );
}
export default MobileSlideTest;
