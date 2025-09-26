function PostInfo({ hasUserName = false }: { hasUserName?: boolean }) {
  return (
    <ul
      className="flex font-light sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray"
      aria-label="게시글 정보"
    >
      {hasUserName && (
        <>
          <li>실버븬</li>
          <li aria-hidden="true">|</li>
        </>
      )}
      <li>3분 전</li>
      <li aria-hidden="true">|</li>
      <li>조회 3</li>
      <li aria-hidden="true">|</li>
      <li>댓글 3</li>
    </ul>
  );
}

export default PostInfo;
