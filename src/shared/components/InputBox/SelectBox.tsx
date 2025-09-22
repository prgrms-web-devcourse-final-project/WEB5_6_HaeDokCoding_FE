import { Ref } from "react";

interface Props{
  id: string
  ref?: Ref<HTMLSelectElement | null>
}

function SelectBox({id,ref}:Props) {
  return (
    <>
      <label htmlFor={id}>selectBox</label>

      <select id={id} ref={ref}></select>
    </>
  );
}
export default SelectBox