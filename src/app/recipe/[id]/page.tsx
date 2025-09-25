import StarBg from '@/shared/components/starBg/StarBg';
import Back from '@/shared/assets/icons/back_36.svg'
import Share from '@/shared/components/share/Share';
import Keep from '@/shared/components/keep/Keep';
import PostLabel from '@/shared/components/community/PostLabel';
import Image from 'next/image'
import Example from '@/shared/assets/images/dummy/exampleCocktail.png'
import Short from '@/shared/assets/icons/short_36.svg'
import SsuryShake from '@/shared/assets/ssury/ssury_make.webp'
function page() {

  // 모바일일때는 글 - 제목 - 밑에선 조그마할게
  
  return (
    <div className="w-full relative">
      <StarBg className="absolute top-0 left-0 h-200 lg:h-200" />

      <div className="max-w-1024 page-layout">
        <nav className="mt-4 flex items-center justify-between ">
          <Back />
          <div className="flex items-center gap-3">
            <Share />
            <Keep />
          </div>
        </nav>

        <article className="flex flex-col items-center mt-4 lg:mt-0">
          <span className="md:bg-secondary w-1 h-100 -translate-y-19 absolute top-0 left-1/2 -translate-x-1/2 md: z-2"></span>
          <span className="h-3 w-3 rounded-full absolute  top-80 left-1/2 -translate-x-1/2 z-99 md:bg-secondary"></span>

          <div className="flex flex-col items-center">
            <div
              className="flex flex-col gap-3 relative md:flex-row md:justify-between 
              md:ml-15 md:w-150
              lg:ml-30 lg:w-187.5 h-50"
            >
              <div className="flex flex-col gap-1 items-center md:items-end">
                <span>
                  <PostLabel title="레시피" />
                </span>
                <h2 className="font-serif font-bold text-3xl  lg:text-4xl text-secondary">
                  Old Fashioned
                </h2>
                <h2 className="font-serif font-bold text-right text-xl lg:text-4xl text-secondary">
                  올드 패션드
                </h2>
              </div>

              <p className="w-70 text-base  mr-5 md:text-sm md:mr-0 lg:text-base md:self-end text-secondary md:w-70 lg:w-100">
                쿠바 아바나의 전설적인 바 엘 플로리디타(El Floridita).이곳에서 노벨문학상 작가
                어니스트 헤밍웨이가 즐겨 찾던 특별한 한 잔이 탄생했습니다.
              </p>
              <span className="absolute w-0.5 h-11 -bottom-15 left-1/2 -translate-x-1/2 z-2 bg-secondary md:bg-transparent"></span>
              <span className="absolute w-3 h-3 rounded-full -bottom-16 z-2 left-1/2 -translate-x-1/2 bg-secondary md:bg-transparent"></span>
            </div>

            <div
              className="rounded-2xl mt-12
           [filter:drop-shadow(0_0_20px_rgba(255,255,255,0.3))]
          "
            >
              <Image src={Example} alt="" width="300" height="375" />
            </div>

            <dl className="flex flex-col mt-5 gap-3 w-75">
              <div className="flex gap-3 items-center">
                <dt className="flex gap-2">
                  <p className="text-base text-nowrap">도수</p>
                  <span>|</span>
                </dt>
                <dd className="flex gap-3 items-center">
                  <p className="text-xs">24.8%</p>
                  <div className="w-49 h-3 rounded-full overflow-hidden border-[0.5px] border-gray relative">
                    <div
                      className="absolute top-0 left-0 w-10  h-3 
                  bg-linear-to-r from-[#FFCA8D] to-[#FA2424]
                  "
                    ></div>
                  </div>
                </dd>
              </div>
              <div className="flex items-center gap-3">
                <dt className="flex gap-2 items-center">
                  <p>글래스 타입</p>
                  <span>|</span>
                </dt>
                <dd className="flex items-center gap-2">
                  <Short />
                  <p>숏 드링크</p>
                </dd>
              </div>
            </dl>
          </div>
        </article>

        <section className="mt-20 flex flex-col gap-5">
          <dd className="border-b-1 h-18 border-white">
            <div className="flex items-center gap-3">
              <Image src={SsuryShake} alt="" width="40" height="40" />
              <h3 className="text-3xl font-bold">레시피</h3>
            </div>
          </dd>
          <dd className="flex flex-col md:flex-row  px-5 gap-5">
            <dt className="flex flex-col gap-4 w-[50%]">
              <h4 className="text-2xl font-bold">재료</h4>
              <ul className="flex flex-col gap-2">
                <li className="text-lg">
                  럼 <span className="text-sm text-white/80">1 1/2oz | 90ml</span>
                </li>
                <li className="text-lg">
                  심플시럽 <span className="text-sm text-white/80">1/2oz | 30ml</span>
                </li>
                <li className="text-lg">
                  라임 <span className="text-sm text-white/80">1/2개</span>
                </li>
                <li className="text-lg">
                  자몽 <span className="text-sm text-white/80">1/2개</span>
                </li>
              </ul>
            </dt>

            <span className="border-t-1 pt-5 md:border-l-1 md:border-t-0 md:px-10 border-white">
              <dt className="flex flex-col gap-4 ">
                <h4 className="text-2xl font-bold">만드는 법</h4>
                <ol className="flex flex-col gap-2 list-decimal">
                  <li>셰이커에 라임즙을 착즙기로 짜 넣습니다</li>
                  <li>셰이커에 자몽즙을 착즙기로 짜 넣습니다</li>
                  <li>셰이커에 재료를 넣습니다</li>
                  <li>셰이킹 후 잔에 따라줍니다</li>
                </ol>
              </dt>
            </span>
          </dd>
        </section>

        <section className='mt-20'>
          <h3 className='text-3xl font-bold'>추천리스트</h3>
        </section>
      </div>
    </div>
  );
}
export default page;
