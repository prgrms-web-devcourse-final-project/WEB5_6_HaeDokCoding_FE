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

export const fetchPostByTab = async (category: string, lastId?: number): Promise<Post[] | null> => {
  try {
    const res = await fetch(
      `${getApi}/posts?categoryId=${tabItem.findIndex((tab) => tab.key === category)}&${lastId ? `lastId=${lastId}&` : ''}postSortStatus=LATEST`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    const data = await res.json();
    if (!data) return null;

    const filtered = data.data.filter((post: Post) => post.categoryName === category);
    return filtered;
  } catch (err) {
    console.error('글 목록 필터링 실패', err);
    return null;
  }
};

export const fetchPostByFilter = async ({
  filter,
  lastId,
  category,
  lastLikeCount,
  lastCommentCount,
}: {
  filter: string;
  lastId?: number;
  category?: string;
  lastLikeCount?: number;
  lastCommentCount?: number;
}) => {
  try {
    let url;
    switch (filter) {
      case '인기순':
        url = `${getApi}/posts?${category ? `categoryId=${tabItem.findIndex((tab) => tab.key === category)}&` : ''}${lastId ? `lastId=${lastId}&` : ''}lastLikeCount=${lastLikeCount}&postSortStatus=POPULAR`;
        break;
      case '댓글순':
        url = `${getApi}/posts?${category ? `categoryId=${tabItem.findIndex((tab) => tab.key === category)}&` : ''}${lastId ? `lastId=${lastId}&` : ''}lastCommentCount=${lastCommentCount}&postSortStatus=COMMENTS`;
        break;
      default:
        url = `${getApi}/posts?${category ? `categoryId=${tabItem.findIndex((tab) => tab.key === category)}&` : ''}${lastId ? `lastId=${lastId}&` : ''}postSortStatus=LATEST`;
        break;
    }

    const res = await fetch(url ?? '', {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await res.json();
    if (!data) return null;
  } catch (err) {
    console.error('글 목록 필터링 실패', err);
    return null;
  }
};
