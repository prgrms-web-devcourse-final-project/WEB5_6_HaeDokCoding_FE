import ConfirmModal from '@/shared/components/modalPop/ConfirmModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoginConfirm({ open, onClose }: Props) {
  return <ConfirmModal open={open} onClose={onClose} description="정말 로그아웃 하시겠어요?" />;
}
export default LoginConfirm;
