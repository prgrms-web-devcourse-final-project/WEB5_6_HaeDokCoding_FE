import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';

interface Props {
  open: boolean;
  onClose: () => void;
}

function EditNickName({ open, onClose }: Props) {
  return (
    <ModalLayout
      title="닉네임 수정"
      description="닉네임을 수정해주세요."
      open={open}
      onClose={onClose}
      buttons={<Button>저장</Button>}
    >
      <div className="flex flex-col gap-3 items-end">
        <label htmlFor="editNickName" className="sr-only">
          닉네임변경
        </label>
        <Input placeholder="8글자 이내로 입력해주세요" id="editNicName" className="w-full" />
        <TextButton onClick={onClose}>기존 이름으로 돌아가기</TextButton>
      </div>
    </ModalLayout>
  );
}
export default EditNickName;
