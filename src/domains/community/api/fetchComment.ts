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

export const postComments = async (
  postId: number,
  content: string,
  userNickName: string | undefined
) => {
  try {
    const res = await fetch(`${getApi}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'PUBLIC',
        userNickName,
      }),
    });

    if (!res.ok) {
      const errorTxt = await res.text();
      console.error(`댓글 작성 실패:  ${res.status}`, errorTxt);
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error('해당 글의 댓글 작성 실패', err);
    return null;
  }
};
