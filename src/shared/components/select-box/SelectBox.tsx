'use client';
import { Ref, useRef, useState } from 'react';
import Down from '@/shared/assets/icons/selectDown_24.svg';
import useCloseOutside from '@/shared/hook/useCloseOutside';
import clsx from 'clsx';

interface Props {
  ref?: Ref<HTMLButtonElement | null>;
  option: string[];
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  use?: string;
  align?:'left' | 'right'
}

function SelectBox({ ref, option, title, value, onChange,align}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedValue =  value == '전체' ? title: value
  useCloseOutside({
    menuRef,
    onClose: () => setIsOpen(false),
  });

  const handleChoose = (v: string) => {
    onChange?.(v)
    setIsOpen(false)
  };

  return (
    <div className="flex flex-col gap-2 relative h-6" ref={menuRef}>
      <button
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        {selectedValue}
        <Down className={`duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      <ul
        className={
          clsx(`w-fit min-w-30 text-gray-dark p-2 rounded-xl z-99 bg-white absolute right-0 transition-all duration-200`,
          align == 'left' ? 'left-0' : 'right-0' ,
          isOpen ? 'opacity-100 top-8 right-0 ' : 'opacity-0 pointer-events-none top-4'
        )}
      >
        {option.map((v,i) => (
          <li
            key={i}
            className={`cursor-pointer whitespace-nowrap p-1 hover:bg-secondary 
              ${v === value ? 'bg-secondary' : ''}`}
            onClick={() => handleChoose(v)}
          >
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SelectBox;
