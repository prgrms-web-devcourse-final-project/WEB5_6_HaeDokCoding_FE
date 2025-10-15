import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { Dispatch, SetStateAction } from 'react';
import useFetchMyBar from '../api/fetchMyBar';
import useFetchAlarm from '../api/fetchAlarm';
import { useToast } from '@/shared/hook/useToast';

interface Props {
  open: boolean;
  onClose: () => void;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  type: 'myBar' | 'myAlarm';
}

function DeleteAllModal({ open, onClose, setIsModal, type }: Props) {
  const { toastSuccess } =useToast()
  const { deleteMyBar } = useFetchMyBar();
  const { deleteAlarm } = useFetchAlarm();
  const handleBarDelete = () => {
    deleteMyBar.mutate(undefined, {
      onSuccess: () => {
        toastSuccess('성공적으로 삭제 되었습니다.');
        setIsModal(false);
      }
    });
  };
  const handleAlarmDelete = () => {
    deleteAlarm.mutate(undefined, {
      onSuccess: () => {
        setIsModal(false);
        toastSuccess('성공적으로 삭제 되었습니다.');
      },
    });
  };

  return (
    <ConfirmModal
      title="전체 삭제"
      description="정말로 전부 삭제하시겠습니까?"
      open={open}
      onClose={onClose}
      onConfirm={type == 'myBar' ? handleBarDelete : handleAlarmDelete}
      onCancel={onClose}
    ></ConfirmModal>
  );
}
export default DeleteAllModal;
