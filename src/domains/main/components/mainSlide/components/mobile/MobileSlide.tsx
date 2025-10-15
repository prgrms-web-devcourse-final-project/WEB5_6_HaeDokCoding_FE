import MobileSlideTest from './MobileSlideTest';
import MobileSlideCommunity from './MobileSlideCommunity';
import MobileAbv from './MobileAbv';

function MobileSlide() {
  return (
    <section className="py-8 px-6 sm:p-12 bg-secondary/90 w-full rounded-4xl" id="scroll-fixed">
      <h2 className="text-2xl md:text-3xl font-bold leading-[1.5] text-primary text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
        칵테일 <br /> 누구나 쉽게 즐길 수 있어요
      </h2>
      <p className="text-md md:text-2xl font-normal mt-2 text-primary">
        SSOUL의 재밌고 다양한 기능들로 더 친근하게 접해보세요
      </p>
      <div className="flex flex-col gap-10 mt-8">
        <MobileSlideTest />
        <MobileSlideCommunity />
        <MobileAbv />
      </div>
    </section>
  );
}
export default MobileSlide;
