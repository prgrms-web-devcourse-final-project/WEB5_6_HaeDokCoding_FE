import Image from 'next/image';
import Community01 from '@/shared/assets/images/community_01.webp';
import Community02 from '@/shared/assets/images/community_02.webp';

function MainSlideCommunity() {
  return (
    <article className="slide-content invisible w-[71%] h-full p-12 bg-[#333333] rounded-tl-[30px] rounded-bl-[30px] flex flex-col ">
      <div className="flex flex-col gap-20 h-full">
        <p className="text-[32px] text-white font-bold">2</p>
        <div className="flex flex-col h-full justify-between">
          <header className="flex flex-col gap-10">
            <h2 className="text-5xl text-white font-bold">술술 즐기는, 커뮤니티</h2>
            <p className="text-xl pb-[250px] xl:text-2xl text-white font-normal leading-[1.5]">
              칵테일에 대해 물어볼 곳이 없어 목이 마른 당신! <br />
              초보자부터 애호가까지
              <br />
              Ssoul에서는 누구나 칵테일 이야기를 나눌 수 있어요.
              <br />
              회원들과 소통하면 내 칵테일 솜씨를 뽐내보세요.
            </p>
          </header>
          <div className="flex flex-col w-full gap-5" aria-hidden>
            <div className="relative w-full max-w-[13.75rem] rounded-2xl aspect-[0.96] overflow-hidden">
              <Image
                src={Community01}
                alt=""
                fill
                priority
                className="object-contain object-left-bottom"
              />
            </div>
            <div className="relative w-[90%] rounded-2xl aspect-[2.09] overflow-hidden">
              <Image
                src={Community02}
                alt=""
                fill
                priority
                className="object-contain object-left-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default MainSlideCommunity;
