import StarBg from '@/shared/components/starBg/StarBg';
import Back from '@/shared/assets/icons/back_36.svg'
import Share from '@/shared/components/share/Share';
import Keep from '@/shared/components/keep/Keep';
import PostLabel from '@/shared/components/community/PostLabel';
import Image from 'next/image'
import Example from '@/shared/assets/images/dummy/exampleCocktail.png'
import Short from '@/shared/assets/icons/short_36.svg'
function page() {
  return (
    <div className="w-full relative">
      <StarBg className="absolute top-0 left-0 h-200 lg:h-202" />

      <div className="max-w-1024 page-layout">
        <nav className="mt-4 flex items-center justify-between ">
          <Back />
          <div className="flex items-center gap-3">
            <Share />
            <Keep />
          </div>
        </nav>

        <section className="flex flex-col items-center">
        
            <span className="bg-secondary w-1 h-81 absolute top-0 left-1/2 -translate-x-1/2 z-99"></span>
            <span className="h-3 w-3 rounded-full absolute  top-80 left-1/2 -translate-x-1/2 z-99 bg-secondary"></span>
         

          <div className="flex flex-col items-center">
            <div className="flex justify-between ml-30 w-187.5 h-50">
              <div className="flex flex-col">
                <span>
                  <PostLabel title="레시피" />
                </span>
                <h2 className="font-serif font-bold text-4xl text-secondary">Old Fashioned</h2>
                <h2 className="font-serif font-bold text-4xl text-secondary">올드 패션드</h2>
              </div>

              <p className="md:text-sm lg:text-base self-end items-end text-secondary md:w-70 lg:w-100">
                쿠바 아바나의 전설적인 바 엘 플로리디타(El Floridita).이곳에서 노벨문학상 작가
                어니스트 헤밍웨이가 즐겨 찾던 특별한 한 잔이 탄생했습니다.
              </p>
            </div>
            <div
              className="rounded-2xl mt-12
           [filter:drop-shadow(0_0_20px_rgba(255,255,255,0.5))]
          "
            >
              <Image src={Example} alt="" />
            </div>

            <div className="flex flex-col mt-5 gap-3">
              <div className="flex gap-3 items-center">
                <span className="flex gap-2">
                  <p>도수</p>
                  <span>|</span>
                </span>
                <div className="flex gap-3 items-center">
                  <p className="text-xs">24.8%</p>
                  <div className="w-50 h-3 rounded-full overflow-hidden border-[0.5px] border-gray relative">
                    <div
                      className="absolute top-0 left-0 w-10  h-3 
                  bg-linear-to-r from-[#FFCA8D] to-[#FA2424]
                  "
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex gap-3 items-center">
                  <p>글래스 타입</p>
                  <span>|</span>
                </span>
                <div className="flex items-center gap-2">
                  <Short />
                  <p>숏 드링크</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default page;
