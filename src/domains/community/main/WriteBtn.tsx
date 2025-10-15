'use client';

import Write from '@/shared/assets/icons/edit_28.svg';
import { useRouter } from 'next/navigation';
import Button from '@/shared/components/button/Button';
import { useAuthStore } from '@/domains/shared/store/auth';
import { useToast } from '@/shared/hook/useToast';

type RouterType = ReturnType<typeof useRouter>;

function WriteBtn() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { toastError } = useToast();

  const handleClick = (router: RouterType) => {
    if (!isLoggedIn) {
      toastError('로그인 후에 이용 가능합니다.');
      return;
    } else router.push('/community/write');
  };

  return (
    <Button
      type="button"
      size="auto"
      className="flex items-center justify-center py-1 px-2.5 bg-tertiary rounded-lg text-white"
      onClick={() => handleClick(router)}
      aria-label="새 글 작성"
    >
      <Write aria-hidden />
      글쓰기
    </Button>
  );
}

export default WriteBtn;
