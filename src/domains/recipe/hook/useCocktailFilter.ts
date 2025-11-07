import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Sort } from '../types/types';

export const useCocktailFilter = () => {
  const searchParams = useSearchParams();
  const sortByParam = searchParams.get('sortBy') || 'recent';

  const [sortBy, setSortBy] = useState<Sort>(sortByParam as Sort);
  const [alcoholStrengths, setAlcoholStrengths] = useState<string[]>([]);
  const [alcoholBaseTypes, setAlcoholBaseTypes] = useState<string[]>([]);
  const [cocktailTypes, setCocktailTypes] = useState<string[]>([]);

  useEffect(() => {
    setSortBy(sortByParam as Sort);
  }, []);

  return {
    sortBy,
    alcoholBaseTypes,
    alcoholStrengths,
    cocktailTypes,
    setAlcoholBaseTypes,
    setAlcoholStrengths,
    setCocktailTypes,
  };
};
