import { UploadedItem } from '@/domains/recipe/types/types';
import ImageBox from '@/shared/assets/icons/imageBox_fill_24.svg';
import { useToast } from '@/shared/hook/useToast';

type Props = {
  uploadedFile: UploadedItem[];
  onAddImage: (newFiles: UploadedItem[]) => void;
};

function ImageInput({ uploadedFile, onAddImage }: Props) {
  const { toastError } = useToast();

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFileList = e.currentTarget.files;
    if (!newFileList) return;

    const newFiles = Array.from(newFileList);

    // 파일을 선택하지 않고 취소한 경우 조용히 리턴
    if (newFiles.length === 0) return;

    try {
      // 파일 크기 검증 (모바일 최적화)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = newFiles.filter((file) => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        toastError('파일 크기는 5MB 이하로 업로드해주세요.');
        return;
      }

      const totalLength = uploadedFile.length + newFiles.length;
      if (totalLength > 10) {
        toastError('최대 10개 파일까지 업로드할 수 있어요.');
        return;
      }
      // 중복 제거
      const existingIdentifiers = new Set(
        uploadedFile.map((item) => (item.file ? `${item.file.name}-${item.file.size}` : item.url))
      );
      const filteredItems = newFiles
        .filter((file) => !existingIdentifiers.has(`${file.name}-${file.size}`))
        .map((file) => ({
          file,
          url: URL.createObjectURL(file), // 미리보기용
          isNew: true,
        }));

      if (filteredItems.length === 0) {
        toastError('이미 업로드된 파일입니다.');
        return;
      }

      onAddImage(filteredItems); // ✅ 상위에서 상태 업데이트
    } catch (error) {
      toastError('파일 업로드 실패');
    }
  };

  return (
    <>
      <label
        htmlFor="fileInput"
        className="border-3 border-dashed shrink-0 border-gray-light w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] rounded-xl cursor-pointer bg-gray-dark flex flex-col gap-3 items-center justify-center hover:bg-gray-dark/70 active:bg-gray-dark/50 touch-manipulation"
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
        className="sr-only"
        accept="image/*,image/jpeg,image/jpg,image/png,image/webp"
        multiple
        onChange={handleInputChange}
      />
    </>
  );
}

export default ImageInput;
