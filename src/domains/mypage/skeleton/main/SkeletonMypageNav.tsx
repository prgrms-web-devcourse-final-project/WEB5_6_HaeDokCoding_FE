function SkeletonMypageNav() {
  return (
    <section
      aria-labelledby="mypage-tabs-skeleton"
      className="mt-6 md:mt-1 flex flex-col gap-3 animate-pulse"
    >
      <h2 id="mypage-tabs-skeleton" className="sr-only">
        마이페이지 탭 메뉴 (로딩 중)
      </h2>

      {/* 메인 탭 메뉴 스켈레톤 */}
      <nav aria-label="마이페이지 섹션">
        <ul role="tablist" className="mt-3 md:mt-10 flex justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} role="presentation">
              <div className="h-8 w-20 bg-gray animate-pulse rounded-full" />
            </li>
          ))}
        </ul>
      </nav>

      {/* 전체삭제 버튼 자리 (조건부) */}
      <div className="flex justify-end">
        <div className="h-6 w-16 bg-gray animate-pulse rounded" />
      </div>
    </section>
  );
}
export default SkeletonMypageNav;
