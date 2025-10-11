import { useState, useEffect, useCallback } from 'react';
import { getApi } from '@/app/api/config/appConfig';
import { User } from '@/domains/shared/store/auth';
import { CommentType } from '@/domains/community/types/post';
import { deleteRecipeComment, getRecipeComment, updateComment } from './fetchRecipeComment';
import { useToast } from '@/shared/hook/useToast';

export function useRecipeComments(
  cocktailId: number,
  user: User | null,
  accessToken: string | null
) {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    commentId: number;
    cocktailId: number;
  } | null>(null);
  const { toastError } = useToast();

  const fetchData = useCallback(async () => {
    const data = await getRecipeComment(cocktailId);
    if (!data) return;
    setComments(data);
    setIsEnd(false);
  }, [cocktailId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateComment = async (commentId: number, content: string) => {
    if (!user) {
      toastError('로그인이 필요합니다');
      return;
    }
    try {
      await updateComment(accessToken!, cocktailId, commentId, content);
      setComments((prev) =>
        prev
          ? prev.map((comment) =>
              comment.commentId === commentId ? { ...comment, content } : comment
            )
          : prev
      );
    } catch (err) {
      console.error(err);
      toastError('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleAskDeleteComment = (commentId: number) => {
    setDeleteTarget({ commentId, cocktailId });
  };

  const handleConfirmDelete = async () => {
    if (!user) {
      toastError('로그인이 필요합니다');
      return;
    }
    if (!deleteTarget) return;

    try {
      await deleteRecipeComment(accessToken!, deleteTarget.cocktailId, deleteTarget.commentId);
      setComments((prev) =>
        prev ? prev.filter((c) => c.commentId !== deleteTarget.commentId) : prev
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const loadMoreComments = async (lastCommentId: number) => {
    if (isEnd || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments?lastId=${lastCommentId}`);
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
