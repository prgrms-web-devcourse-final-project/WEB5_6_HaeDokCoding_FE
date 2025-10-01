import { getApi } from '@/app/api/config/appConfig';
import { CommentType } from '../types/post';

export const fetchComment = async (postId: number): Promise<CommentType[] | null> => {
  try {
    const res = await fetch(`${getApi}/posts/${postId}/comments`, {
      method: 'GET',
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('해당 글의 댓글 조회 실패', err);
    return null;
  }
};
