type Props = {
  hasUserName?: boolean;
  userNickName: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
};

function PostInfo({
  hasUserName = false,
  userNickName,
  createdAt,
  viewCount,
  commentCount,
}: Props) {
  return (
    <ul
      className="flex font-light sm:gap-3 gap-1 sm:text-[14px] text-[12px] text-gray"
      aria-label="게시글 정보"
    >
      {hasUserName && (
        <>
          <li>{userNickName}</li>
          <li aria-hidden="true">|</li>
        </>
      )}
      <li>3분 전</li>
      <li aria-hidden="true">|</li>
      <li>조회 {viewCount}</li>
      <li aria-hidden="true">|</li>
      <li>댓글 {commentCount}</li>
    </ul>
  );
}

export default PostInfo;
