import DragandClick from './DragandClick';
import UploadedImage from './UploadedImage';

function ImageSection() {
  return (
    <section className="mt-5 sm:grid md:grid-cols-7 sm:grid-cols-5 sm:place-items-center  flex overflow-y-scroll no-scrollbar gap-5 whitespace-nowrap py-5 w-full max-w-full">
      <DragandClick />
      <UploadedImage />
    </section>
  );
}

export default ImageSection;
