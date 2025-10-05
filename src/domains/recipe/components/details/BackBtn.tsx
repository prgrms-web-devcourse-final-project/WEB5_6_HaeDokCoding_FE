'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Back from '@/shared/assets/icons/back_36.svg';

function BackButton() {
  const searchParams = useSearchParams();
  const recipeUrl = `/recipe${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  // 쿼리스트링을 유지한채 뒤로 돌아가야함

  return (
    <button type="button" className="z-1" aria-label="뒤로가기">
      <Link href={recipeUrl}>
        <Back />
      </Link>
    </button>
  );
}

export default BackButton;
