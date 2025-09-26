import Label from '@/domains/shared/components/label/Label';
import EditDelete from './EditDelete';

function DetailHeader() {
  return (
    <section className="mt-15 flex justify-between items-center">
      <Label title="팁" />
      <EditDelete use="post" />
    </section>
  );
}

export default DetailHeader;
