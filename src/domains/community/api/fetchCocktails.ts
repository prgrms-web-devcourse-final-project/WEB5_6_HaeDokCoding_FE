import { getApi } from '@/app/api/config/appConfig';

export const fetchCocktails = async () => {
  try {
    const res = await fetch(`${getApi}/cocktails`);
    if (!res.ok) throw new Error('칵테일 데이터 불러오기 실패');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
