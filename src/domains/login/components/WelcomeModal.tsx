'use client';

import Image from 'next/image';

import Button from '@/shared/components/button/Button';
import ModalLayout from '@/shared/components/modalPop/ModalLayout';
import Ssury from '@/shared/assets/ssury/ssury_jump.webp';
import { useRouter } from 'next/navigation';

interface Props {
  userNickname: string;
  open: boolean;
  onClose: () => void;
}

function Welcome({ userNickname, open, onClose }: Props) {
  const router = useRouter();

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title={`환영합니다, ${userNickname}님!`}
      description="바텐더 쑤리가 안내해드릴게요"
      buttons={
        <>
          <Button
            type="button"
            color="purple"
            onClick={() => {
              onClose();
              router.push('/recipe');
            }}
          >
            칵테일 레시피 보러가기
          </Button>
          <Button
            type="button"
            onClick={() => {
              onClose();
              router.push('/recommend');
            }}
          >
            칵테일 취향 추천받기
          </Button>
        </>
      }
    >
      <div className="flex-center">
        <div className="relative w-32 h-32" aria-hidden>
          <Image src={Ssury} alt="" fill sizes="128px" className="object-contain" />
        </div>
      </div>
    </ModalLayout>
  );
}
export default Welcome;
