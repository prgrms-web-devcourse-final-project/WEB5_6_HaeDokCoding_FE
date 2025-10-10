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

      <ul
        className=" mt-8
   grid gap-8 lg:justify-between justify-center
    [grid-template-columns:repeat(1,minmax(0,250px))]
    sm:[grid-template-columns:repeat(2,minmax(0,250px))]
    md:[grid-template-columns:repeat(3,minmax(0,250px))]
    lg:[grid-template-columns:repeat(4,minmax(0,250px))]
    "
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="w-full min-w-0 justify-self-center sm:justify-self-stretch">
            <div className="relative w-full max-w-[320px] mx-auto aspect-[3/4] overflow-hidden rounded-xl bg-gray animate-pulse md:w-62.5 h-75" />
            <div className="mt-4.5 space-y-2 max-w-[320px] mx-auto">
              <div className="h-5 w-2/3 bg-gray rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray rounded animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkeletonRecipe;
