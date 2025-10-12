import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '../types/post';
import { ParamValue } from 'next/dist/server/request/params';

export const fetchComment = async (postId: ParamValue | number): Promise<CommentType[] | null> => {
  try {
    const res = await fetch(`${getApi}/posts/${postId}/comments`, {
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

export const postComments = async (postId: number | ParamValue, content: string) => {
  try {
    const res = await fetch(`${getApi}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ content }),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(`댓글 작성 실패:  ${res.status}`, text);
      return null;
    }
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error('해당 글의 댓글 작성 실패', err);
    return null;
  }
};

export async function updateComment(
  accessToken: string | null,
  postId: number | ParamValue,
  commentId: number,
  content: string
): Promise<void> {
  const response = await fetch(`${getApi}/posts/${postId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    const errorText = await response.text(); // 👈 응답 본문을 텍스트로 읽기
    console.error('서버 응답 에러:', errorText);
    throw new Error(`댓글 수정 실패: ${response.status}`);
  }
}

export async function deleteComment(
  accessToken: string | null,
  postId: number | ParamValue,
  commentId: number
): Promise<void> {
  const response = await fetch(`${getApi}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // 👈 응답 본문을 텍스트로 읽기
    console.error('서버 응답 에러:', errorText);
    throw new Error(`댓글 수정 실패: ${response.status}`);
  }
}
