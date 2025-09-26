import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';

interface Props {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

function LogoutConfirm({ open, onClose, onLogout }: Props) {
  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      description="정말 로그아웃 하시겠어요?"
      onConfirm={onLogout}
      onCancel={onClose}
    />
  );
}
export default LogoutConfirm;
