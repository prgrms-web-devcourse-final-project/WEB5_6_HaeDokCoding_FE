import { Post } from '@/domains/community/types/post';

export const fetchPost = async (): Promise<Post[] | null> => {
  try {
    const res = await fetch('http://localhost:8080/posts', {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('글 목록 불러오기 실패', err);
    return null;
  }
};
