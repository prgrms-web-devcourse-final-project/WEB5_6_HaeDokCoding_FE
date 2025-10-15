import Add from '@/shared/assets/icons/add_24.svg';
import clsx from 'clsx';
import { useState } from 'react';

function MobileSlideCommunity() {
  const [isClick, setIsClick] = useState(false);
  return (
    <article className="p-4 sm:p-8 bg-primary rounded-2xl flex flex-col sm:justify-center gap-2">
      <div className="flex flex-col gap-5">
        <p className="hidden sm:block text-xl md:text-2xl text-white">2</p>
        <div className="flex flex-col gap-5">
          <header className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-black text-white">술술 즐기는, 커뮤니티</h2>
            <button
              type="button"
              className={clsx(`block duration-300 sm:hidden`, isClick ? 'rotate-135' : 'rotate-0')}
              onClick={() => setIsClick(!isClick)}
            >
              <Add />
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
              칵테일에 대해 물어볼 곳이 없어 목이 마른 당신! <br />
              초보자부터 애호가까지, Ssoul에서는 누구나 칵테일 이야기를 나눌 수 있어요.
              <br />
              회원들과 소통하면 내 칵테일 솜씨를 뽐내보세요.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default MobileSlideCommunity;
