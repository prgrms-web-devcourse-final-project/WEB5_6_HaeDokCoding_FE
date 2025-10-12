import { getApi } from '@/app/api/config/appConfig';
import { UploadedItem } from '@/domains/recipe/types/types';
import ImageBox from '@/shared/assets/icons/imageBox_fill_24.svg';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  uploadedFile: UploadedItem[];
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
  onAddImage: (newFiles: UploadedItem[]) => void;
};

function ImageInput({ uploadedFile, setUploadedFile, onAddImage }: Props) {
  const { toastError } = useToast();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileList = e.currentTarget.files;
    if (!newFileList) return;

    const newFiles = Array.from(newFileList);

    try {
      const urls: string[] = await uploadFiles(newFiles);

      const newItems: UploadedItem[] = urls.map((url, i) => ({
        file: newFiles[i],
        url,
      }));

      const totalLength = uploadedFile.length + newItems.length;

      if (totalLength > 10) {
        toastError('최대 10개 파일까지 업로드할 수 있어요.');
        return;
      }

      // 중복 제거
      const existingUrls = new Set(uploadedFile.map((item) => item.url));
      const filteredItems = newItems.filter((item) => !existingUrls.has(item.url));

      if (filteredItems.length === 0) {
        toastError('이미 업로드된 파일입니다.');
        return;
      }

      onAddImage(filteredItems); // ✅ 상위에서 상태 업데이트
    } catch (error) {
      toastError('파일 업로드 실패');
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));

    const res = await fetch(`${getApi}/file/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('파일 업로드 실패');

    const data = await res.json();
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matched = data.data.match(urlRegex);

    if (!matched) throw new Error('URL 파싱 실패');

    return matched;
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className="border-3 border-dashed shrink-0 border-gray-light w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] rounded-xl cursor-pointer bg-gray-dark flex flex-col gap-3 items-center justify-center hover:bg-gray-dark/70"
      >
        <ImageBox />
        <div className="flex items-center md:text-md text-sm">
          <span>{uploadedFile.length}</span>
          <span>/</span>
          <span>10</span>
        </div>
      </label>
      <input
        type="file"
        id="fileInput"
        hidden
        accept="image/*, video/*"
        multiple
        onChange={handleInputChange}
      />
    </>
  );
}

export default ImageInput;
