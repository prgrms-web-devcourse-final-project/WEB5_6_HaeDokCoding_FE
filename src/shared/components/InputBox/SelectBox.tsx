import { Ref, useState } from "react";
import Down from '@/shared/assets/icons/selectDown_24.svg'

interface Props{
  id: string
  ref?: Ref<HTMLLabelElement | null>
  option: string[]
  title:string
}

function SelectBox({ id, ref, option,title }: Props) {
  
const [isOpen,setIsOpen] = useState(false)
const [select,setSelect] = useState('')
  return (
    <div className="flex flex-col gap-2 relative h-6">
      <label
        htmlFor={id}
        ref={ref}
        className="flex gap-2 cursor-pointer text-base"
        onClick={() => setIsOpen(!isOpen)}
      >
       {select ? select : title}<Down />
      </label>
      {isOpen && (
        <ul className="w-30 bg-white text-gray-dark p-2 rounded-xl absolute top-8">
          {option.map((v, i) => (
            <li key={v + i} className="cursor-pointer p-1 hover:bg-secondary" onClick={() => { setSelect(v), setIsOpen(!isOpen) }}>
              {v}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default SelectBox