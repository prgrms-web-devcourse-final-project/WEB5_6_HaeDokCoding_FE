import ShareBtn from '@/shared/assets/icons/share_28.svg';

interface Props {
  onClick?: () => void;
  variants?: 'default' | 'community';
  size: 'sm' | 'md';
}

function Share({ onClick, variants = 'default', size }: Props) {
  return (
    <button
      type="button"
      className={`${
        variants == 'community' && size === 'md'
          ? 'w-13.75 h-13.75 flex-center border-1 border-white rounded-full'
          : 'z-1'
      } bg-primary`}
      aria-label="공유하기"
      onClick={onClick}
    >
      <ShareBtn
        fill="transparent"
        className="duration-100 object-contain hover:[&_*]:fill-white/50 [&_*]:duration-200"
        aria-hidden
      />
    </button>
  );
}
export default Share;
