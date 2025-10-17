import Image from 'next/image';

function HomeLogo({ isDesktop }: { isDesktop: boolean }) {
  return (
    <div
      className="z-5 absolute top-30 left-1/2 -translate-x-1/2 lg:absolute lg:top-20 lg:left-10 lg:translate-none md:relative md:top-30 md:left-auto md:translate-none flex justify-center items-center"
      style={{ width: !isDesktop ? 400 : 580, height: !isDesktop ? 70 : 210 }}
    >
      <Image src={'/logo.svg'} alt="로고 이미지" fill priority className="object-contain" />
    </div>
  );
}

export default HomeLogo;
