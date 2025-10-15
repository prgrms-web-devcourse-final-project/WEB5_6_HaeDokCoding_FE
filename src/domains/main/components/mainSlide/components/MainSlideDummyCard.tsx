import Keep from '@/shared/assets/icons/keep_36.svg';
import Image from 'next/image';

interface Props {
  id: number;
  src: string;
  cocktailName: string;
}

function MainSlideDummyCard({ src, cocktailName }: Props) {
  return (
    <div className="relative flex flex-col w-full min-w-[120px] md:max-w-[160px] rounded-2xl overflow-hidden bg-white">
      <div className="relative w-full h-[100px]">
        <Image src={src} fill className="object-cover" alt="" sizes="100px" priority />
      </div>

      <div className="p-3 flex flex-col gap-1 text-center">
        <strong className="text-black text-base">{cocktailName}</strong>
        <span className="text-gray-500 text-sm">+ 상세보기</span>
      </div>
      <Keep className="absolute top-2 right-2" fill="transparent" />
    </div>
  );
}
export default MainSlideDummyCard;
