import { getApi } from '@/app/api/config/appConfig';
import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import { useToast } from '@/shared/hook/useToast';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useFetchProfile from '../api/fetchProfile';

interface Props {
  open: boolean;
  onClose: () => void;
  nickname: string;
  setNickName: (v: string) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  editNickName: string;
  setEditNickName: Dispatch<SetStateAction<string>>;
}

function EditNickName({
  open,
  onClose,
  nickname,
  setNickName,
  setIsOpen,
  editNickName,
  setEditNickName,
}: Props) {
  const [defaultNickname, setDefaultNickname] = useState(nickname);
  const { toastSuccess, toastError } = useToast();
  const { patchNickName } = useFetchProfile()
  
  useEffect(() => {
    setEditNickName(nickname);
    setDefaultNickname(nickname);
  }, [nickname, setEditNickName]);

  const handlesave = async () => {
      if (editNickName.length <= 1 || editNickName.length >= 8) {
        toastError('닉네임은 2글자 이상 8글자 이내로 입력해야합니다');
        return;
      }

      await setNickName(editNickName);
      // CRUD중 CUD를 관리하는 메서드
      await patchNickName.mutateAsync(editNickName)

      await setIsOpen(false);
      toastSuccess('닉네임이 저장되었습니다.');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditNickName(e.target.value);
  };

  const handleDefaultNickname = () => {
    setEditNickName(defaultNickname);
  };

  return (
    <ModalLayout
      title="닉네임 변경"
      description="닉네임을 변경해주세요."
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
          placeholder="닉네임을 2글자 이상 8글자 이내로 입력해주세요"
          id="editNickName"
          value={editNickName}
          className="w-full"
        />
        <TextButton onClick={handleDefaultNickname}>전 닉네임으로 돌아가기</TextButton>
      </div>
    </ModalLayout>
  );
}
export default EditNickName;
