import ModalLayout from './ModalLayout';

interface Props {
  ref?: React.Ref<HTMLDivElement>;
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
}
function ConfirmPop({ ref, open, onClose, title, description, children }: Props) {
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
          <button>취소</button>
          <button>확인</button>
        </>
      }
    >
      {children}
    </ModalLayout>
  );
}
export default ConfirmPop;
