import Close from '@/shared/assets/icons/close_20.svg';
import InfoSvg from '@/shared/assets/icons/info_toast_32.svg';
import SuccesSvg from '@/shared/assets/icons/success_toast_32.svg';
import ErrorSvg from '@/shared/assets/icons/error_toast_32.svg';

interface Props {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

function CustomToast({ type, message, onClose }: Props) {
  return (
    <div className="relative flex items-center w-full gap-4 px-4 py-3 rounded-xl bg-bg-pop shadow-[0_0_12px_0_rgba(255,255,255,0.8)]">
      <div>
        {type === 'info' && <InfoSvg />}
        {type === 'success' && <SuccesSvg />}
        {type === 'error' && <ErrorSvg />}
      </div>

      <p className="text-sm text-white pr-4">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="toast 닫기"
        className="absolute top-1 right-2"
      >
        <Close aria-hidden />
      </button>
    </div>
  );
}

export default CustomToast;
