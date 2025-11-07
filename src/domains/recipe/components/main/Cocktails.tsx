'use client';

import { useEffect, useRef } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import CocktailSearchBar from './CocktailSearchBar';
import { useCocktails } from '../../api/fetchRecipe';
import { useInView } from 'react-intersection-observer';
import CocktailFilterRadios from './CocktailFilterRadios';
import { useCocktailFilter } from '../../hook/useCocktailFilter';
import { useCocktailSearch } from '../../hook/useCocktailSearch';

function Cocktails() {
  const { keyword, input, handleSearch } = useCocktailSearch();
  const {
    alcoholBaseTypes,
    alcoholStrengths,
    cocktailTypes,
    sortBy,
    setAlcoholBaseTypes,
    setAlcoholStrengths,
    setCocktailTypes,
  } = useCocktailFilter();
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

  const prevInView = useRef(inView);

  useEffect(() => {
    if (!isSearchMode && inView && hasNextPage && !prevInView.current) {
      fetchNextPage?.();
    }
    prevInView.current = inView;
  }, [inView, hasNextPage]);

  return (
    <section>
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
        <CocktailFilterRadios
          setAlcoholBaseTypes={setAlcoholBaseTypes}
          setCocktailTypes={setCocktailTypes}
          setAlcoholStrengths={setAlcoholStrengths}
        />
        <CocktailSearchBar keyword={input} onChange={handleSearch} />
      </div>

      <CocktailFilter cocktailsEA={data.length} />

      <section className="mt-5">
        {noResults ? <div>검색 결과가 없습니다.</div> : <CocktailList cocktails={data} />}
      </section>
      <div ref={ref} className="h-4"></div>
    </section>
  );
}

export default Cocktails;
