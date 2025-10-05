'use client';
import { getApi } from '@/app/api/config/appConfig';
import { Cocktail } from '../types/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface Props {
  setData: Dispatch<SetStateAction<Cocktail[]>>;
  setNoResults: Dispatch<React.SetStateAction<boolean>>;
}

function CocktailSearch({ setData, setNoResults }: Props) {
  const [alcoholStrengths, setAlcoholStrengths] = useState<string[]>([]);
  const [cocktailTypes, setCocktailTypes] = useState<string[]>([]);
  const [alcoholBaseTypes, setAlcoholBaseTypes] = useState<string[]>([]);

  const searchApi = async (v?: string) => {
    const keyword = v?.trim() ?? '';
    const body = {
      keyword,
      alcoholStrengths,
      cocktailTypes,
      alcoholBaseTypes,
      page: 0,
      size: 100,
    };

    if (!keyword && !alcoholStrengths.length && !cocktailTypes.length && !alcoholBaseTypes.length) {
      setData([]);
      setNoResults(false);
      return null;
    }

    const res = await fetch(`${getApi}/cocktails/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();

    setData(json.data);
    setNoResults(json.data.length === 0);
  };

  useEffect(() => {
    searchApi();
  }, [alcoholStrengths, cocktailTypes, alcoholBaseTypes]);

  return {
    searchApi,
    setAlcoholBaseTypes,
    setAlcoholStrengths,
    setCocktailTypes,
    alcoholBaseTypes,
    alcoholStrengths,
    cocktailTypes,
  };
}
export default CocktailSearch;
