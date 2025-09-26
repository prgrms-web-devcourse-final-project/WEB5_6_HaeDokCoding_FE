import Image from 'next/image';
import Short from '@/shared/assets/icons/short_36.svg';
import Example from '@/shared/assets/images/dummy/exampleCocktail.png';
import Label from '@/domains/shared/label/Label';

function DetailItem() {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex flex-col gap-3 relative md:flex-row md:justify-between 
              md:ml-15 md:w-150
              lg:ml-30 lg:w-187.5 h-50"
      >
        <div className="flex flex-col gap-1 items-center md:items-end">
          <span>
            <Label title="레시피" />
          </span>
          <h2 className="font-serif font-bold text-3xl  lg:text-4xl text-secondary">
            Old Fashioned
          </h2>
          <h2 className="font-serif font-bold text-right text-xl lg:text-4xl text-secondary">
            올드 패션드
          </h2>
        </div>

        <p className="w-70 text-base  mr-5 md:text-sm md:mr-0 lg:text-base md:self-end text-secondary md:w-70 lg:w-100">
          쿠바 아바나의 전설적인 바 엘 플로리디타(El Floridita).이곳에서 노벨문학상 작가 어니스트
          헤밍웨이가 즐겨 찾던 특별한 한 잔이 탄생했습니다.
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
  );
}
export default DetailItem;
