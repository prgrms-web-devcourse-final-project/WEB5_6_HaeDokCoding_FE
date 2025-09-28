// DetailSkeleton.tsx
// 한 페이지에 붙여넣기만 하면 되는 최소 스켈레톤 UI

export default function DetailSkeleton() {
  return (
    <div className="page-layout max-w-1024 py-12 animate-pulse">
      {/* 헤더 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-8 w-16 rounded bg-gray animate-pulse " />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-gray animate-pulse " />
          <div className="h-8 w-8 rounded bg-gray animate-pulse " />
        </div>
      </div>

      {/* 메인 아이템 */}
      <article className="flex flex-col items-center mt-8 ">
        {/* 타이틀/설명 */}
        <div
          className="flex flex-col items-center gap-3 relative md:flex-row md:justify-between 
              md:ml-15 md:w-150
              lg:ml-30 lg:w-187.5 h-50"
        >
          <div className="flex flex-col md:ml-10 gap-3 items-center md:items-end">
            <div className="h-6 w-14 rounded bg-gray animate-pulse" />
            <div className="h-8 w-56 rounded bg-gray animate-pulse " />
            <div className="h-7 w-40 rounded bg-gray animate-pulse " />
          </div>
          <div className="w-70 h-20 rounded mr-5 md:mr-0 md:self-end md:w-70 lg:w-100 bg-gray animate-pulse" />
        </div>

        {/* 이미지 */}
        <div className="mt-8 h-[375px] w-[300px] aspect-[3/4] rounded-2xl bg-gray animate-pulse" />

        {/* 도수/글래스 정보 */}
        <dl className="flex flex-col mt-6 gap-3 w-72">
          <div className="flex items-center gap-3">
            <div className="h-5 w-22 rounded bg-gray animate-pulse" />

            <div className="flex-1 h-3 rounded bg-gray animate-pulse" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 rounded bg-gray animate-pulse" />
            <div className="h-5 w-20 rounded bg-gray animate-pulse" />
          </div>
        </dl>
      </article>

      {/* 레시피 섹션 */}
      <section className="mt-16 flex flex-col gap-5">
        <div className="border-b-1 h-18 border-white flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-gray animate-pulse" />
          <div className="h-8 w-36 rounded bg-gray animate-pulse" />
        </div>

        <div className="flex flex-col md:flex-row px-5 gap-5">
          {/* 재료 */}
          <article className="flex flex-col gap-3 md:w-1/2">
            <div className="h-7 w-16 rounded bg-gray animate-pulse" />
            <ul className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="h-5 w-56 rounded bg-gray animate-pulse" />
              ))}
            </ul>
          </article>

          {/* 만드는 법 */}
          <span className="border-t-1 pt-5 md:border-l-1 md:border-t-0 md:px-10 border-white">
            <article className="flex flex-col gap-3">
              <div className="h-7 w-24 rounded bg-gray animate-pulse" />
              <ol className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li key={i} className="h-5 w-72 rounded bg-gray animate-pulse" />
                ))}
              </ol>
            </article>
          </span>
        </div>
      </section>

      {/* 추천 리스트 */}
      <section className="mt-16">
        <div className="border-b-1 h-18 border-white flex items-center gap-3">
          <div className="h-12 w-12 rounded bg-gray animate-pulse" />
          <div className="h-8 w-28 rounded bg-gray animate-pulse" />
        </div>

        <div className="mt-6">
          <ul className="flex justify-between gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="w-full max-w-[250px]">
                <div className="relative w-full aspect-[5/6] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gray animate-pulse"></div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-5 w-3/5 rounded bg-gray animate-pulse"></div>
                  <div className="h-4 w-2/5 rounded bg-gray animate-pulse"></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 댓글 자리 */}
      <section className="mt-16">
        <div className="h-8 w-24 rounded bg-gray animate-pulse" />
        <div className="mt-4 h-24 w-full rounded bg-gray animate-pulse" />
      </section>
    </div>
  );
}
