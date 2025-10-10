import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import ImageInput from './ImageInput';
import UploadedImage from './UploadedImage';
import { FormType, UploadedItem } from '../WriteSection';

type Props = {
  formData: RefObject<FormType>;
  uploadedFile: UploadedItem[];
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
};

function ImageSection({ formData, uploadedFile, setUploadedFile }: Props) {
  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  useEffect(() => {
    formData.current.imageUrls = uploadedFile.map((file) => file.url);
    console.log(formData.current.imageUrls);
  }, [uploadedFile]);

  return (
    <section className="mt-5 sm:grid md:grid-cols-7 sm:grid-cols-5 sm:place-items-center  flex overflow-y-scroll no-scrollbar gap-5 whitespace-nowrap py-5 w-full max-w-full">
      <ImageInput setUploadedFile={setUploadedFile} />
      {uploadedFile && (
        <UploadedImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
      )}
    </section>
  );
}

export default ImageSection;
