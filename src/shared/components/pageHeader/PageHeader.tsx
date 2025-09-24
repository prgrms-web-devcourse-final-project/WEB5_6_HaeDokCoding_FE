import Star from '@/shared/assets/images/star_bg.webp';
import Image, { StaticImageData } from 'next/image';

interface Props {
  src: StaticImageData;
  title: string;
  description: string;
}

function PageHeader({ src, title, description }: Props) {
  return (
    <div
      className="h-40 w-full bg-repeat o-cover relative md:h-70 lg:h-100"
      style={{
        backgroundImage: `url(${Star.src})`,
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Image src={src} alt="" width={src.width} height={src.height} />
        <div className="text-center text-nowrap font-serif font-bold flex flex-col absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-9 lg:bottom-[55px]">
          <h2 className="text-shadow-[0_0_12px_#1a1a1a]  text-3xl md:text-5xl lg:text-3xl lg:text-[64px]">
            {title}
          </h2>
          <p className="text-shadow-[0_0_12px_#1a1a1a] text-lg md:text-xl lg:text-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
export default PageHeader;
