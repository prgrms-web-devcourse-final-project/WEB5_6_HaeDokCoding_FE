import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '@/domains/community/types/post';

export const getRecipeComment = async (cocktailId: number): Promise<CommentType[] | null> => {
  try {
    const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments`, {
      method: 'GET',
      cache: 'no-store', // 캐시 비활성화
    });
    const data = await res.json();

    //삭제된 댓글은 제외
    const filteredComments = data.data.filter(
      (comment: CommentType) => comment.status !== 'DELETED'
    );

    return filteredComments;
  } catch (err) {
    console.error('해당 글의 댓글 조회 실패', err);
    return null;
  }
};

export async function updateComment(
  postId: number,
  commentId: number,
  content: string
): Promise<void> {
  console.log(postId, typeof postId);
  const response = await fetch(`${getApi}/cocktails/${postId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('서버 응답 에러:', errorText);
    throw new Error(`댓글 수정 실패: ${response.status}`);
  }
}

export async function deleteRecipeComment(cocktailId: number, commentId: number): Promise<void> {
  const response = await fetch(`${getApi}/cocktails/${cocktailId}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('서버 응답 에러:', errorText);
    throw new Error(`댓글 수정 실패: ${response.status}`);
  }
}
