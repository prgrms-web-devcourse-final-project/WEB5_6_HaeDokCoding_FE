'use client';
import Back from '@/shared/assets/icons/back_36.svg';
import { useRouter } from 'next/navigation';

function BackBtn() {
  const router = useRouter();
  console.log(router);

  return (
    <button type="button" className="z-1" onClick={router.back} aria-label="뒤로가기">
      <Back />
    </button>
  );
}
export default BackBtn;
