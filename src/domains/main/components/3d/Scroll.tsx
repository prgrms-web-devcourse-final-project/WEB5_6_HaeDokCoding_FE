import Lottie from 'lottie-react';
import scroll from '@/shared/assets/lottie/ScrollDownAnimation.json';

type Props = {
  ref: React.RefObject<HTMLButtonElement | null>;
};

function Scroll({ ref }: Props) {
  const style = {
    width: 50,
    height: 50,
  };
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        window.scrollBy({
          top: 1000,
          behavior: 'smooth',
        });
      }}
      aria-label="아래로 스크롤"
      className="fixed bottom-18 left-1/2 -translate-x-1/2 rounded-full bg-[#000000]/70 z-11 md:w-[60px] md:h-[60px] flex-center cursor-pointer"
    >
      <Lottie animationData={scroll} style={style} aria-hidden loop={true} />
    </button>
  );
}

export default Scroll;
