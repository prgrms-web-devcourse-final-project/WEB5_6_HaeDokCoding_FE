import EditDelete from './EditDelete';
import PostLabel from '../PostLabel';

function DetailHeader() {
  return (
    <section className="mt-15 flex justify-between items-center">
      <PostLabel title="팁" />
      <EditDelete />
    </section>
  );
}

export default DetailHeader;
