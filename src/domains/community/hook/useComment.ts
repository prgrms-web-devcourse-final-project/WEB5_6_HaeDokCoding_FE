import { useState, useEffect, useCallback } from 'react';
import { deleteComment, fetchComment, updateComment } from '../api/fetchComment';
import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '../types/post';
import { User } from '@/domains/shared/store/auth';
import { ParamValue } from 'next/dist/server/request/params';

export function useComments(postId: ParamValue, user: User | null) {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    commentId: number;
    postId: number | ParamValue;
  } | null>(null);

  const fetchData = useCallback(async () => {
    // 로그인 상태일 때만 댓글 조회
    if (!user) {
      setComments([]);
      return;
    }

    const data = await fetchComment(postId);
    if (!data) return;
    setComments(data);
    setIsEnd(false);
  }, [postId, user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateComment = async (commentId: number, content: string) => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    try {
      await updateComment(postId, commentId, content);
      setComments((prev) =>
        prev
          ? prev.map((comment) =>
              comment.commentId === commentId ? { ...comment, content } : comment
            )
          : prev
      );
      const updatedComments = await fetchComment(postId);
      setComments(updatedComments);
    } catch (err) {
      console.error(err);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleAskDeleteComment = (commentId: number) => {
    setDeleteTarget({ commentId, postId });
  };

  const handleConfirmDelete = async () => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    if (!deleteTarget) return;

    try {
      await deleteComment(deleteTarget.postId, deleteTarget.commentId);
      setComments((prev) =>
        prev ? prev.filter((c) => c.commentId !== deleteTarget.commentId) : prev
      );
      const updatedComments = await fetchComment(postId);
      setComments(updatedComments);
    } catch (err) {
      console.error(err);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const loadMoreComments = async (lastCommentId: number) => {
    if (isEnd || isLoading || !user) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${getApi}/posts/${postId}/comments?lastId=${lastCommentId}`, {
        credentials: 'include',
      });
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

  return {
    comments,
    isEnd,
    isLoading,
    deleteTarget,
    setDeleteTarget,
    fetchData,
    handleUpdateComment,
    handleAskDeleteComment,
    handleConfirmDelete,
    loadMoreComments,
  };
}
