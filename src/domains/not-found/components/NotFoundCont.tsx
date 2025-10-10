'use client';

import Image from 'next/image';
import CrySsury from '@/shared/assets/ssury/ssury_cry.webp';
import Button from '@/shared/components/button/Button';
import { useRouter } from 'next/navigation';

function NotFoundCont() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-5">
      <Image
        src={CrySsury}
        alt=""
        aria-hidden
        width={128}
        height={128}
        className="w-25 h-25 sm:w-32 sm:h-32"
      />
      <h1 className="text-center">페이지를 찾을 수 없어요🥲</h1>
      <Button
        type="button"
        color="default"
        onClick={() => {
          router.push('/');
        }}
      >
        메인으로 이동
      </Button>
    </div>
  );
}
export default NotFoundCont;
