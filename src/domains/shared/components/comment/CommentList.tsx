import { CommentType } from '@/domains/community/types/post';
import CommentTitle from './CommentTitle';
import { useEffect, useRef, useState } from 'react';
import AutoGrowingTextarea from '../../../community/components/textarea/AutoGrowingTextarea';
import gsap from 'gsap';
import { useInfiniteScrollObserver } from '@/shared/hook/useInfiniteScrollObserver';

type Props = {
  comments: CommentType[] | null;
  currentUserNickname?: string;
  onUpdateComment: (commentId: number, postId: number, content: string) => Promise<void>;
  onDeleteComment: (commentId: number, postId: number) => Promise<void>;
  onLoadMore?: (lastCommentId: number) => void; // ← 무한스크롤 콜백
  isEnd?: boolean;
  isLoading: boolean;
};

function CommentList({
  comments,
  currentUserNickname,
  onUpdateComment,
  onDeleteComment,
  onLoadMore,
  isEnd,
  isLoading,
}: Props) {
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editedContentMap, setEditedContentMap] = useState<Record<number, string>>({});
  const [prevFirstCommentId, setPrevFirstCommentId] = useState<number | null>(null);

  const observeLastItem = useInfiniteScrollObserver<HTMLElement>({
    items: comments,
    isEnd,
    onLoadMore: onLoadMore ?? (() => {}),
  });

  useEffect(() => {
    if (!comments || comments.length === 0) return;

    const currentFirstCommentId = comments[0]?.commentId;

    if (prevFirstCommentId !== null && currentFirstCommentId !== prevFirstCommentId) {
      const newCommentElement = ulRef.current?.children[0] as HTMLElement;

      if (newCommentElement) {
        gsap.fromTo(
          newCommentElement,
          { autoAlpha: 0, y: -20 },
          { duration: 0.5, autoAlpha: 1, y: 0, ease: 'power2.out' }
        );
      }
    }
    setPrevFirstCommentId(currentFirstCommentId);
  }, [comments, setPrevFirstCommentId, prevFirstCommentId]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <>
      <ul aria-label="댓글 목록" className="flex flex-col mt-6" ref={ulRef}>
        {comments.map(({ commentId, content, userNickName, createdAt, postId }, index) => {
          const isEditing = editCommentId === commentId;
          const isMyComment = comments && currentUserNickname === userNickName;

          const isLast = index === comments.length - 1;

          return (
            <li
              className="border-b-1 border-gray py-3"
              key={commentId}
              ref={isLast ? observeLastItem : null}
            >
              <article>
                <CommentTitle
                  userNickname={userNickName}
                  commentTime={createdAt}
                  isMyComment={isMyComment}
                  isEditing={isEditing}
                  onSubmitEdit={() => {
                    const updatedContent = editedContentMap[commentId];
                    if (!updatedContent) return;
                    onUpdateComment(commentId, postId, updatedContent).then(() => {
                      setEditCommentId(null);
                      setEditedContentMap((prev) => {
                        const next = { ...prev };
                        delete next[commentId];
                        return next;
                      });
                    });
                  }}
                  onDelete={() => onDeleteComment(commentId, postId)}
                  onEdit={() => {
                    setEditCommentId(commentId);
                    setEditedContentMap((prev) => ({
                      ...prev,
                      [commentId]: content, // 기존 내용 세팅
                    }));
                  }}
                  onCancelEdit={() => {
                    setEditCommentId(null);
                    setEditedContentMap((prev) => {
                      const next = { ...prev };
                      delete next[commentId];
                      return next;
                    });
                  }}
                />
                <article className="mt-4">
                  {isEditing ? (
                    <AutoGrowingTextarea
                      value={editedContentMap[commentId] ?? content}
                      onChange={(e) =>
                        setEditedContentMap((prev) => ({
                          ...prev,
                          [commentId]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <div className="mt-4">
                      <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                  )}
                </article>
              </article>
            </li>
          );
        })}
      </ul>
      {isLoading && (
        <div className="mt-5 py-4 text-center text-sm text-gray-500 animate-pulse">
          댓글 불러오는 중...
        </div>
      )}
      {isEnd && (
        <div className="mt-10 py-4 text-center text-sm text-gray-500">더 이상 댓글이 없습니다.</div>
      )}
    </>
  );
}

export default CommentList;
