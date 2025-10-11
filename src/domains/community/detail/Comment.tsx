import CommentHeader from '../../shared/components/comment/CommentHeader';
import CommentList from '../../shared/components/comment/CommentList';
import { postComments } from '../api/fetchComment';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useShallow } from 'zustand/shallow';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useComments } from '../hook/useComment';

type Props = {
  postId: number;
};

function Comment({ postId }: Props) {
  const { user, accessToken } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      accessToken: state.accessToken,
    }))
  );
  const {
    comments,
    isEnd,
    isLoading,
    deleteTarget,
    setDeleteTarget,
    fetchData,
    handleUpdateComment,
    handleAskDeleteComment,
    handleConfirmDelete,
    loadMoreComments,
  } = useComments(postId, user, accessToken);

  return (
    <>
      <section className=" border-t-1 border-gray ">
        <CommentHeader
          postId={postId}
          comments={comments}
          onCommentAdded={fetchData}
          postCommentsApi={postComments}
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
      </section>
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
    </>
  );
}

export default Comment;
