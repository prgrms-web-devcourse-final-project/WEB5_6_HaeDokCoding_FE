import { Post } from '../types/post';

export const fetchComment = async (postId: number): Promise<Post[] | null> => {
  try {
    const res = await fetch(`http://localhost:8080/posts/${postId}/comments`, {
      method: 'GET',
    });
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err) {
    console.error('해당 글의 댓글 조회 실패', err);
    return null;
  }
};
