import CrySsury from '@/shared/assets/ssury/ssury_cry.webp';
import Image from 'next/image';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Button from '@/shared/components/button/Button';
interface Props {
  open: boolean;
  onClose: () => void;
}

function WithdrawModal({ open, onClose }: Props) {
  return (
    <ModalLayout
      title="회원탈퇴"
      description="정말로 SSOUL을 탈퇴하실건가요?"
      open={open}
      onClose={onClose}
      buttons={<Button>탈퇴하기</Button>}
    >
      <div className="flex-center">
        <div className="relative w-32 h-32" aria-hidden>
          <Image src={CrySsury} alt="" fill sizes="128px" className="object-cover" />
        </div>
      </div>
    </ModalLayout>
  );
}
export default WithdrawModal;
