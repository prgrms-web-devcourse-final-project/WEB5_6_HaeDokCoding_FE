'use client';

import Image from 'next/image';
import DeleteIcon from '@/shared/assets/icons/close_20.svg';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UploadedItem } from '@/domains/recipe/types/types';
import { useToast } from '@/shared/hook/useToast';

type Props = {
  uploadedFile: UploadedItem[];
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
};

function UploadedImage({ uploadedFile, setUploadedFile }: Props) {
  const imageRefs = useRef<HTMLElement[]>([]);
  const prevLength = useRef(0);
  const { toastError } = useToast();

  useEffect(() => {
    const isAdded = uploadedFile.length > prevLength.current;
    prevLength.current = uploadedFile.length;

    if (!isAdded || uploadedFile.length === 0) return;

    // 마지막 이미지에만 애니메이션 적용
    const lastIndex = uploadedFile.length - 1;
    const el = imageRefs.current[lastIndex];

    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, x: -20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [uploadedFile]);

  const handleDelete = (target: UploadedItem) => {
    setUploadedFile((prev) =>
      prev.filter((item) => {
        // File 기반 비교 (업로드 직후)
        if (target.file && item.file && target.isNew) {
          return item.file.name !== target.file.name || item.file.size !== target.file.size;
        }
        // URL 기반 비교 (수정시 불러온 이미지)
        return item.url !== target.url;
      })
    );
  };

  return (
    <>
      {uploadedFile.length > 0 &&
        uploadedFile.map(({ file, url }, index) => {
          const src = file ? URL.createObjectURL(file) : url;

          return (
            <figure
              key={file ? `${file.name}-${file.size}` : url}
              ref={(el) => {
                if (el) imageRefs.current[index] = el;
              }}
              className="border-3 border-gray-light w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] rounded-xl relative shrink-0"
            >
              <Image
                src={src}
                alt="업로드된 이미지"
                className="rounded-xl w-full h-full object-cover pointer-events-none"
                width={100}
                height={100}
                unoptimized={true} // next/image가 외부 url 처리 못 하면 이 옵션도 추가 가능
                onError={(e) => {
                  // 402 에러 등으로 이미지 로딩 실패 시 fallback 이미지 사용
                  e.currentTarget.src = '/CocktailDrop.webp';
                  toastError('이미지가 너무 크거나 손상되어 기본 이미지로 대체됩니다.');
                }}
              />
              <figcaption className="sr-only">업로드된 이미지입니다</figcaption>
              <button
                type="button"
                className="bg-gray-light text-primary py-1 px-1 rounded-full absolute -top-2 -right-2 hover:bg-gray-light/90"
                aria-label="이미지 삭제"
                onClick={() => handleDelete({ file, url })}
              >
                <DeleteIcon />
              </button>
            </figure>
          );
        })}
    </>
  );
}

export default React.memo(UploadedImage);
