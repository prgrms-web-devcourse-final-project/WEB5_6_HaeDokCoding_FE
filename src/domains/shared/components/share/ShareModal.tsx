import Kakao from '@/shared/assets/icons/kakao.svg';
import Facebook from '@/shared/assets/icons/facebook_40.svg';
import X from '@/shared/assets/icons/x_40.svg';
import ModalLayout from '@/shared/components/modal-pop/ModalLayout';
import Link from '@/shared/assets/icons/link_36.svg';

import { useToast } from '@/shared/hook/useToast';
import {
  CopyLink,
  faceBookShare,
  handleShareKakao,
  twitterShare,
} from '../../utills/share-link/shareLink';
interface Props {
  open: boolean;
  onClose: () => void;
  src: string;
  title: string;
  url: string;
}

function ShareModal({ open, onClose, src, title, url }: Props) {
  const { toastSuccess } = useToast();

  const handleKakao = () => {
    handleShareKakao(title, src, url);
  };

  const onCopyLink = () => {
    CopyLink();
    toastSuccess('클립보드에 링크를 복사하였습니다');
  };

  return (
    <ModalLayout title="공유하기" open={open} onClose={onClose}>
      <ul className="flex justify-center items-center gap-4">
        <li>
          <button className="flex flex-col items-center gap-2" onClick={handleKakao}>
            <Kakao />
            <p>카카오톡</p>
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center gap-2" onClick={faceBookShare}>
            <Facebook />
            <p>페이스북</p>
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center gap-2" onClick={twitterShare}>
            <X />
            <p>X</p>
          </button>
        </li>
        <li>
          <button className="flex flex-col items-center gap-2" onClick={onCopyLink}>
            <span className="bg-white rounded-full">
              <Link />
            </span>
            <p>링크복사</p>
          </button>
        </li>
      </ul>
    </ModalLayout>
  );
}
export default ShareModal;
