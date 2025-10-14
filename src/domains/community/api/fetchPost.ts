import { getApi } from '@/app/api/config/appConfig';
import { Post } from '@/domains/community/types/post';
import { ParamValue } from 'next/dist/server/request/params';
import { tabItem } from '../main/CommunityTab';

export const fetchPost = async (lastId?: number | null): Promise<Post[] | null> => {
  try {
    const res = await fetch(
      `${getApi}/posts?${lastId ? `lastId=${lastId}&` : ''}postSortStatus=LATEST`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('글 목록 불러오기 실패', err);
    return null;
  }
};

export const fetchPostById = async (postId: ParamValue | number) => {
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

export const fetchPostByTab = async ({
  category,
  filter = 'LATEST',
  lastId,
  lastLikeCount,
  lastCommentCount,
}: {
  category?: string;
  filter?: 'LATEST' | 'POPULAR' | 'COMMENTS';
  lastId?: number;
  lastLikeCount?: number | null;
  lastCommentCount?: number | null;
}): Promise<Post[] | null> => {
  try {
    const params = new URLSearchParams();

    if (category && category !== 'all') {
      const categoryId = tabItem.findIndex((tab) => tab.key === category);
      if (categoryId >= 0) {
        params.set('categoryId', categoryId.toString());
      }
    }

    if (lastId) params.set('lastId', lastId.toString());

    switch (filter) {
      case 'POPULAR':
        if (lastLikeCount) params.set('lastLikeCount', lastLikeCount.toString());
        params.set('postSortStatus', 'POPULAR');
        break;
      case 'COMMENTS':
        if (lastCommentCount) params.set('lastCommentCount', lastCommentCount.toString());
        params.set('postSortStatus', 'COMMENTS');
        break;
      case 'LATEST':
      default:
        params.set('postSortStatus', 'LATEST');
        break;
    }

    const res = await fetch(`${getApi}/posts?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await res.json();
    if (!data) return null;

    return data.data; // 필요하다면 filter 추가 가능
  } catch (err) {
    console.error('글 목록 가져오기 실패', err);
    return null;
  }
};

export async function likePost(postId: number | ParamValue) {
  const res = await fetch(`${getApi}/posts/${postId}/like`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('좋아요 실패');
}

export async function getLikePost(postId: number | ParamValue) {
  const res = await fetch(`${getApi}/posts/${postId}/like`, {
    method: 'GET',
  });
  if (!res.ok) throw new Error('좋아요 실패');
  const data = await res.json();
  return data.data;
}
