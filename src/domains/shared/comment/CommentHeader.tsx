import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/InputBox/Input';

function CommentHeader({ totalComment = false }: { totalComment?: boolean }) {
  return (
    <section aria-label="댓글" className="mt-6 w-full">
      {totalComment && <span>댓글 2</span>}
      <div className="w-full relative mt-5">
        <Input placeholder="댓글로 의견을 남겨주세요" id="community-comment" className="w-full" />
        <Button
          color="purple"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-13 h-7 text-sm pt-1.5"
          size="auto"
        >
          입력
        </Button>
      </div>
    </section>
  );
}

export default CommentHeader;
