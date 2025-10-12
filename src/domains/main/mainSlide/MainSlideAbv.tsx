import Ssury1 from '@/shared/assets/ssury/ssury_level1.webp';
import Ssury2 from '@/shared/assets/ssury/ssury_level2.webp';
import Ssury3 from '@/shared/assets/ssury/ssury_level3.webp';
import Ssury4 from '@/shared/assets/ssury/ssury_level4.webp';
import Ssury5 from '@/shared/assets/ssury/ssury_level5.webp';
import Ssury6 from '@/shared/assets/ssury/ssury_level6.webp';
import MainSsuryDrunk from './components/MainSsuryDrunk';

function MainSlideAbv() {

  const SSURY_DRUNK = [
    {
      id: 1,
      src: Ssury1,
      abv:5
    },
    {
      id: 2,
      src: Ssury2,
      abv:11
    },
    {
      id: 3,
      src: Ssury3,
      abv:26
    },
    {
      id: 4,
      src: Ssury4,
      abv:46
    },
    {
      id: 5,
      src: Ssury5,
      abv:66
    },
    {
      id: 6,
      src: Ssury6,
      abv:86
    },
  ];

  return (
    <div className="w-1/2 h-178 bg-[#84739e] rounded-tl-[30px] rounded-bl-[30px] py-8 px-11 flex flex-col justify-between">
      <span className="font-black text-5xl">3</span>
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-black text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
          내 알콜도수
        </h2>
        <p className="text-2xl">
          5도 부터 시작하는 내 알콜도수 <br />글 작성,댓글,좋아요 / 킵 횟수에 따른 점수로 내
          알콜도수를 올릴 수 있어요.
        </p>
        <p className="text-2xl">
          내 알콜 도수에 따른 쑤리(Ssury)의 변화를 보는 것도 <br />또 하나의 재미요소!
        </p>
      </div>
      <div className='relative w-full'>
        <ul className="absolute top-3 left-0 flex gap-20">
          {SSURY_DRUNK.map(({ id, src, abv }) => (
            <li key={id}>
              <MainSsuryDrunk src={src} abv={abv}  />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-3 border-[0.5px] border-gray rounded-full relative">
        <span className="absolute top-0 left-0 rounded-full w-183 h-full bg-gradient-to-r from-[#FFCA8D] to-[#FA2424]"></span>
      </div>
    </div>
  );
}
export default MainSlideAbv