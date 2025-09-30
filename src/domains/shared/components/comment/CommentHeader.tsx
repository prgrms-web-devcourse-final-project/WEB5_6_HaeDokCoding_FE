import { postComments } from '@/domains/community/api/fetchComment';
import { CommentType } from '@/domains/community/types/post';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/Input-box/Input';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useAuthStore } from '../../store/auth';

type Props = {
  totalComment?: boolean;
  postId: number;
  comments: CommentType[] | null;
  setComments: Dispatch<SetStateAction<CommentType[] | null>>;
};

function CommentHeader({ totalComment = false, postId, comments, setComments }: Props) {
  const commentRef = useRef<HTMLInputElement | null>(null);

  const user = useAuthStore((state) => state.user);

  const postComment = async () => {
    if (!postId) return;
    const newComment = commentRef.current?.value;
    if (!newComment || newComment.trim() === '') return;
    console.log(newComment);
    const data = await postComments(postId, newComment.trim(), user?.nickname);
    console.log(data);
    if (!data) return;
    setComments(data);

    if (commentRef.current) commentRef.current.value = '';
  };

  return (
    <section aria-label="댓글" className="mt-6 w-full">
      {totalComment && <span>댓글 {comments?.length || 0}</span>}
      <div className="w-full relative mt-5">
        <Input
          placeholder="댓글로 의견을 남겨주세요"
          id="community-comment"
          className="w-full"
          ref={commentRef}
        />
        <Button
          color="purple"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-13 h-7 text-sm pt-1.5"
          size="auto"
          onClick={postComment}
        >
          입력
        </Button>
      </div>
    </section>
  );
}

export default CommentHeader;
