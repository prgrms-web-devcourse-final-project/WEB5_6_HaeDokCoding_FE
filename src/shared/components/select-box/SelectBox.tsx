'use client';
import { Ref, useEffect, useMemo, useRef, useState } from 'react';
import Down from '@/shared/assets/icons/selectDown_24.svg';
import { useShallow } from 'zustand/shallow';
import { ID, useAccordionStore } from '@/domains/recipe/store/accordionStore';
import useCloseOutside from '@/shared/hook/useCloseOutside';

interface Props {
  id?: ID;
  groupKey?: string;
  ref?: Ref<HTMLButtonElement | null>;
  option: string[];
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  use?: string;
}

function SelectBox({ id, groupKey, ref, option, title, value, onChange, use }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(value || '');
  const menuRef = useRef<HTMLDivElement>(null);

  const ingroup = !!groupKey;

  const keyId = useMemo<ID>(() => id ?? title, [id, title]);

  // value prop이 변경되면 select state도 업데이트
  useEffect(() => {
    if (value !== undefined) {
      setSelect(value);
    }
  }, [value]);

  useCloseOutside({
    menuRef,
    onClose: () => {
      if (!ingroup) setIsOpen(false);
      else closeGroup(groupKey);
    },
  });

  const { openId, toggleGroup, closeGroup } = useAccordionStore(
    useShallow((s) => ({
      openId: ingroup ? (s.openByGroup[groupKey] ?? null) : null,
      toggleGroup: s.toggle,
      closeGroup: s.closeGroup,
    }))
  );

  const localOpen = ingroup ? openId === keyId : isOpen;

  const toggle = () => {
    if (ingroup) toggleGroup(groupKey, keyId);
    else
      setIsOpen((prev) => {
        const next = !prev;
        return next;
      });
  };

  const close = () => {
    if (ingroup) closeGroup(groupKey);
    else setIsOpen(false);
  };

  const handleChoose = (v: string) => {
    const value = v || title;
    setSelect(value);
    onChange?.(value);
    close();
  };

  return (
    <div className="flex flex-col gap-2 relative h-6" ref={menuRef}>
      <button
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={toggle}
        aria-expanded={isOpen}
        type="button"
      >
        {select ? select : title}
        {localOpen ? (
          <Down className="rotate-180 duration-300" />
        ) : (
          <Down className="rotate-0 duration-300" />
        )}
      </button>

      <ul
        className={`w-fit min-w-30 text-gray-dark p-2 rounded-xl z-99 duration-200  absolute transition-all 
         ${
           groupKey
             ? localOpen
               ? 'opacity-100 top-8 left-0'
               : 'opacity-0 pointer-events-none top-4 left-0'
             : localOpen
               ? 'opacity-100 top-8 right-0'
               : 'opacity-0 pointer-events-none top-4 right-0'
         } ${use === 'write' ? 'bg-gray-light' : 'bg-white'}`}
        role="listbox"
      >
        {option.map((v, i) => (
          <li
            key={v + i}
            role="option"
            className="cursor-pointer whitespace-nowrap p-1 hover:bg-secondary aria-selected:bg-secondary"
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
