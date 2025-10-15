'use client';

import { useEffect, useMemo, useState } from 'react';
import { useEffect, useMemo, useState } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import Accordion from './Accordion';
import CocktailSearchBar from './CocktailSearchBar';
import { useCocktails } from '../../api/fetchRecipe';
import { useInView } from 'react-intersection-observer';
import { debounce } from '@/shared/utills/debounce';
import { useSearchParams } from 'next/navigation';
import { Sort } from '../../types/types';
import { useCocktails } from '../../api/fetchRecipe';
import { useInView } from 'react-intersection-observer';
import { debounce } from '@/shared/utills/debounce';
import { useSearchParams } from 'next/navigation';
import { Sort } from '../../types/types';

function Cocktails() {
  const searchParams = useSearchParams();
  const sortByParam = searchParams.get('sortBy') || 'recent';
  const [keyword, setKeyword] = useState('');
  const [input, setInput] = useState('');

  const [sortBy, setSortBy] = useState<Sort>(sortByParam as Sort);
  const [alcoholStrengths, setAlcoholStrengths] = useState<string[]>([]);
  const [alcoholBaseTypes, setAlcoholBaseTypes] = useState<string[]>([]);
  const [cocktailTypes, setCocktailTypes] = useState<string[]>([]);

  const { data, fetchNextPage, hasNextPage, noResults, isSearchMode } = useCocktails(
    {
      keyword,
      alcoholBaseTypes,
      alcoholStrengths,
      cocktailTypes,
    },
    20,
    sortBy
  );

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (!isSearchMode && inView && hasNextPage) {
      fetchNextPage?.();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    setSortBy(sortByParam as Sort);
  }, [sortByParam]);

  const debounceKeyword = useMemo(() => debounce((v: string) => setKeyword(v), 300), []);
  const handleSearch = (v: string) => {
    setInput(v);
    debounceKeyword(v);
  };

  return (
    <section>
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
        <Accordion
          setAlcoholBaseTypes={setAlcoholBaseTypes}
          setAlcoholStrengths={setAlcoholStrengths}
          setCocktailTypes={setCocktailTypes}
        />
        <CocktailSearchBar keyword={input} onChange={handleSearch} />
        <CocktailSearchBar keyword={input} onChange={handleSearch} />
      </div>

      <CocktailFilter cocktailsEA={data.length} />
      <CocktailFilter cocktailsEA={data.length} />

      <section className="mt-5">
        {noResults ? <div>검색 결과가 없습니다.</div> : <CocktailList cocktails={data} />}
        {noResults ? <div>검색 결과가 없습니다.</div> : <CocktailList cocktails={data} />}
      </section>
      <div ref={ref} className="h-4"></div>
      <div ref={ref} className="h-4"></div>
    </section>
  );
}

export default Cocktails;
