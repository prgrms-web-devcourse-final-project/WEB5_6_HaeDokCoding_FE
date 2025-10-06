import { getApi } from '@/app/api/config/appConfig';
import Button from '@/shared/components/button/Button';
import TextButton from '@/shared/components/button/TextButton';
import Input from '@/shared/components/Input-box/Input';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';

interface Props {
  open: boolean;
  onClose: () => void;
  nickname: string;
  setNickName: (v: string) => void;
}

function EditNickName({ open, onClose, setNickName, nickname }: Props) {
  const handlesave = async () => {
    const res = await fetch(`${getApi}/me/profile`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  return (
    <ModalLayout
      title="닉네임 수정"
      description="닉네임을 수정해주세요."
      open={open}
      onClose={onClose}
      buttons={
        <Button type="submit" onClick={(e) => handlesave(e)}>
          저장
        </Button>
      }
    >
      <div className="flex flex-col gap-3 items-end">
        <label htmlFor="editNickName" className="sr-only">
          닉네임변경
        </label>
        <Input
          onChange={handleChange}
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
