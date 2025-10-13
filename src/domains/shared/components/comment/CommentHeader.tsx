import { CommentType } from '@/domains/community/types/post';
import { useRef } from 'react';
import Textarea from '@/shared/components/textarea-box/Textarea';
import { intervalCall } from '@/shared/utills/intervalCall';
import { resizeTextarea } from '@/shared/utills/textareaResize';
import { useToast } from '@/shared/hook/useToast';
import { ParamValue } from 'next/dist/server/request/params';

type Props = {
  totalComment?: boolean;
  postId: number | ParamValue;
  comments: CommentType[] | null;
  onCommentAdded: () => void; //댓글 추가 후 실행할 콜백
  postCommentsApi: (postId: number | ParamValue, comment: string) => Promise<CommentType[] | null>;
};

function CommentHeader({
  totalComment = false,
  postId,
  comments,
  onCommentAdded,
  postCommentsApi,
}: Props) {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const intervalCall1000 = intervalCall(1000);
  const { toastError } = useToast();

  const createComment = async (commentText: string) => {
    if (!postId || !commentText.trim()) return false;
    if (commentText.length > 500) {
      toastError('댓글은 500자 이하로 입력해주세요.');
      return false;
    }

    const data = await postCommentsApi(postId, commentText);
    if (!data) return false;

    if (commentRef.current) {
      commentRef.current.value = '';
      resizeTextarea(commentRef.current);
    }

    onCommentAdded();
    return true;
  };

  const postComment = async () => {
    const newComment = commentRef.current?.value ?? '';
    await createComment(newComment);
    // if (success && comments) {
    //   updateCommentCount(postId, comments.length + 1);
    // }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newComment = commentRef.current?.value ?? '';
      if (!newComment.trim()) return;

      intervalCall1000(async () => {
        const success = await createComment(newComment);
        if (!success) {
          console.log('칵테일 페이지에서 댓글은 한개만 입력 가능합니다');
        }
      });
    }
  };

  return (
    <section aria-label="댓글" className="mt-6 w-full">
      {totalComment && <span>댓글 {comments?.length || 0}</span>}
      <div className="w-full relative mt-5 ">
        <Textarea
          placeholder="댓글로 의견을 남겨주세요"
          id="community-comment"
          className="w-full "
          ref={commentRef}
          onKeyDown={handleKeyDown}
          onClick={postComment}
        />
      </div>
    </section>
  );
}

export default CommentHeader;
