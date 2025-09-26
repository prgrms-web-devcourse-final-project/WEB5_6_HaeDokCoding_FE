import Button from '../button/Button';
import ModalLayout from './ModalLayout';

interface Props {
  ref?: React.Ref<HTMLDivElement>;
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}
function ConfirmModal({ ref, open, onClose, title, description, children }: Props) {
  return (
    <ModalLayout
      ref={ref}
      size="sm"
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      buttons={
        <>
          <Button type="button" size="sm">
            취소
          </Button>
          <Button type="button" size="sm" color="purple">
            확인
          </Button>
        </>
      }
    >
      {children}
    </ModalLayout>
  );
}
export default ConfirmModal;
