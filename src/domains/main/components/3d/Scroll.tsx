import Lottie from 'lottie-react';
import scroll from '@/shared/assets/lottie/ScrollDownAnimation.json';

function Scroll({ isDesktop }: { isDesktop: boolean }) {
  const style = !isDesktop
    ? {
        width: 45,
        height: 45,
      }
    : {
        width: 60,
        height: 60,
      };
  return (
    <div className="absolute bottom-18 left-1/2 -translate-x-1/2 rounded-full md:bg-secondary/10 bg-primary/30 z-11 md:w-[60px] md:h-[60px] w-[45px] h-[45px]">
      <div className="z-11">
        <Lottie animationData={scroll} style={style} aria-hidden loop={true} />
      </div>
    </div>
  );
}

export default Scroll;
