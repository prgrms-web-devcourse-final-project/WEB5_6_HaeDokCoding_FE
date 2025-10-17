import Label from '@/domains/shared/components/label/Label';
import EditDelete from './EditDelete';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useState } from 'react';
import { getApi } from '@/app/api/config/appConfig';
import { ParamValue } from 'next/dist/server/request/params';

type Props = {
  categoryName: string;
  postId: number | ParamValue;
  userNickName: string;
};

function DetailHeader({ categoryName, postId, userNickName }: Props) {
  const [deletePost, setDeletePost] = useState(false);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { toastError } = useToast();

  const handleConfirmDelete = async (postId: number | ParamValue) => {
    if (!user) {
      alert('로그인이 필요합니다');
      return;
    }

    try {
      const res = await fetch(`${getApi}/posts/${postId}`, { method: 'DELETE' });
      router.push('/community');
    } catch (err) {
      console.error(err);
      alert('글 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <section className="mt-15 flex justify-between items-center">
        <Label title={categoryName} />
        {userNickName === user?.nickname && (
          <EditDelete
            use="post"
            onEdit={() => {
              router.push(`/community/edit/${postId}`);
            }}
            onDelete={() => {
              setDeletePost(true);
            }}
          />
        )}
      </section>
      {deletePost && (
        <ConfirmModal
          open={deletePost}
          onConfirm={() => handleConfirmDelete(postId)}
          onCancel={() => setDeletePost(false)}
          onClose={() => setDeletePost(false)}
          title="글 삭제"
          description="정말 이 글을 삭제하시겠습니까?"
        />
      )}
    </>
  );
}

export default DetailHeader;
