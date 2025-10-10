'use client';

import Image from 'next/image';
import DeleteIcon from '@/shared/assets/icons/close_20.svg';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { UploadedItem } from '../WriteSection';
import { getApi } from '@/app/api/config/appConfig';

type Props = {
  uploadedFile: UploadedItem[];
  setUploadedFile: Dispatch<SetStateAction<UploadedItem[]>>;
};

function UploadedImage({ uploadedFile, setUploadedFile }: Props) {
  const imageRefs = useRef<HTMLElement[]>([]);
  const prevLength = useRef(0);

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

  const handleDelete = (lastModified: number) => {
    setUploadedFile((prev) => {
      const target = prev.find((p) => p.file.lastModified === lastModified);

      if (target) {
        deleteFileFromServer(target.url); // 서버에서 삭제 요청
      }
      return prev.filter((p) => p.file.lastModified !== lastModified);
    });
  };

  const deleteFileFromServer = async (url: string) => {
    console.log(url);
    try {
      const encodedUrl = encodeURIComponent(url);
      const res = await fetch(`${getApi}/file?fileName=${encodedUrl}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('서버 파일 삭제 실패:', res.status, errorText);
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.error('파일 삭제 요청 에러', err);
    }
  };

  return (
    <>
      {uploadedFile.length > 0 &&
        uploadedFile.map(({ file }, index) => (
          <figure
            className="border-3 border-gray-light w-[100px] h-[100px] sm:w-[80px] sm:h-[80px] rounded-xl relative shrink-0"
            key={file.lastModified}
            ref={(el) => {
              if (el) imageRefs.current[index] = el;
            }}
          >
            {file.type.startsWith('image/') ? (
              <Image
                src={URL.createObjectURL(file)}
                alt="업로드된 이미지"
                className="rounded-xl w-full h-full object-cover pointer-events-none"
                width={100}
                height={100}
              />
            ) : file.type.startsWith('video/') ? (
              <video
                className="rounded-xl w-full h-full object-cover pointer-events-none"
                src={URL.createObjectURL(file)}
                controls
                muted
              />
            ) : null}
            <figcaption className="sr-only">업로드된 이미지입니다</figcaption>
            <button
              type="button"
              className="bg-gray-light text-primary py-1 px-1 rounded-full absolute -top-2 -right-2 hover:bg-gray-light/90"
              aria-label="이미지 삭제"
              onClick={() => handleDelete(file.lastModified)}
            >
              <DeleteIcon />
            </button>
          </figure>
        ))}
    </>
  );
}

export default UploadedImage;
