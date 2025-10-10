import CommentHeader from '@/domains/shared/components/comment/CommentHeader';
import CommentList from '@/domains/shared/components/comment/CommentList';
import { postRecipeComment } from '../../api/fetchRecipeComment';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useShallow } from 'zustand/shallow';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useRecipeComments } from '../../api/useRecipeComment';

interface Props {
  cocktailId: number;
}

function RecipeComment({ cocktailId }: Props) {
  const { user, accessToken } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      accessToken: state.accessToken,
    }))
  );
  const {
    comments,
    fetchData,
    handleAskDeleteComment,
    handleUpdateComment,
    loadMoreComments,
    isEnd,
    isLoading,
    deleteTarget,
    handleConfirmDelete,
    setDeleteTarget,
  } = useRecipeComments(cocktailId, user, accessToken);

  return (
    <div className="mb-10 border-t-1 border-gray">
      <CommentHeader
        totalComment={true}
        comments={comments}
        postCommentsApi={postRecipeComment}
        postId={cocktailId}
        onCommentAdded={fetchData}
      />
      <CommentList
        comments={comments}
        currentUserNickname={user?.nickname}
        onUpdateComment={handleUpdateComment}
        onDeleteComment={handleAskDeleteComment}
        onLoadMore={loadMoreComments}
        isEnd={isEnd}
        isLoading={isLoading}
      />
      {deleteTarget && (
        <ConfirmModal
          open={!!deleteTarget}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
          onClose={() => setDeleteTarget(null)}
          title="댓글 삭제"
          description="정말 이 댓글을 삭제하시겠습니까?"
        />
      )}
    </div>
  );
}
export default RecipeComment;
