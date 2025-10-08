import { getApi } from '@/app/api/config/appConfig';
import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  setNickName: (v: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editNickName: string;
  setEditNickName: Dispatch<SetStateAction<string>>;
}

function EditNickName({
  open,
  onClose,
  setNickName,
  setIsOpen,
  editNickName,
  setEditNickName,
}: Props) {
  const { toastError } = useToast();
  const handlesave = async () => {
    if (editNickName.length <= 1) {
      toastError('닉네임은 2글자 이상 입력해야합니다');
      return;
    }

    await setNickName(editNickName);

    await fetch(`${getApi}/me/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: editNickName,
      }),
    });
    await setIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickName(e.target.value);
  };

  return (
    <ModalLayout
      title="닉네임 수정"
      description="닉네임을 수정해주세요."
      open={open}
      onClose={onClose}
      buttons={
        <Button type="submit" onClick={handlesave}>
          저장
        </Button>
      }
    >
      <div className="flex flex-col gap-3 items-end">
        <label htmlFor="editNickName" className="sr-only">
          닉네임변경
        </label>
        <Input
          onChange={(e) => handleChange(e)}
          placeholder="8글자 이내로 입력해주세요"
          id="editNickName"
          className="w-full"
        />
        <TextButton onClick={onClose}>기존 이름으로 돌아가기</TextButton>
      </div>
    </ModalLayout>
  );
}
export default EditNickName;
