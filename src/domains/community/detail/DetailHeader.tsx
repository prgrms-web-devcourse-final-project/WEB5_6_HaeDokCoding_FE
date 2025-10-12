import Label from '@/domains/shared/components/label/Label';
import EditDelete from './EditDelete';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';

type Props = {
  categoryName: string;
  postId: number;
  userNickName: string;
};

function DetailHeader({ categoryName, postId, userNickName }: Props) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { toastError } = useToast();

  return (
    <section className="mt-15 flex justify-between items-center">
      <Label title={categoryName} />
      {userNickName === user?.nickname && (
        <EditDelete
          use="post"
          onEdit={() => {
            router.push(`/community/edit/${postId}`);
          }}
        />
      )}
    </section>
  );
}

export default DetailHeader;
