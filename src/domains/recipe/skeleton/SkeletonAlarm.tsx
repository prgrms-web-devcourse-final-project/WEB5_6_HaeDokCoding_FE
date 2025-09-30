function SkeletonAlarm() {
  return (
    <div
      className="px-3 md:px-5 py-4 h-auto md:h-33 rounded-2xl bg-gray-dark animate-pulse"
      aria-hidden="true"
    >
      <div className="flex flex-col gap-2">
        {/* 상단: 아이콘 + 날짜 / 우측: 상대시간 */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray/80 animate-pulse" />
            <div className="h-4 w-16 bg-gray/80 animate-pulse rounded" />
          </div>
          <div className="h-4 w-14 bg-gray/80 animate-pulse rounded" />
        </div>

        {/* 본문: 제목 + 내용 */}
        <div className="flex flex-col gap-1">
          <div className="h-5 w-40 bg-gray/80 rounded" />
          <div className="h-4 w-56 bg-gray/80 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
export default SkeletonAlarm;
