import Image from 'next/image';
import Link from 'next/link';
import Keep from '@/domains/shared/components/keep/Keep';
import { RecommendationItem } from '../../types/recommend';

function BotCocktailCard({ cocktailId, cocktailNameKo, cocktailImgUrl }: RecommendationItem) {
  return (
    <div className="relative flex flex-col w-full min-w-[200px] rounded-2xl overflow-hidden bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]">
      <Link
        href={`/recipe/${cocktailId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <div className="relative w-full h-[200px]">
          <Image
            src={cocktailImgUrl}
            fill
            className="object-cover"
            alt={cocktailNameKo}
            sizes="200px"
            crossOrigin="anonymous"
            priority
          />
        </div>

        <div className="p-3 flex flex-col gap-1 text-center">
          <strong className="text-black text-lg">{cocktailNameKo}</strong>
          <span className="text-gray-500 text-sm">+ 상세보기</span>
        </div>
      </Link>
      <Keep cocktailId={cocktailId} className="absolute top-2 right-2" />
    </div>
  );
}
export default BotCocktailCard;
