'use client';
import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '@/domains/community/types/post';
import CommentList from '@/domains/shared/components/comment/CommentList';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

function MyComment() {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  const [myComment, setMyComment] = useState<CommentType[]>([]);
  const [isLoading] = useState<boolean>(false);

  const fetchComment = async () => {
    const res = await fetch(`${getApi}/me/comments`, {
      method: 'GET',
      credentials: 'include',
    });
    const json = await res.json();
    setMyComment(json.data.items);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <section>
      {CommentList.length !== 0 ? (
        <CommentList
          comments={myComment}
          isLoading={isLoading}
          myPage={true}
          currentUserNickname={user?.nickname}
        />
      ) : (
        <div className="flex justify-center">
          <p>작성한 댓글이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
export default MyComment;
