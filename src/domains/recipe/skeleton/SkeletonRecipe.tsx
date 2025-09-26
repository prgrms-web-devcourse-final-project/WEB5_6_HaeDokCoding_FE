// app/recipe/loading.tsx  (예)
function SkeletonRecipe() {
  return (
    <div className="animate-pulse">
      {/* Toolbar 자리 (Accordion + Input) */}
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center">
        <div className="h-10 w-40 bg-gray rounded-lg animate-pulse " />
        <div className="h-10 w-full md:max-w-80 bg-gray rounded animate-pulse" />
      </div>

      {/* 상단 라인 */}
      <div className="h-10 flex justify-between items-center mt-3 border-b-1 border-gray-light">
        <div className="h-4 w-10 bg-gray rounded animate-pulse" />
        <div className="h-8 w-28 bg-gray rounded animate-pulse" />
      </div>

      {/* 리스트 자리 */}
      <div className="mt-5 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-full min-w-0">
            <div className="relative w-full aspect-[3/4] max-w-80 max-h-75 md:max-w-62.5 overflow-hidden rounded-xl bg-gray animate-pulse" />
            <div className="mt-4.5 space-y-2">
              <div className="h-5 w-2/3 bg-gray rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonRecipe;
