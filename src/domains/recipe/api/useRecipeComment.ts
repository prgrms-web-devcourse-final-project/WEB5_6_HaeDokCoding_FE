import { useState, useEffect, useCallback } from 'react';
import { getApi } from '@/app/api/config/appConfig';
import { User } from '@/domains/shared/store/auth';
import { CommentType } from '@/domains/community/types/post';
import { deleteRecipeComment, getRecipeComment, updateComment } from './fetchRecipeComment';

export function useRecipeComments(postId: number, user: User | null, accessToken: string | null) {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ commentId: number; postId: number } | null>(
    null
  );

  const fetchData = useCallback(async () => {
    const data = await getRecipeComment(postId);
    if (!data) return;
    setComments(data);
    setIsEnd(false);
  }, [postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateComment = async (postId:number,commentId: number,content: string) => {
    
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    try {
      await updateComment(accessToken!, postId, commentId, content);
      setComments((prev) =>
        prev
          ? prev.map((comment) =>
              comment.commentId === commentId ? { ...comment, content } : comment
            )
          : prev
      );
    } catch (err) {
      console.error(err);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleAskDeleteComment = (commentId: number, postId: number) => {
    setDeleteTarget({ commentId, postId });
  };

  const handleConfirmDelete = async () => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }
    if (!deleteTarget) return;

    try {
      await deleteRecipeComment(accessToken!, deleteTarget.postId, deleteTarget.commentId);
      setComments((prev) =>
        prev ? prev.filter((c) => c.commentId !== deleteTarget.commentId) : prev
      );
    } catch (err) {
      console.error(err);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeleteTarget(null);
    }
  };

  const loadMoreComments = async (lastCommentId: number) => {
    if (isEnd || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${getApi}/cocktails/${postId}/comments?lastId=${lastCommentId}`);
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
