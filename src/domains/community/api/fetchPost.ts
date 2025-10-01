import { getApi } from '@/app/api/config/appConfig';
import { Post } from '@/domains/community/types/post';
import { ParamValue } from 'next/dist/server/request/params';

export const fetchPost = async (lastId?: number | null): Promise<Post[] | null> => {
  try {
    const url = lastId ? `${getApi}/posts?lastId=${lastId}` : `${getApi}/posts`;

    const res = await fetch(url, {
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

export const fetchPostById = async (postId: ParamValue) => {
  try {
    const res = await fetch(`${getApi}/posts/${postId}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('글 내용 불러오기 실패', err);
    return null;
  }
};

// export const fetchPostByTab = async (selectedTab: string): Promise<Post[] | null> => {
//   try {
//     const data = await fetchPost();
//     if (!data) return null;

//     const filtered = data.filter((post) => post.categoryName === selectedTab);
//     return filtered;
//   } catch (err) {
//     console.error('글 목록 필터링 실패', err);
//     return null;
//   }
// };
