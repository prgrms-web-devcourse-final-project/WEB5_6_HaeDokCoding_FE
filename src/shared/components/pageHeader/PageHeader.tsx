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
      className="h-100 w-full bg-repeat relative"
      style={{
        backgroundImage: `url(${Star.src})`,
      }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Image src={src} alt="" />
        <div className="text-center text-nowrap font-serif font-bold flex flex-col absolute bottom-[55px]">
          <h2 className="text-[64px]">{title}</h2>
          <p className="text-2xl">{description}</p>
        </div>
      </div>
    </div>
  );
}
export default PageHeader;
