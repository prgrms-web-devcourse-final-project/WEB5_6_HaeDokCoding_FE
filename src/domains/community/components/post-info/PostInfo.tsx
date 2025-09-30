import { elapsedTime } from '@/shared/utills/elapsedTime';
import { useEffect, useState } from 'react';
import { fetchComment } from '../../api/fetchComment';

type Props = {
  hasUserName?: boolean;
  userNickName?: string;
  createdAt: string;
  viewCount: number;
  postId: number;
};

function PostInfo({ hasUserName = false, userNickName, createdAt, viewCount, postId }: Props) {
  const [commentNumber, setCommentNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchComment(postId);
      if (!data) return;
      setCommentNumber(data.length);
    };
    fetchData();
  }, [commentNumber, postId]);

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
      <li>{elapsedTime(createdAt)}</li>
      <li aria-hidden="true">|</li>
      <li>조회 {viewCount}</li>
      <li aria-hidden="true">|</li>
      <li>댓글 {commentNumber}</li>
    </ul>
  );
}

export default PostInfo;
