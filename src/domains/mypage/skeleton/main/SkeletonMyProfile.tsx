// domains/mypage/skeleton/SkeletonMyProfile.tsx
function SkeletonMyProfile() {
  return (
    <div>
      <section className="h-auto p-6 bg-white rounded-2xl animate-pulse">
        <header className="flex flex-col gap-8 md:gap-3 md:flex-row md:justify-between">
          {/* 왼쪽: 프로필 */}
          <div className="flex flex-col pb-4 md:pb-0 gap-6">
            {/* 아바타 + 이름 */}
            <div className="flex items-center gap-2">
              <div className="rounded-full w-17.5 h-17.5 bg-gray animate-pulse" />
              <div className="h-6 w-24 bg-gray animate-pulse rounded" />
            </div>
            {/* 통계 리스트 */}
            <ul className="flex gap-3 text-xs">
              {['좋아요', '글', '댓글', '칵테일 킵'].map((_, i) => (
                <li key={i} className="flex gap-1 items-center">
                  <div className="h-4 w-12 bg-gray animate-pulse rounded" />
                  {i < 3 && <span className="text-gray-300">|</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽: MyAbv + AbvGraph */}
          <aside className="flex flex-col gap-2 md:pt-3">
            {/* MyAbv 스켈레톤 */}
            <dl className="flex justify-between items-center gap-2">
              <dt className="flex gap-1 items-center">
                <div className="h-5 w-24 bg-gray animate-pulse rounded" />
                <div className="h-5 w-5 bg-gray animate-pulse rounded-full" />
              </dt>
              <dd className="flex items-center gap-1">
                <div className="h-7 md:h-10 w-12 md:w-16 bg-gray animate-pulse rounded" />
              </dd>
            </dl>

            {/* AbvGraph 스켈레톤 */}
            <div
              className="w-full md:w-49 h-3 rounded-full overflow-hidden border border-gray"
              aria-hidden="true"
            >
              <div className="w-full h-full bg-gray animate-pulse" />
            </div>
          </aside>
        </header>
      </section>
    </div>
  );
}
export default SkeletonMyProfile;
