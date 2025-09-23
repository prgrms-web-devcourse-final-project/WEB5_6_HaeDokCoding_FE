import ShareBtn from '@/shared/assets/icons/share_28.svg';

interface Props {
  onClick?: () => void;
  variants?: 'default' | 'community';
  title?: string;
  content?: string;
}

function Share({ onClick, variants = 'default', title, content }: Props) {
  // title과 content는 추후 API가 들어오면 사용예정 API가 들어오면 타입 옵셔널 체크 해제헤 주세요

  return (
    <button
      type="button"
      className={
        variants == 'community'
          ? 'w-13.75 h-13.75 flex-center border-1 border-white rounded-full'
          : ''
      }
      aria-label="공유하기"
      onClick={onClick}
    >
      <ShareBtn
        fill="transparent"
        className="duration-100 object-contain  hover:[&_*]:fill-white/50 [&_*]:duration-200"
        aria-hidden
      />
    </button>
  );
}
export default Share;
