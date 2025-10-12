import CloseIcon from '@/shared/assets/icons/close_20.svg';

type Props = {
  hasDelete?: boolean;
  tags: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
};

function TagList({ hasDelete, tags, setTags }: Props) {
  const handleDelete = (name: string) => {
    return setTags && setTags((prev: string[]) => prev?.filter((p) => p !== name));
  };

  if (!tags) return;
  return (
    <ul className="flex text-sm gap-2 items-center text-primary font-light flex-wrap">
      {tags?.length > 0 &&
        tags.map((tag) => (
          <li
            key={tag}
            className={`bg-[#FFE4E6] px-2 py-[1px] rounded-md flex gap-2 ${hasDelete && 'hover:opacity-90 pl-2 pr-1'}`}
          >
            <p>{tag}</p>
            {hasDelete && (
              <button
                type="button"
                className=" rounded-md transition-colors ease-in hover:text-primary/40"
                onClick={() => handleDelete(tag)}
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
