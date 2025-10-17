import { elapsedTime } from '@/shared/utills/elapsedTime';

type Props = {
  hasUserName?: boolean;
  userNickName?: string;
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
      className="flex font-light sm:gap-3 gap-1 sm:text-sm text-[10px] text-gray"
      aria-label="게시글 정보"
    >
      {hasUserName && (
        <>
          <li>{userNickName}</li>
          <li aria-hidden="true">|</li>
        </>
      )}
      <li>{elapsedTime(createdAt)}</li>
      <li aria-hidden="true">|</li>
      <li>조회 {viewCount || 0}</li>
      <li aria-hidden="true">|</li>
      <li>댓글 {commentCount || 0}</li>
    </ul>
  );
}

export default PostInfo;
