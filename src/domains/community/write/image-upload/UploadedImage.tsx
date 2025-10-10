'use client';

import Image from 'next/image';
import DeleteIcon from '@/shared/assets/icons/close_20.svg';

function UploadedImage() {
  return (
    <figure className="border-3 border-gray-light w-[80px] h-[80px]  rounded-xl relative shrink-0">
      <Image
        src={''}
        alt="칵테일 이미지 예시"
        className="rounded-xl w-full h-full object-cover pointer-events-none"
      />
      <figcaption className="sr-only">업로드된 이미지입니다</figcaption>
      <button
        type="button"
        className="bg-gray-light text-primary py-1 px-1 rounded-full absolute -top-2 -right-2 hover:bg-gray-light/90"
        aria-label="이미지 삭제"
      >
        <DeleteIcon />
      </button>
    </figure>
  );
}

export default UploadedImage;
