import Label from '../../label/Label';
import EditDelete from './EditDelete';

function DetailHeader() {
  return (
    <section className="mt-15 flex justify-between items-center">
      <Label title="팁" />
      <EditDelete />
    </section>
  );
}

export default DetailHeader;
