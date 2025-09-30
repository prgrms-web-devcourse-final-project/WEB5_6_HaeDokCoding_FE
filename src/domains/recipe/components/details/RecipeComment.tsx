import CommentHeader from '@/domains/shared/components/comment/CommentHeader';
import CommentList from '@/domains/shared/components/comment/CommentList';

function RecipeComment() {
  return (
    <div className="mb-10 border-t-1 border-gray">
      <CommentHeader totalComment={true} />
      <CommentList />
    </div>
  );
}
export default RecipeComment;
