function SkeletonSetting() {
  return (
    <section
      className="flex flex-col h-80 md:h-100 lg:h-125 justify-between animate-pulse"
      aria-hidden="true"
    >
      <div>
        {/* 닉네임 영역 */}
        <div className="flex justify-between py-5 border-b border-gray">
          <div className="h-6 w-40 bg-gray animate-pulse rounded" />
          <div className="h-5 w-16 bg-gray animate-pulse rounded" />
        </div>

        {/* 알람 설정 영역 */}
        <div className="flex justify-between py-5">
          <div className="h-5 w-24 bg-gray animate-pulse rounded" />
          <div className="h-6 w-12 bg-gray animate-pulse rounded-full" />
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex justify-between items-center">
        <div className="h-5 w-20 bg-gray animate-pulse rounded" />
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-gray animate-pulse rounded-lg" />
          <div className="h-9 w-28 bg-gray animate-pulse rounded-lg" />
        </div>
      </div>
    </section>
  );
}
export default SkeletonSetting;
