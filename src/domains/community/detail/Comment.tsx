import React, { useCallback, useEffect, useState } from 'react';
import CommentHeader from '../../shared/components/comment/CommentHeader';
import CommentList from '../../shared/components/comment/CommentList';
import { deleteComment, fetchComment, postComments, updateComment } from '../api/fetchComment';
import { CommentType } from '../types/post';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useShallow } from 'zustand/shallow';
import { getApi } from '@/app/api/config/appConfig';

type Props = {
  postId: number;
};

function Comment({ postId }: Props) {
  const { user, accessToken } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      accessToken: state.accessToken,
    }))
  );

  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    const data = await fetchComment(postId);
    if (!data) return;
    setComments(data);
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [postId, fetchData]);

  // 댓글 수정 핸들러
  const handleUpdateComment = async (commentId: number, postId: number, content: string) => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      await updateComment(accessToken, postId, commentId, content);
    } catch (err) {
      console.error(err);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: number, postId: number) => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      await deleteComment(accessToken, postId, commentId);
    } catch (err) {
      console.error(err);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  // 무한 스크롤
  const loadMoreComments = async (lastCommentId: number) => {
    if (isEnd || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${getApi}/posts/${postId}/comments?lastId=${lastCommentId}`);
      const newComments = await res.json();

      if (newComments.data.length === 0) {
        setIsEnd(true);
      } else {
        setComments((prev) => [...(prev ?? []), ...newComments.data]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-10 border-t-1 border-gray ">
      <CommentHeader
        postId={postId}
        comments={comments}
        onCommentAdded={fetchData}
        postCommentsApi={postComments}
      />
      <CommentList
        comments={comments}
        currentUserNickname={user?.nickname}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleDeleteComment}
        onLoadMore={loadMoreComments}
        isEnd={isEnd}
        isLoading={isLoading}
      />
    </section>
  );
}

export default Comment;
