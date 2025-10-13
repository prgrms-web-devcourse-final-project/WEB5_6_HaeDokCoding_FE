import Image from 'next/image';
import { useIsMobile } from './HomeModel';

function HomeLogo() {
  const isMobile = useIsMobile();
  return (
    <div className="z-5 absolute md:top-6 md:left-10 md:translate-none top-10 left-1/2 -translate-x-1/2">
      <Image src={'/logo.svg'} alt="로고 이미지" width={isMobile ? 400 : 700} height={400} />
    </div>
  );
}

export default HomeLogo;
