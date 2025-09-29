import DragandClick from './DragandClick';
import UploadedImage from './UploadedImage';

function ImageSection() {
  return (
    <section className="mt-5 flex md:flex-wrap overflow-y-scroll no-scrollbar gap-5 whitespace-nowrap px-2 py-5 w-full max-w-full">
      <DragandClick />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
      <UploadedImage />
    </section>
  );
}

export default ImageSection;
