import { getApi } from '@/app/api/config/appConfig';
import { Cocktail } from '../types/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setData: Dispatch<SetStateAction<Cocktail[]>>;
  setNoResults: Dispatch<React.SetStateAction<boolean>>;
}

function CocktailSearch({ setData, setNoResults }: Props) {
  const searchApi = async (v: string) => {
    const keyword = v.trim();
    if (!keyword) {
      setData([]);
      return;
    }

    const res = await fetch(`${getApi}/cocktails/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });
    const json = await res.json();
    setData(json.data);
    setNoResults(json.data.length === 0);
  };

  return { searchApi };
}
export default CocktailSearch;
