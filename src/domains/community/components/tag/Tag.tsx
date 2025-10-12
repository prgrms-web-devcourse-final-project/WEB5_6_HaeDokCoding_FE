import TagIcon from '@/shared/assets/icons/tag_30.svg';

type Props = {
  use: 'write' | 'detail';
  onClick?: () => void;
};

function Tag({ use, onClick }: Props) {
  return use === 'write' ? (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-1 items-center justify-center text-sm text-secondary border-1 border-gray p-1 rounded-3xl cursor-pointer min-w-32 hover:bg-secondary/10 transition-colors duration-75"
      aria-label="칵테일 태그 선택"
    >
      <TagIcon />
      칵테일태그
    </button>
  ) : (
    <p className="flex gap-1 items-center justify-center text-sm text-secondary">
      <TagIcon />
      칵테일태그
    </p>
  );
}

export default Tag;
