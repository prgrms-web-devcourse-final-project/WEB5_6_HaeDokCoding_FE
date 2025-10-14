'use client';

import { useRouter } from 'next/navigation';
import Back from '@/shared/assets/icons/back_36.svg';

function BackButton() {
  const router = useRouter();


  const handleClick = () => {
    const url = sessionStorage.getItem('saveUrl');
    if (!url) return;
    router.replace(url,{scroll:false});
  };

  return (
    <button type="button" className="z-1" aria-label="뒤로가기" onClick={handleClick}>
      <Back />
    </button>
  );
}

export default BackButton;
