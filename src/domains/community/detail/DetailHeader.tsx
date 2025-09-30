import Label from '@/domains/shared/components/label/Label';
import EditDelete from './EditDelete';

type Props = {
  categoryName: string;
};

function DetailHeader({ categoryName }: Props) {
  return (
    <section className="mt-15 flex justify-between items-center">
      <Label title={categoryName} />
      <EditDelete use="post" />
    </section>
  );
}

export default DetailHeader;
