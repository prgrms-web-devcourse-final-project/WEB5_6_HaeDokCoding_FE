'use client';

import Image from 'next/image';

import Button from '@/shared/components/button/Button';
import ModalLayout from '@/shared/components/modalPop/ModalLayout';
import Ssury from '@/shared/assets/ssury/ssury_jump.webp';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/shared/@store/modal';
import { useAuthStore } from '@/shared/@store/auth';

function Welcome() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { welcomeModal, closeWelcomeModal } = useModalStore();

  if (!welcomeModal.open || !user) return null;

  return (
    <ModalLayout
      open={welcomeModal.open}
      onClose={closeWelcomeModal}
      title={`환영합니다, ${user.nickname}님!`}
      description="바텐더 쑤리가 안내해드릴게요"
      buttons={
        <>
          <Button
            type="button"
            color="purple"
            onClick={() => {
              closeWelcomeModal();
              router.push('/recipe');
            }}
          >
            칵테일 레시피 보러가기
          </Button>
          <Button
            type="button"
            onClick={() => {
              closeWelcomeModal();
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
