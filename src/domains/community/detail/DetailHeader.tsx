import Label from '@/domains/shared/components/label/Label';
import EditDelete from './EditDelete';
import { useRouter } from 'next/navigation';

type Props = {
  categoryName: string;
  postId: number;
};

function DetailHeader({ categoryName, postId }: Props) {
  const router = useRouter();

  return (
    <section className="mt-15 flex justify-between items-center">
      <Label title={categoryName} />
      <EditDelete
        use="post"
        onEdit={() => {
          router.push(`/community/edit/${postId}`);
        }}
      />
    </section>
  );
}

export default DetailHeader;
