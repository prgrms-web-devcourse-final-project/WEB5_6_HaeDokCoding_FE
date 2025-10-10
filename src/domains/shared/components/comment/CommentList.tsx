import { CommentType } from '@/domains/community/types/post';
import CommentTitle from './CommentTitle';
import React, { useEffect, useRef, useState } from 'react';
import AutoGrowingTextarea from '../../../community/components/textarea/AutoGrowingTextarea';
import { useInfiniteScrollObserver } from '@/shared/hook/useInfiniteScrollObserver';
import { useItemVirtualizer } from '@/domains/community/hook/useItemVirtualizer';
import { useCommentEnterAnimation } from '@/domains/community/hook/useCommentAnimation';
import { usePrevious } from 'react-use';

type Props = {
  comments: CommentType[] | null;
  currentUserNickname?: string;
  onUpdateComment: (commentId: number, postId: number, content: string) => Promise<void>;
  onDeleteComment: (commentId: number, postId: number) => void;
  onLoadMore?: (lastCommentId: number) => void; // ← 무한스크롤 콜백
  isEnd?: boolean;
  isLoading: boolean;
  myPage?: boolean;
};

function CommentList({
  comments,
  currentUserNickname,
  onUpdateComment,
  onDeleteComment,
  onLoadMore,
  isEnd,
  myPage = false,
}: Props) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editedContentMap, setEditedContentMap] = useState<Record<number, string>>({});
  const firstItemRef = useRef<HTMLLIElement | null>(null);
  const rowVirtualizer = useItemVirtualizer(comments, parentRef);
  useCommentEnterAnimation(comments, parentRef);

  const observeLastItem = useInfiniteScrollObserver<HTMLElement>({
    items: comments,
    isEnd,
    onLoadMore: onLoadMore ?? (() => {}),
  });

  const prevComments = usePrevious(comments);

  // 새 댓글이 추가됐을 때 스크롤 맨 위로
  useEffect(() => {
    if (!comments || !prevComments) return;

    const newLength = comments.length;
    const oldLength = prevComments.length;

    if (newLength > oldLength) {
      requestAnimationFrame(() => {
        rowVirtualizer.scrollToIndex(0);
      });
    }
  }, [comments, prevComments, rowVirtualizer]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <>
      <div
        aria-label="댓글 목록"
        className="flex flex-col mt-6 overflow-y-auto "
        ref={parentRef}
        style={{ height: '600px', position: 'relative' }}
      >
        <ul style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
          {rowVirtualizer.getVirtualItems().map(({ index, key, start }) => {
            const { commentId, content, userNickName, createdAt, postId } = comments[index];
            const isEditing = editCommentId === commentId;
            const isMyComment = comments && currentUserNickname === userNickName;

            const isLast = index === comments.length - 1;

            return (
              <li
                className="border-b-1 border-gray py-3"
                key={key}
                data-index={index}
                ref={(el) => {
                  if (el) {
                    requestAnimationFrame(() => {
                      try {
                        rowVirtualizer.measureElement(el);
                      } catch (e) {
                        console.error('measureElement failed', e);
                      }
                    });
                    if (index === 0) firstItemRef.current = el;
                    if (isLast) observeLastItem(el);
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${start}px)`,
                  minHeight: '60px', // ← 최소 보장
                }}
              >
                <article>
                  <CommentTitle
                    userNickname={userNickName}
                    commentTime={createdAt}
                    isMyComment={isMyComment}
                    isEditing={isEditing}
                    myPage={myPage}
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
                  <article className="mt-4 h-full">
                    {isEditing ? (
                      <AutoGrowingTextarea
                        value={editedContentMap[commentId] ?? content}
                        rowVirtualize={rowVirtualizer}
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
          {isEnd && (
            <li
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${rowVirtualizer.getTotalSize()}px)`,
                textAlign: 'center',
                padding: '1rem',
                color: '#999',
                fontSize: '14px',
              }}
            >
              더 이상 댓글이 없어요.
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default React.memo(CommentList);
