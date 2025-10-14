import Input from '@/shared/components/Input-box/Input';
import { debounce } from '@/shared/utills/debounce';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
}

function CocktailSearchBar({ keyword, setKeyword }: Props) {
  const[input,setInput] = useState('')
  const debounceKeyword = useMemo(() => debounce((v: string) => { setKeyword(v)},300),[setKeyword])

  useEffect(() => {
    debounceKeyword(keyword)
  }, [keyword, debounceKeyword])
  
  return (
    <Input
      placeholder="내용을 입력해 주세요."
      id="search"
      value={input}
      onChange={(e) => {
        setKeyword(e.target.value) 
        setInput(e.target.value)
      }}
      variant="search"
      className="w-full md:max-w-80"
    />
  );
}
export default CocktailSearchBar;
