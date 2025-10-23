import { debounce } from "@/shared/utills/debounce";
import { useMemo, useState } from "react";

export const useCocktailSearch = () =>{
    const [keyword, setKeyword] = useState('');
  const [input, setInput] = useState('');

    const debounceKeyword = useMemo(() => debounce((v: string) => setKeyword(v), 300), []);
    const handleSearch = (v: string) => {
      setInput(v);
      debounceKeyword(v);
  };
  
  return {
    keyword,
    input,
    handleSearch
  }
}