import Keep from '@/shared/assets/icons/keep_36.svg';
import Image from 'next/image'

interface Props {
  id:number
  src: string
  cocktailName:string
}

function MainSlideDummyCard({ src,cocktailName}:Props) {
  return (
    <div className="relative flex flex-col w-full min-w-[150px] rounded-2xl overflow-hidden bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
      <div className="relative w-full h-[100px]">
        <Image
          src={src}
          fill
          className="object-cover"
          alt=""
          sizes="100px"
          priority
        />
      </div>

      <div className="p-3 flex flex-col gap-1 text-center">
        <strong className="text-black text-lg">{cocktailName}</strong>
        <span className="text-gray-500 text-sm">+ 상세보기</span>
      </div>
      <Keep className="absolute top-2 right-2" />
    </div>
  );
}
export default MainSlideDummyCard;
