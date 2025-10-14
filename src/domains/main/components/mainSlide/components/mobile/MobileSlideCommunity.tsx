import Add from '@/shared/assets/icons/add_24.svg';
import clsx from 'clsx';
import { useState } from 'react';

function MobileSlideCommunity() {
  const [isClick,setIsClick] = useState(false)
  return (
    <section className="p-4 sm:p-12 bg-[#77688d] rounded-2xl sm:rounded-[30px] flex flex-col justify-center">
      <article className="flex flex-col gap-5">
        <span className="hidden sm:block text-xl md:text-2xl font-black">2</span>
        <article className="flex flex-col gap-5">
          <header className='flex justify-between'>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-secondary font-black text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
              술술 즐기는, 커뮤니티
            </h2>
            <button
              type="button"
              className={clsx(`block duration-300 sm:hidden`, isClick ? 'rotate-135' : 'rotate-0')}
              onClick={() => setIsClick(!isClick)}
            >
              <Add />
            </button>
          </header>
          <p className={clsx(
                        `overflow-hidden text-md md:text-xl text-secondary font-normal leading-[1.5] flex flex-col gap-5 transition-all duration-500 `,
                        isClick
                          ? 'opacity-100 max-h-[1000px] sm:opacity-100 sm:max-h-none sm:block'
                          : 'opacity-0 max-h-0 hidden sm:opacity-100 sm:max-h-none sm:block'
                      )}>
            칵테일에 대해 물어볼 곳이 없어 목이 마른 당신! <br />
            초보자부터 애호가까지, Ssoul에서는 누구나 칵테일 이야기를 나눌 수 있어요.
            <br />
            회원들과 소통하면 내 칵테일 솜씨를 뽐내보세요.
          </p>
        </article>
      </article>
    </section>
  );
}
export default MobileSlideCommunity;
