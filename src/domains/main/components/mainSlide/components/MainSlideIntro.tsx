import background from '@/shared/assets/images/cocktailBg.webp';
import Image from 'next/image';

function MainSlideIntro() {
  return (
    <article className="relative w-full p-12 h-full">
      <Image src={background} alt="" fill className="-z-1  object-right object-contain" />
      <header className="flex flex-col gap-8">
        <h2 className="text-3xl lg:text-5xl font-bold leading-[1.5] text-secondary text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
          칵테일 <br /> 누구나 쉽게 즐길 수 있어요
        </h2>
        <p className="text-2xl font-normal">
          SSOUL의 재밌고 다양한 기능들로 더 친근하게 접해보세요
        </p>
      </header>
    </article>
  );
}
export default MainSlideIntro;
