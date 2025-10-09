import CommentHeader from '@/domains/shared/components/comment/CommentHeader';
import CommentList from '@/domains/shared/components/comment/CommentList';
import { postRecipeComment } from '../../api/fetchRecipeComment';
import { useComments } from '@/domains/community/hook/useComment';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useShallow } from 'zustand/shallow';

interface Props { 
  cocktailId:number
}

function RecipeComment({cocktailId}:Props) {
  const { user, accessToken } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      accessToken: state.accessToken,
    }))
  );
  const {comments,fetchData,handleAskDeleteComment,handleUpdateComment,loadMoreComments,isEnd,isLoading} = useComments(cocktailId,user,accessToken)

  return (
    <div className="mb-10 border-t-1 border-gray">
      <CommentHeader totalComment={true} comments={comments } postCommentsApi={postRecipeComment} postId={cocktailId} onCommentAdded={fetchData}/>
      <CommentList comments={comments} currentUserNickname={user?.nickname} onUpdateComment={handleUpdateComment} onDeleteComment={handleAskDeleteComment} onLoadMore={loadMoreComments} isEnd={isEnd} isLoading={isLoading} />
    </div>
  );
}
export default RecipeComment;
