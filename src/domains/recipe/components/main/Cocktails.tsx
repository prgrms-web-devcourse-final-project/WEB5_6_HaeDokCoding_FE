'use client';

import { useEffect, useMemo, useState } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import Accordion from './Accordion';
import CocktailSearchBar from './CocktailSearchBar';
import { useCocktails} from '../../api/fetchRecipe';
import { useInView } from 'react-intersection-observer';
import { debounce } from '@/shared/utills/debounce';


function Cocktails() {
const [keyword,setKeyword] = useState('')
const [input, setInput] = useState('');

const [alcoholStrengths,setAlcoholStrengths] = useState<string[]>([])
const [alcoholBaseTypes,setAlcoholBaseTypes] = useState<string[]>([])
const [cocktailTypes,setCocktailTypes] = useState<string[]>([])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    noResults,
    isSearchMode
  } = useCocktails({
    keyword,
    alcoholBaseTypes,
    alcoholStrengths,
    cocktailTypes,
  }, 20)

  const { ref, inView } = useInView({
    threshold:0.1
  })

  useEffect(() => {
    if (!isSearchMode && inView && hasNextPage) {
    fetchNextPage?.()
  }
  },[inView,hasNextPage,fetchNextPage])

const debounceKeyword = useMemo(()=> debounce((v:string)=> setKeyword(v),300),[])
  const handleSearch = (v: string) => {
    setInput(v)
    debounceKeyword(v)
}

  return (
    <section>
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
        <Accordion
          setAlcoholBaseTypes={setAlcoholBaseTypes}
          setAlcoholStrengths={setAlcoholStrengths}
          setCocktailTypes={setCocktailTypes}
        />
        <CocktailSearchBar keyword={input} onChange={handleSearch} />
      </div>

      <CocktailFilter cocktailsEA={data.length} />
    
      <section className="mt-5">
          <CocktailList cocktails={data}/>
      </section>
      <div ref={ref}></div>
    </section>
  );
}

export default Cocktails;
