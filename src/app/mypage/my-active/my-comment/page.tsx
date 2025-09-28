import CommentList from '@/domains/shared/components/comment/CommentList';
function MyComment() {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <CommentList></CommentList>
    </div>
  );
}
export default MyComment;
