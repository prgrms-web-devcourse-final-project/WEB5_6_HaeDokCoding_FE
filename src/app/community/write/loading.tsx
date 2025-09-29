function loading() {
  return (
    <div className="w-full mb-20 flex relative animate-pulse">
      <div className="page-layout max-w-[824px] flex-1 z-5 space-y-6 mt-12">
        {/* CompleteBtn 자리 */}
        <div className="flex justify-end">
          <div className="h-10 w-26 bg-gray rounded-md" />
        </div>

        <section className="space-y-4">
          {/* FormTitle 자리 */}
          <div className="h-13 w-full mt-10 bg-gray rounded-md" />
          {/* Category 자리 */}
          <div className="flex justify-end mt-10">
            <div className="h-10 w-full max-w-[110px] bg-gray-300 rounded-md" />
          </div>
          {/* WriteForm 자리 (큰 박스) */}
          <div className="h-60 w-full bg-gray rounded-md" />
        </section>

        {/* ImageSection 자리 */}
        <div className="h-36 w-full bg-gray rounded-md" />

        <section className="mt-8">
          {/* Tag 자리 */}
          <div className="h-8 w-24 bg-gray rounded-md" />
        </section>
      </div>
    </div>
  );
}

export default loading;
