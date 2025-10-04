import Kakao from '@/shared/assets/icons/kakao.svg';
import Facebook from '@/shared/assets/icons/facebook_40.svg';
import X from '@/shared/assets/icons/x_40.svg';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Link from '@/shared/assets/icons/link_36.svg';
import { CopyLink, faceBookShare, handleShareKakao, twitterShare } from '@/app/api/share/shareLink';
import { useToast } from '@/shared/hook/useToast';
interface Props {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  url: string;
}

function ShareModal({ open, onClose, src, title, url }: Props) {
  const { toastSuccess, toastInfo, toastError } = useToast();

  const handleKakao = () => {
    handleShareKakao(title, src, url);
  };

  const onCopyLink = () => {
    CopyLink();
    toastSuccess('클립보드에 링크를 복사하였습니다');
  };

  return (
    <ModalLayout title="공유하기" open={open} onClose={onClose}>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <button onClick={handleKakao}>
            <Kakao />
          </button>
          <p>카카오톡</p>
        </div>
        <div>
          <button className="flex flex-col items-center gap-2" onClick={faceBookShare}>
            <Facebook />

            <p>페이스북</p>
          </button>
        </div>
        <div>
          <button className="flex flex-col items-center gap-2" onClick={twitterShare}>
            <X />

            <p>X</p>
          </button>
        </div>
        <div>
          <button className="flex flex-col items-center gap-2" onClick={onCopyLink}>
            <span className="bg-white rounded-full">
              <Link />
            </span>
            <p>링크복사</p>
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
export default ShareModal;
