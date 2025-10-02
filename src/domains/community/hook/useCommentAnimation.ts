import { useEffect, useState } from 'react';
import { CommentType } from '../types/post';
import gsap from 'gsap';

export function useCommentEnterAnimation(
  comments: CommentType[] | null,
  parentRef: React.RefObject<HTMLDivElement | null>
) {
  const [prevFirstCommentId, setPrevFirstCommentId] = useState<number | null>(null);

  useEffect(() => {
    if (!comments || comments.length === 0) return;

    const currentFirstCommentId = comments[0]?.commentId;
    if (prevFirstCommentId !== null && currentFirstCommentId !== prevFirstCommentId) {
      const newCommentElement = parentRef.current?.children[0] as HTMLElement;
      if (newCommentElement) {
        gsap.fromTo(
          newCommentElement,
          { autoAlpha: 0, y: -20 },
          { duration: 0.5, autoAlpha: 1, y: 0, ease: 'power2.out' }
        );
      }
    }

    setPrevFirstCommentId(currentFirstCommentId);
  }, [comments, prevFirstCommentId, parentRef]);
}
