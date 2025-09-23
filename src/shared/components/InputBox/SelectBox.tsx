import { Ref, useState } from 'react';
import Down from '@/shared/assets/icons/selectDown_24.svg';

interface Props {
  id: string;
  ref?: Ref<HTMLLabelElement | null>;
  option: string[];
  title: string;
}

function SelectBox({ id, ref, option, title }: Props) {
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
      <label
        htmlFor={id}
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
        {select ? select : title}
        <Down />
      </label> 
      {/* 버튼으로 바뀌어서 아리d아 익스펜디드 */}
      {isOpen && (
        <ul className="w-30 bg-white text-gray-dark p-2 rounded-xl absolute top-8">
          {option.map((v, i) => (
            <li
              key={v + i}
              className="cursor-pointer p-1 hover:bg-secondary"
              onClick={() => handleChoose(v)}
            >
              {v || title}
            </li>
          ))}
        </ul> 

        // 아리아 셀렉티드 눌러서 스크린에서 인지할수있게 role ul role:리스트박스 li: option  아리아 셀렉티드
      )}
    </div>
  );
}
export default SelectBox;
