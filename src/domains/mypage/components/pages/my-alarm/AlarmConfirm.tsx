import { useConfirm } from '@/domains/mypage/hook/useConfirm';
import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  state: boolean | null;
  cancle: () => void;
  setIsAlarm: Dispatch<SetStateAction<boolean | null>>;
  setIsClick: Dispatch<SetStateAction<boolean>>;
}

function AlarmConfirm({ open, onClose, state, cancle, setIsAlarm, setIsClick }: Props) {
  const { patchAlarm } = useConfirm(state, setIsAlarm, setIsClick);

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      description={state ? '알림을 해제하시겠습니까?' : '알림을 설정하시겠습니까?'}
      onConfirm={patchAlarm}
      onCancel={cancle}
    ></ConfirmModal>
  );
}
export default AlarmConfirm;
