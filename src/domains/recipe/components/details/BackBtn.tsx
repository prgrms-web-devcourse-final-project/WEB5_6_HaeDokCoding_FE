'use client';
import Back from '@/shared/assets/icons/back_36.svg';
import Link from 'next/link';


function BackBtn() {

  return (
    <button type="button" className="z-1" aria-label="뒤로가기">
      <Link href="/recipe">
        <Back />
      </Link>
    </button>
  );
}
export default BackBtn;
