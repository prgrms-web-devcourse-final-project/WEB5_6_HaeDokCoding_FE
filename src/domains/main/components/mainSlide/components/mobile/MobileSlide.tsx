
import background from '@/shared/assets/images/main_slide.webp';
import MobileSlideTest from './MobileSlideTest';
import MobileSlideCommunity from './MobileSlideCommunity';
import MobileAbv from './MobileAbv';

function MobileSlide() {
  return (
    <div className='sticky p-4 sm:p-12'
    style={{ backgroundImage: `url(${background.src})`, backgroundAttachment: 'fixed' }}>
   
      <h2 className="text-xl md:text-3xl font-bold leading-[1.5] text-secondary text-shadow-[0_4px_6px_rgb(255_255_255_/0.25)]">
        칵테일 <br /> 누구나 쉽게 즐길 수 있어요
      </h2>
      <p className="text-md md:text-2xl font-normal">
        SSOUL의 재밌고 다양한 기능들로 더 친근하게 접해보세요
      </p>
      <div className="flex flex-col gap-10 mt-8">
        <MobileSlideTest />
        <MobileSlideCommunity />
        <MobileAbv />
      </div>
    </div>
  );
}
export default MobileSlide;
