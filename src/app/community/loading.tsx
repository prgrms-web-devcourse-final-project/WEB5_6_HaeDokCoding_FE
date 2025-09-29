function loading() {
  return (
    <div className="w-full animate-pulse">
      <div className="page-layout max-w-[1024px]">
        <div className="md:mt-90 mt-60  mb-10 flex flex-col gap-8">
          {/* 탭 + 글쓰기 버튼 */}
          <section className="flex justify-between items-center sm:flex-row flex-col gap-4 mt-1">
            <div className="h-10 w-full sm:w-80 bg-gray rounded-md" /> {/* 탭 */}
            <div className="h-10 w-24 bg-gray rounded-md" /> {/* 버튼 */}
          </section>

          {/* 필터 */}
          <div className="h-8 w-full bg-gray rounded-md" />

          {/* 게시물 카드 스켈레톤 4개 */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-35 w-full bg-gray rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default loading;
