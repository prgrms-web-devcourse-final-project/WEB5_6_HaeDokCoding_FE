import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

function DeleteAllModal({ open, onClose }: Props) {
  return (
    <ConfirmModal
      title="전체 삭제"
      description="정말로 전부 삭제하시겠습니까?"
      open={open}
      onClose={onClose}
    ></ConfirmModal>
  );
}
export default DeleteAllModal;
