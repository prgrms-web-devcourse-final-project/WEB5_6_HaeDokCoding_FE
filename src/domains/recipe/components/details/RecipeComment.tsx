import CommentHeader from '@/domains/shared/components/comment/CommentHeader';
import CommentList from '@/domains/shared/components/comment/CommentList';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useShallow } from 'zustand/shallow';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useRecipeComments } from '../../api/useRecipeComment';
import { getApi } from '@/app/api/config/appConfig';
import { useToast } from '@/shared/hook/useToast';
import { ParamValue } from 'next/dist/server/request/params';

interface Props {
  cocktailId: number;
}

function RecipeComment({ cocktailId }: Props) {
  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  const { toastInfo } = useToast();

  const postRecipeComment = async (cocktailId: number | ParamValue, content: string) => {
    if (!user?.id) {
      toastInfo('로그인 후 이용 가능합니다');
      return;
    }
    const body = {
      cocktailId,
      content: content,
    };

    const res = await fetch(`${getApi}/cocktails/${cocktailId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) {
      toastInfo('댓글은 한 개만 작성가능합니다');
      return;
    }

    const data = JSON.parse(text);
    return data;
  };

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
  } = useRecipeComments(cocktailId, user);

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
