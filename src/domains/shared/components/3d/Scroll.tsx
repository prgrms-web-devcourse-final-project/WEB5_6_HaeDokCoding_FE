import Lottie from 'lottie-react';
import scroll from '@/shared/assets/lottie/ScrollDownAnimation.json';
import { div } from 'three/tsl';

function Scroll() {
  const style = {
    width: 60,
    height: 60,
  };
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2  w-15 h-15 rounded-full bg-secondary/10 z-11">
      <div className="z-11">
        <Lottie animationData={scroll} style={style} aria-hidden loop={true} />
      </div>
    </div>
  );
}

export default Scroll;
