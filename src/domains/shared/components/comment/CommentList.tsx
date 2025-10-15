import { CommentType } from '@/domains/community/types/post';
import CommentTitle from './CommentTitle';
import React, { useEffect, useRef, useState } from 'react';
import AutoGrowingTextarea from '../../../community/components/textarea/AutoGrowingTextarea';
import { useInfiniteScrollObserver } from '@/shared/hook/useInfiniteScrollObserver';
import { useCommentEnterAnimation } from '@/domains/community/hook/useCommentAnimation';
import { usePrevious } from 'react-use';
import Link from 'next/link';

type Props = {
  comments: CommentType[] | null;
  currentUserNickname?: string;
  onUpdateComment?: (commentId: number, content: string) => Promise<void>;
  onDeleteComment?: (commentId: number) => void;
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
        if (parentRef.current) {
          parentRef.current.scrollTop = 0;
        }
      });
    }
  }, [comments, prevComments]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <>
      <div
        aria-label="댓글 목록"
        className="flex flex-col mt-6 overflow-y-auto no-scrollbar"
        ref={parentRef}
        style={{ minHeight: '300px', maxHeight: '600px' }}
      >
        <ul>
          {comments?.map((comment, index) => {
            const { commentId, content, userNickName, createdAt, postId } = comment;
            const isEditing = editCommentId === commentId;
            const isMyComment = comments && currentUserNickname === userNickName;
            const isLast = index === comments.length - 1;
            const key = `${commentId}-${createdAt}`;

            return myPage ? (
              <Link href={`/community/${postId}`} key={key}>
                <li
                  className="border-b-1 border-gray py-3"
                  ref={(el) => {
                    if (index === 0) firstItemRef.current = el;
                    if (isLast) observeLastItem(el);
                  }}
                >
                  <article>
                    <CommentTitle
                      userNickname={myPage ? currentUserNickname! : userNickName}
                      commentTime={createdAt}
                      isMyComment={isMyComment}
                      isEditing={isEditing}
                      myPage={myPage}
                      onSubmitEdit={() => {
                        const updatedContent = editedContentMap[commentId];
                        if (!updatedContent) return;
                        if (!onUpdateComment) return;
                        onUpdateComment(commentId, updatedContent).then(() => {
                          setEditCommentId(null);
                          setEditedContentMap((prev) => {
                            const next = { ...prev };
                            delete next[commentId];
                            return next;
                          });
                        });
                      }}
                      onDelete={() => {
                        if (!onDeleteComment) return;
                        onDeleteComment(commentId);
                      }}
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
              </Link>
            ) : (
              <li
                className="border-b-1 border-gray py-3"
                key={key}
                ref={(el) => {
                  if (index === 0) firstItemRef.current = el;
                  if (isLast) observeLastItem(el);
                }}
              >
                <article>
                  <CommentTitle
                    userNickname={myPage ? currentUserNickname! : userNickName}
                    commentTime={createdAt}
                    isMyComment={isMyComment}
                    isEditing={isEditing}
                    myPage={myPage}
                    onSubmitEdit={() => {
                      const updatedContent = editedContentMap[commentId];
                      if (!updatedContent) return;
                      if (!onUpdateComment) return;
                      onUpdateComment(commentId, updatedContent).then(() => {
                        setEditCommentId(null);
                        setEditedContentMap((prev) => {
                          const next = { ...prev };
                          delete next[commentId];
                          return next;
                        });
                      });
                    }}
                    onDelete={() => {
                      if (!onDeleteComment) return;
                      onDeleteComment(commentId);
                    }}
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
            <li className="text-center py-4 text-gray-500 text-sm">더 이상 댓글이 없어요.</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default React.memo(CommentList);
