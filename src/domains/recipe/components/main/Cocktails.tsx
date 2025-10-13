'use client';

import { useEffect, useState } from 'react';
import CocktailFilter from './CocktailFilter';
import CocktailList from './CocktailList';
import { Cocktail } from '../../types/types';
import Accordion from './Accordion';
import { RecipeFetch } from '../../api/RecipeFetch';
import CocktailSearchBar from './CocktailSearchBar';
import useSearchControl from '../../hook/useSearchControl';
import CocktailSearch from '../../api/CocktailSearch';

function Cocktails() {
  const [data, setData] = useState<Cocktail[]>([]);
  const [lastId, setLastId] = useState<number | null>(null);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { inputValue, keyword, isSearching, onInputChange, noResults, setNoResults } =
    useSearchControl({ delay: 300, storageKey: 'cocktails_scoll_state' });
  const { fetchData } = RecipeFetch({ setData, lastId, setLastId, hasNextPage, setHasNextPage });

  const {
    searchApi,
    setAlcoholBaseTypes,
    setAlcoholStrengths,
    setCocktailTypes,
    alcoholBaseTypes,
    cocktailTypes,
    alcoholStrengths,
  } = CocktailSearch({
    setData,
    setNoResults,
  });

  const countLabel = isSearching
    ? hasNextPage
      ? `검색결과 현재 ${data.length}+`
      : `검색결과 총 ${data.length}`
    : hasNextPage
      ? `전체 ${data.length}+`
      : `전체 ${data.length}`;

  // 초기 로드 시 검색어가 있으면 검색 실행
  // useEffect(() => {
  //   const readyForFirstLoad = !isSearching && hasNextPage && lastId == null && data.length === 0;

  //   if (readyForFirstLoad) {
  //     fetchData();
  //   }
  // }, [hasNextPage, lastId]);

  // 검색어 변경 시
  useEffect(() => {
    if (isSearching && keyword.trim()) {
      setLastId(null);
      setHasNextPage(false);
      searchApi(keyword.trim());
    } else if (!isSearching) {
      // 검색어를 지웠을 때만 초기화
      setData([]);
      setLastId(null);
      setHasNextPage(true);
    }
  }, [keyword, isSearching, alcoholBaseTypes, alcoholStrengths, cocktailTypes]);

  // 일반 fetch
  useEffect(() => {
    if (isSearching) return;
    fetchData();
  }, [isSearching, alcoholBaseTypes, alcoholStrengths, cocktailTypes]);

  return (
    <section>
      <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between md:items-center ">
        <Accordion
          setAlcoholBaseTypes={setAlcoholBaseTypes}
          setAlcoholStrengths={setAlcoholStrengths}
          setCocktailTypes={setCocktailTypes}
        />
        <CocktailSearchBar value={inputValue} onChange={onInputChange} />
      </div>

      <CocktailFilter cocktailsEA={countLabel} setData={setData} />

      <section className="mt-5">
        {isSearching && noResults ? (
          <div>검색결과가 없습니다.</div>
        ) : (
          <CocktailList
            cocktails={data}
            RecipeFetch={isSearching ? undefined : fetchData}
            hasNextPage={isSearching ? false : hasNextPage}
            lastId={lastId}
          />
        )}
      </section>
    </section>
  );
}

export default Cocktails;
