import { getApi } from '@/app/api/config/appConfig';
import ImageBox from '@/shared/assets/icons/imageBox_fill_24.svg';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction } from 'react';
import { UploadedItem } from '../WriteSection';

type Props = {
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
};

function ImageInput({ setUploadedFile }: Props) {
  const { toastError } = useToast();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileList = e.currentTarget.files;
    if (!newFileList) return;

    const newFiles = Array.from(newFileList);
    console.log(newFiles);

    try {
      // 서버 업로드
      const urls = await uploadFiles(newFiles);
      console.log(urls);

      setUploadedFile((prev) => {
        const existingUrls = new Set(prev.map((item) => item.url)); // ✅ 중복 검사 기준
        const newItems = urls.map((url, i) => ({
          file: newFiles[i],
          url,
        }));
        const filteredItems = newItems.filter((item) => !existingUrls.has(item.url)); // ✅ 필터링

        if (prev.length + urls.length > 10) {
          toastError('최대 10개 파일까지 업로드할 수 있어요.');
          return prev;
        }

        return [...prev, ...filteredItems];
      });
    } catch (error) {
      toastError('파일 업로드 실패');
    }
  };

  const uploadFiles = async (files: File[]) => {
    console.log('들어온파일', files);
    if (files.length === 0) return []; // 선택된 파일이 없으면 빈 배열 반환

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));

    const res = await fetch(`${getApi}/file/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('파일 업로드 실패');

    const text = await res.text();
    console.log('서버 응답 텍스트:', text);

    // URL 추출 정규식 (http/https로 시작해서 공백까지)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matched = text.match(urlRegex);

    if (!matched) throw new Error('URL 파싱 실패');

    return matched; // 배열로 반환
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className="border-3 border-dashed shrink-0 border-gray-light w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] rounded-xl cursor-pointer bg-gray-dark flex flex-col gap-3 items-center justify-center hover:bg-gray-dark/70"
      >
        <ImageBox />
        <div className="flex items-center md:text-md text-sm">
          <span>0</span>
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
