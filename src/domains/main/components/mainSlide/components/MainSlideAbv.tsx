import Ssury1 from '@/shared/assets/ssury/ssury_level1.webp';
import Ssury2 from '@/shared/assets/ssury/ssury_level2.webp';
import Ssury3 from '@/shared/assets/ssury/ssury_level3.webp';
import Ssury4 from '@/shared/assets/ssury/ssury_level4.webp';
import Ssury5 from '@/shared/assets/ssury/ssury_level5.webp';
import Ssury6 from '@/shared/assets/ssury/ssury_level6.webp';
import MainSsuryDrunk from './MainSsuryDrunk';

function MainSlideAbv() {
  const SSURY_DRUNK = [
    {
      id: 1,
      src: Ssury1,
      abv: 5,
    },
    {
      id: 2,
      src: Ssury2,
      abv: 11,
    },
    {
      id: 3,
      src: Ssury3,
      abv: 26,
    },
    {
      id: 4,
      src: Ssury4,
      abv: 46,
    },
    {
      id: 5,
      src: Ssury5,
      abv: 66,
    },
    {
      id: 6,
      src: Ssury6,
      abv: 86,
    },
  ];

  return (
    <section className="slide-content invisible w-[61%] h-full bg-[#84739e] rounded-tl-[30px] rounded-bl-[30px] p-15 flex flex-col">
      <div className="flex flex-col gap-15 h-full -mt-2.5">
        <span className="font-black text-[32px]">3</span>
        <div className="flex flex-col gap-5 h-full justify-between">
          <div>
            <h2 className="text-5xl font-black text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
              내 알콜도수 UP
            </h2>
            <p className="text-xl xl:text-2xl font-normal leading-[1.5]">
              5도 부터 시작하는 내 알콜도수 <br />글 작성,댓글,좋아요 / 킵으로 알콜도수 UP! <br />
              알콜도수에 따라 변하는 쑤리(SSURY)를 보는 재미도 있어요.
            </p>
          </div>
          <div className=" h-[190px] flex flex-col gap-2">
            <ul className="flex gap-[5%] xl:gap-[10%]">
              {SSURY_DRUNK.map(({ id, src, abv }) => (
                <li key={id}>
                  <MainSsuryDrunk src={src} abv={abv} />
                </li>
              ))}
            </ul>
            <div className="w-full h-3 border border-gray rounded-full relative">
              <span className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#FFCA8D] to-[#FA2424] w-1/2"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default MainSlideAbv;
