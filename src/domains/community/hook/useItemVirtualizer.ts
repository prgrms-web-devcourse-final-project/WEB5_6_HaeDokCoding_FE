import { useVirtualizer } from '@tanstack/react-virtual';
import { CommentType, Post } from '../types/post';
import { Cocktail } from '@/domains/recipe/types/types';

export function useItemVirtualizer(
  items: CommentType[] | Post[] | Cocktail[] |null,
  parentRef: React.RefObject<HTMLElement | null>
) {
  return useVirtualizer({
    count: items?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 95,
    overscan: 4,
  });
}
