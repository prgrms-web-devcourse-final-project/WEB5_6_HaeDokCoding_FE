function CommunitySkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="page-layout max-w-[1024px]">
        <div className="mt-10 mb-10 flex flex-col gap-8">
          {/* 게시물 카드 스켈레톤 4개 */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-35 w-full bg-gray rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunitySkeleton;
