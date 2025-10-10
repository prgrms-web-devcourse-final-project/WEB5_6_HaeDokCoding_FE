'use client';
import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '@/domains/community/types/post';
import CommentList from '@/domains/shared/components/comment/CommentList';
import { useEffect, useState } from 'react';

function MyComment() {
  const [myComment, setMyComment] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchComment = async () => {
    const res = await fetch(`${getApi}/me/comments`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    console.log(json);
    setMyComment(json.data.items);
  };
  console.log(myComment)

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <section>
      {CommentList.length !== 0 ? (
        <CommentList comments={myComment} isLoading={isLoading} />
      ) : (
        <div className="flex justify-center">
          <p>작성한 댓글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
export default MyComment;
