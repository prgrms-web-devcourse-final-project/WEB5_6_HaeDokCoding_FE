'use client';
import { Ref, useMemo, useRef, useState } from 'react';
import Down from '@/shared/assets/icons/selectDown_24.svg';
import { useShallow } from 'zustand/shallow';
import { ID, useAccordionStore } from '@/domains/recipe/store/accordionStore';
import useCloseOutside from '../../hook/useCloseOutside';

interface Props {
  id?: ID;
  groupKey?: string;
  ref?: Ref<HTMLButtonElement | null>;
  option: string[];
  title: string;
  onChange?: (value: string) => void;
  use?: string;
}

// groupKey를 Props로 내릴경우 == 아코디언 없는 경우 == select박스
function SelectBox({ id, groupKey, ref, option, title, onChange, use }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const ingroup = !!groupKey;
  // groupKey가 있을경우 true
  // groupkey일 경우 전달받은 ID로 식별 아닐경우 title로 식별

  const keyId = useMemo<ID>(() => id ?? title, [id, title]);
  // id가 없을경우 title로 키 아이디를 받음

  const { openId, toggleGroup, closeGroup } = useAccordionStore(
    useShallow((s) => ({
      openId: ingroup ? (s.openByGroup[groupKey] ?? null) : null,
      // 그룹키가 없으면 openId == null 따라서 state로 관리됨
      toggleGroup: s.toggle,
      closeGroup: s.closeGroup,
    }))
  );

  //groupkey가 있을 떄와 없을때로 구분해서 state혹은 store로 관리
  const localOpen = ingroup ? openId === keyId : isOpen;

  // 그룹일 경우 filter와 id abv | base | glass 를
  const toggle = () => {
    if (ingroup) toggleGroup(groupKey, keyId);
    else
      setIsOpen((prev) => {
        const next = !prev;
        console.log('TOGGLE BTN CLICK:', { prev, next });
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

  useCloseOutside({
    menuRef,
    onClose: close,
  });

  return (
    <div className="flex flex-col gap-2 relative h-6" ref={menuRef} id="select">
      <button
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        {select ? select : title}
        {localOpen ? (
          <Down className="rotate-180 duration-300" />
        ) : (
          <Down className="rotate-0 duration-300" />
        )}
      </button>

      <ul
        className={`w-30 text-gray-dark p-2 rounded-xl z-99 duration-200  absolute transition-all 
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
