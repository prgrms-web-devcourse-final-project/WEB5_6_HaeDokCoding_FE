// domains/community/skeleton/SkeletonPostCard.tsx
function SkeletonPostCard() {
  return (
    <article className="pt-5 pb-3 border-b border-gray-light animate-pulse" aria-hidden="true">
      {/* 라벨 자리 */}
      <div className="h-5 w-16 bg-gray animate-pulse rounded" />

      <section className="flex items-start justify-between mt-3">
        <div className="flex flex-col gap-3 flex-1">
          {/* 제목 자리 */}
          <div className="h-6 w-2/3 bg-gray animate-pulse rounded" />

          {/* 본문 텍스트 자리 */}
          <div className="space-y-2">
            <div className="h-4 w-3/6 bg-gray animate-pulse rounded" />
            <div className="h-4 w-3/6 bg-gray animate-pulse rounded" />
          </div>

          {/* PostInfo 자리 */}
          <div className="flex gap-2 items-center mt-2">
            <div className="w-6 h-6 rounded-full bg-gray animate-pulse" />
            <div className="h-4 w-2/5 bg-gray animate-pulse rounded" />
          </div>
        </div>

        {/* 썸네일 이미지 자리 */}
        <figure className="flex items-start ml-4">
          <div className="w-[80px] sm:w-[100px] md:w-[120px] h-[80px] sm:h-[100px] md:h-[120px] bg-gray animate-pulse rounded-lg" />
        </figure>
      </section>
    </article>
  );
}

export default SkeletonPostCard;
