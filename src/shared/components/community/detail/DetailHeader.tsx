import Label from '../../label/Label';
import EditDelete from './EditDelete';

function DetailHeader() {
  return (
    <section className="mt-10 flex justify-between items-end">
      <Label title="팁" />
      <EditDelete use="post" />
    </section>
  );
}

export default DetailHeader;
