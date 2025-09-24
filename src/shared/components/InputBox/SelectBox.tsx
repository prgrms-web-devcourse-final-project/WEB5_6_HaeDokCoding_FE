import { Ref, useState } from 'react';
import Down from '@/shared/assets/icons/selectDown_24.svg';

interface Props {
  ref?: Ref<HTMLButtonElement | null>;
  option: string[];
  title: string;
}

function SelectBox({ ref, option, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState('');

  const handleChoose = (v: string) => {
    setIsOpen(!isOpen);
    if (!v) {
      setSelect(title);
    } else {
      setSelect(v);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative h-6">
      <button
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {select ? select : title}
        {isOpen ? (
          <Down className="rotate-180 duration-300" />
        ) : (
          <Down className="rotate-0 duration-300" />
        )}
      </button>

      <ul
        className={`w-30 bg-white text-gray-dark p-2 rounded-xl  duration-200  absolute transition-all 
         ${isOpen ? 'opacity-100 top-8 right-0' : 'opacity-0 pointer-events-none top-4 right-0'}`}
        role="listbox"
      >
        {option.map((v, i) => (
          <li
            key={v + i}
            role="option"
            className="cursor-pointer p-1 hover:bg-secondary aria-selected:bg-secondary"
            onClick={() => handleChoose(v)}
            aria-selected={v === select}
          >
            {v || title}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SelectBox;
