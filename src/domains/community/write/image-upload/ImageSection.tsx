import { Dispatch, SetStateAction, useEffect } from 'react';
import ImageInput from './ImageInput';
import UploadedImage from './UploadedImage';
import { UploadedItem } from '@/domains/recipe/types/types';

type Props = {
  uploadedFile: UploadedItem[];
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
};

function ImageSection({ uploadedFile, setUploadedFile }: Props) {
  useEffect(() => {
    console.log(uploadedFile);
  }, [uploadedFile]);

  const handleAddImage = (newFiles: UploadedItem[]) => {
    const MAX_IMAGES = 10;
    if (uploadedFile.length + newFiles.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있어요.`);
      return;
    }
    setUploadedFile((prev) => [...prev, ...newFiles]);
  };

  return (
    <section className="mt-5 sm:grid md:grid-cols-7 sm:grid-cols-5 sm:place-items-center  flex overflow-y-scroll no-scrollbar gap-5 whitespace-nowrap py-5 w-full max-w-full">
      <ImageInput uploadedFile={uploadedFile} onAddImage={handleAddImage} />
      {uploadedFile && (
        <UploadedImage uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
      )}
    </section>
  );
}

export default ImageSection;
