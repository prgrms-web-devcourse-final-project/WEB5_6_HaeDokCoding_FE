import Image from 'next/image';
import Community01 from '@/shared/assets/images/community_01.webp';
import Community02 from '@/shared/assets/images/community_02.webp';

function MainSlideCommunity() {
  return (
    <article className="slide-content invisible w-[71%] h-full p-12 bg-[#333333] rounded-tl-[30px] rounded-bl-[30px] flex flex-col ">
      <div className="flex flex-col gap-[4%] h-full">
        <p className="text-[32px] text-white font-bold">2</p>
        <div className="flex flex-col h-full justify-between">
          <header className="flex flex-col gap-10">
            <h2 className="text-5xl text-white font-bold">함께 나누는 칵테일 이야기</h2>
            <p className="text-xl leading-[1.5] font-normal text-white">
              다양한 칵테일 레시피들을 SNS로 공유하고
              <br />
              커뮤니티에서 누구나 칵테일 관련 이야기를 나눌 수 있어요.
            </p>
          </header>
          <div className="flex flex-col w-full gap-5 mt-5" aria-hidden>
            <div className="relative w-[25%] rounded-2xl aspect-[0.96] overflow-hidden">
              <Image
                src={Community01}
                alt=""
                fill
                priority
                className="object-contain object-left-bottom"
              />
            </div>
            <div className="relative w-[70%] rounded-2xl aspect-[2.09] overflow-hidden">
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
