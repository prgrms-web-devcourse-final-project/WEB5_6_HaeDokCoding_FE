import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useDeleteAll } from '../hook/useDeleteAll';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function DeleteAllModal({ open, onClose,setIsModal }: Props) {
  const {deleteBar} = useDeleteAll(setIsModal)
  return (
    <ConfirmModal
      title="전체 삭제"
      description="정말로 전부 삭제하시겠습니까?"
      open={open}
      onClose={onClose}
      onConfirm={deleteBar}
      onCancel={onClose}
    ></ConfirmModal>
  );
}
export default DeleteAllModal;
