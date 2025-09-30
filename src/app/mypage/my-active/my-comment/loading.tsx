function loading() {
  return (
    <ul aria-hidden="true" className="flex flex-col mt-6 animate-pulse">
      {Array.from({ length: 2 }).map((_, i) => (
        <li key={i} className="border-b border-gray py-3">
          <article>
            {/* CommentTitle 자리 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray animate-pulse" />
              <div className="h-4 w-24 bg-gray animate-pulse rounded" />
            </div>

            {/* 본문 텍스트 자리 */}
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 bg-gray animate-pulse rounded" />
              <div className="h-4 w-1/2 bg-gray animate-pulse rounded" />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
export default loading;
