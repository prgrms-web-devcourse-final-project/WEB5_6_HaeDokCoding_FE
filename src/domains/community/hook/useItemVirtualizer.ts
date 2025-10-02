import { useVirtualizer } from '@tanstack/react-virtual';
import { CommentType, Post } from '../types/post';

export function useItemVirtualizer(
  items: CommentType[] | Post[] | null,
  parentRef: React.RefObject<HTMLElement | null>
) {
  return useVirtualizer({
    count: items?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 95,
    overscan: 4,
  });
}
