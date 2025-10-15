import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '@/domains/community/types/post';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Comment {
  userNickName: string;
}

export const postRecipeComment = async (cocktailId: number, content: string) => {
  const body = {
    cocktailId,
    content,
    status: 'PUBLIC',
  };

  const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (res.status === 401) throw new Error('unauth');

  const text = await res.text();
  const data = JSON.parse(text);
  return data;
};

export const getRecipeComment = async (cocktailId: number) => {
  const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });
  const data = await res.json();
  if (res.status === 401) return [];
  if (!res.ok) throw new Error('댓글 조회 실패');
  const filteredComments = data.data.filter((comment: CommentType) => comment.status !== 'DELETED');

  return filteredComments;
};

export const updateRecipeComment = async (postId: number, commentId: number, content: string) => {
  const res = await fetch(`${getApi}/cocktails/${postId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error('댓글 수정 실패');
};

export const deleteRecipeComment = async (cocktailId: number, commentId: number) => {
  const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('댓글 삭제 실패');
};

export function useRecipeComment({ cocktailId }: { cocktailId: number }) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { toastInfo, toastError } = useToast();

  const {
    data: comments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['comments', cocktailId],
    queryFn: () => getRecipeComment(cocktailId),
    staleTime: 30_000,
  });

  const hasComment = comments.some((c: Comment) => c.userNickName === user?.nickname);
  const createMut = useMutation({
    mutationFn: (content: string) => {
      if (!user?.id) {
        toastInfo('로그인 후 이용 가능합니다.');
        return Promise.resolve(null);
      } else if (hasComment) {
        toastInfo('댓글은 한 개만 작성 가능합니다.');
      }
      return postRecipeComment(cocktailId, content);
    },
    onSuccess: () => refetch(),
  });

  const updateMut = useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
      updateRecipeComment(cocktailId, commentId, content),
    onSuccess: (_, vars) => {
      queryClient.setQueryData<CommentType[]>(
        ['comments', cocktailId],
        (prev) =>
          prev?.map((c) =>
            c.commentId === vars.commentId ? { ...c, content: vars.content } : c
          ) ?? prev
      );
    },
    onError: () => toastError('수정 중 에러가 발생했습니다.'),
  });

  const deleteMut = useMutation({
    mutationFn: (commentId: number) => deleteRecipeComment(cocktailId, commentId),
    onSuccess: (_res, commentId) => {
      queryClient.setQueryData<CommentType[]>(
        ['comments', cocktailId],
        (prev) => prev?.filter((c) => c.commentId !== commentId) ?? prev
      );
    },
  });
  return { createMut, updateMut, deleteMut, comments, refetch, user, isLoading };
}
