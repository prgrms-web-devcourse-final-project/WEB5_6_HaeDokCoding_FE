import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { Dispatch, SetStateAction } from 'react';
import useFetchMyBar from '../api/fetchMyBar';

interface Props {
  open: boolean;
  onClose: () => void;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function DeleteAllModal({ open, onClose,setIsModal }: Props) {

  const {deleteMyBar} = useFetchMyBar()
  const handleDelete = () => {
    deleteMyBar.mutate(undefined, {
      onSuccess:() => setIsModal(false)
    })
  }
  
  return (
    <ConfirmModal
      title="전체 삭제"
      description="정말로 전부 삭제하시겠습니까?"
      open={open}
      onClose={onClose}
      onConfirm={handleDelete}
      onCancel={onClose}
    ></ConfirmModal>
  );
}
export default DeleteAllModal;
