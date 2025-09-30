import CloseIcon from '@/shared/assets/icons/close_20.svg';

type Props = {
  hasDelete?: boolean;
  tags: string[];
};

function TagList({ hasDelete, tags }: Props) {
  return (
    <ul className="flex text-sm gap-2 items-center text-primary font-light">
      {tags.map((tag) => (
        <li
          key={tag}
          className={`bg-[#FFE4E6] px-2 py-[1px] rounded-md flex gap-2 ${hasDelete && 'hover:opacity-90 pl-2 pr-1'}`}
        >
          <p>올드패션</p>
          {hasDelete && (
            <button
              type="button"
              className=" rounded-md transition-colors ease-in hover:text-primary/40"
            >
              <CloseIcon />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TagList;
