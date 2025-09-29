import ConfirmModal from '@/shared/components/modal-pop/ConfirmModal';
import { useToast } from '@/shared/components/toast/useToast';
import { useLogout } from '../hooks/useAuthHooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

function LogoutConfirm({ open, onClose }: Props) {
  const logoutHandler = useLogout();

  return (
    <ConfirmModal
      open={open}
      onClose={onClose}
      description="정말 로그아웃 하시겠어요?"
      onConfirm={async () => {
        await logoutHandler();
        onClose();
      }}
      onCancel={onClose}
    />
  );
}
export default LogoutConfirm;
