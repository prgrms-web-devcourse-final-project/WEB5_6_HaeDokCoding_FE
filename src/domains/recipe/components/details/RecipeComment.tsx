import CommentHeader from '@/domains/shared/components/comment/CommentHeader';
import CommentList from '@/domains/shared/components/comment/CommentList';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useRecipeComment } from '../../api/useRecipeComment';
import { useState } from 'react';
import { CommentType } from '@/domains/community/types/post';
import { ParamValue } from 'next/dist/server/request/params';

interface Props {
  cocktailId: number;
}

function RecipeComment({ cocktailId }: Props) {
 
  const [deleteTarget, setDeleteTarget] = useState<{ commentId: number, cocktailId: number } | null>(null)
  
  const { refetch,createMut,deleteMut,updateMut,user,comments,isLoading } = useRecipeComment({ cocktailId })

  const postRecipeComment = async (postId: number | ParamValue, content: string): Promise<CommentType[] | null> => {
    if (typeof postId !== 'number') return null;
    await createMut.mutateAsync(content)
    const referesh = await refetch()
    return (referesh.data) ?? null
  }
   const handleUpdateComment = (commentId: number, content:string) => updateMut.mutateAsync({ commentId, content });
  
    const handleConfirmDelete = async () => {
      if (!deleteTarget) return;
      await deleteMut.mutateAsync(deleteTarget.commentId);
      setDeleteTarget(null);
    };
    
  const fetchData = () => refetch
  const loadMoreComments = () => { }
  const isEnd = true
  const handleAskDeleteComment = (commentId: number) => setDeleteTarget({ commentId, cocktailId })



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
