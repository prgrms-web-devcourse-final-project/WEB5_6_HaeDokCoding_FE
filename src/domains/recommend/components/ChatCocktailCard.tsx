import Image from 'next/image';
import Dummy from '@/shared/assets/images/dummy/exampleCocktail.png';
import Link from 'next/link';
import Keep from '@/shared/components/keep/Keep';

function ChatCocktailCard() {
  return (
    <div className="relative flex flex-col w-full min-w-[200px] rounded-2xl overflow-hidden bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
      <Link href="/" className="block relative">
        <div className="relative w-full h-[200px]">
          <Image src={Dummy} fill className="object-cover" alt="칵테일 이름" />
        </div>

        <div className="p-3 flex flex-col gap-1 text-center">
          <strong className="text-black text-lg">{'진피즈'}</strong>
          <span className="text-gray-500 text-sm">+ 상세보기</span>
        </div>
      </Link>
      <Keep className="absolute top-2 right-2 z-50" />
    </div>
  );
}
export default ChatCocktailCard;
