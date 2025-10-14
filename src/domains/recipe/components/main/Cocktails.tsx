'use client';

import { useEffect, useState } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import Accordion from './Accordion';
import CocktailSearchBar from './CocktailSearchBar';
import { useCocktails} from '../../api/fetchRecipe';
import { useInView } from 'react-intersection-observer';


function Cocktails() {
const [keyword,setKeyword] = useState('')
const [alcoholStrengths,setAlcoholStrengths] = useState<string[]>([])
const [alcoholBaseTypes,setAlcoholBaseTypes] = useState<string[]>([])
const [cocktailTypes,setCocktailTypes] = useState<string[]>([])

  const {
    data,
    fetchNextPage,
    hasNextPage,
    noResults,
    isSearchMode,
    isFetchingNextPage
  } = useCocktails({
    keyword,
    alcoholBaseTypes,
    alcoholStrengths,
    cocktailTypes
  },20)

  const { ref, inView } = useInView({
    threshold:0.1
  })

  useEffect(() => {
    if (!isSearchMode && inView && hasNextPage) {
    fetchNextPage?.()
  }
},[inView,hasNextPage,fetchNextPage,isSearchMode])


  return (
    <section>
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
        <Accordion
          setAlcoholBaseTypes={setAlcoholBaseTypes}
          setAlcoholStrengths={setAlcoholStrengths}
          setCocktailTypes={setCocktailTypes}
        />
        <CocktailSearchBar keyword={keyword} setKeyword={setKeyword} />
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
