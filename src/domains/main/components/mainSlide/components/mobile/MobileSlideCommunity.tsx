import Add from '@/shared/assets/icons/add_24.svg';
import clsx from 'clsx';
import { useState } from 'react';
import Image from 'next/image';
import Community01 from '@/shared/assets/images/community_01.webp';
import Community02 from '@/shared/assets/images/community_02.webp';

function MobileSlideCommunity() {
  const [isClick, setIsClick] = useState(false);
  return (
    <article className="p-4 sm:p-8 bg-primary rounded-2xl flex flex-col sm:justify-center gap-2">
      <div className="flex flex-col gap-5">
        <p className="hidden sm:block text-xl md:text-2xl text-white">2</p>
        <div className="flex flex-col gap-5">
          <header className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-black text-white">함께 나누는 칵테일 이야기</h2>
            <button
              type="button"
              className={clsx(
                `block duration-300 z-1 sm:hidden`,
                isClick ? 'rotate-[135deg]' : 'rotate-0'
              )}
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
              다양한 칵테일 레시피들을 SNS로 공유하고
              <br />
              커뮤니티에서 누구나 칵테일 관련 이야기를 나눌 수 있어요.
            </p>
            <div className="flex flex-col md:flex-row w-full gap-2 mt-4" aria-hidden>
              <div className="relative w-full max-w-[12.5rem] aspect-[0.96] overflow-hidden">
                <Image
                  src={Community01}
                  alt=""
                  fill
                  sizes="300px"
                  priority
                  className="object-contain object-left-bottom"
                />
              </div>
              <div className="relative w-full md:w-[75%] aspect-[2.09] overflow-hidden">
                <Image
                  src={Community02}
                  alt=""
                  fill
                  sizes="600px"
                  priority
                  className="object-contain object-left-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default MobileSlideCommunity;
