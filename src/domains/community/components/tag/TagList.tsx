import CloseIcon from '@/shared/assets/icons/close_20.svg';

function TagList({ hasDelete }: { hasDelete?: boolean }) {
  return (
    <ul className="flex text-sm gap-2 items-center text-primary font-light">
      <li
        className={`bg-[#FFE4E6] pl-2 pr-1 py-[1px] rounded-md flex gap-2 ${hasDelete && 'hover:opacity-90'}`}
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
      <li
        className={`bg-[#FFE4E6] pl-2 pr-1 py-[1px] rounded-md flex gap-2 ${hasDelete && 'hover:opacity-90'}`}
      >
        <p>미도리 샤워</p>
        {hasDelete && (
          <button
            type="button"
            className=" rounded-md transition-colors ease-in hover:text-primary/40"
          >
            <CloseIcon />
          </button>
        )}
      </li>
    </ul>
  );
}

export default TagList;
