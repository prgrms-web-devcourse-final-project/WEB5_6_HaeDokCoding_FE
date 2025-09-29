function loading() {
  return (
    <div className="w-full mb-10 flex relative animate-pulse">
      {/* 메인 콘텐츠 */}
      <article className="page-layout max-w-[824px] flex-1 z-5 space-y-6 mt-15">
        {/* DetailHeader 자리 */}
        <div className="h-6 w-15 bg-gray rounded-md" />

        {/* Title 자리 */}
        <div className="h-12 w-full bg-gray rounded-md" />
        <div className="h-7 w-20 -mt-2 bg-gray rounded-md" />

        {/* Content 자리 */}
        <div className="space-y-2 mt-5">
          <div className="h-6 w-full bg-gray rounded-md" />
          <div className="h-6 w-5/6 bg-gray rounded-md" />
          <div className="h-6 w-3/4 bg-gray rounded-md" />
          <div className="h-6 w-2/3 bg-gray rounded-md" />
        </div>

        {/* 댓글 */}
        <div className="h-9 w-full bg-gray rounded-md mt-4" />
        <div className="space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray rounded-md" />
          ))}
        </div>
      </article>
    </div>
  );
}

export default loading;
