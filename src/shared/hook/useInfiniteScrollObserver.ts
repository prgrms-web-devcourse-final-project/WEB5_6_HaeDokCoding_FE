import { CommentType, Post } from '@/domains/community/types/post';
import { useCallback, useRef } from 'react';

type UseInfiniteScrollObserverParams = {
  items: CommentType[] | Post[] | null;
  isEnd: boolean | undefined;
  onLoadMore: ((lastItemId: number) => void) | undefined | ((lastItemId: number) => Promise<void>);
};

export function useInfiniteScrollObserver<T extends HTMLElement>({
  items,
  isEnd,
  onLoadMore,
}: UseInfiniteScrollObserverParams) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observeLastItem = useCallback(
    (node: T | null) => {
      if (!node || !onLoadMore || !items || items.length === 0 || isEnd) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const lastItem = items[items.length - 1];
            let lastItemId: number | undefined;
            if ('commentId' in lastItem && typeof lastItem.commentId === 'number') {
              lastItemId = lastItem.commentId;
            } else if ('postId' in lastItem && typeof lastItem.postId === 'number') {
              lastItemId = lastItem.postId;
            }
            if (lastItemId !== undefined) {
              onLoadMore(lastItemId);
            }
          }
        },
        {
          rootMargin: '100px',
        }
      );

      observerRef.current.observe(node);
    },
    [items, isEnd, onLoadMore]
  );

  return observeLastItem;
}
