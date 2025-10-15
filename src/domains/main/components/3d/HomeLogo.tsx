import Image from 'next/image';

function HomeLogo({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div
      className="z-5 absolute md:top-22 md:left-10 md:translate-none top-30 left-1/2 -translate-x-1/2"
      style={{ width: !isDesktop ? 400 : 580, height: !isDesktop ? 70 : 210 }}
    >
      <Image src={'/logo.svg'} alt="로고 이미지" fill priority className="object-contain" />
    </div>
  );
}

export default HomeLogo;
