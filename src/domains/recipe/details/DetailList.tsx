'use client';
import { useEffect, useState } from 'react';
import DetailRecommendList from './DetailRecommendList';
import { getApi } from '@/app/api/config/appConfig';
import { useParams } from 'next/navigation';
import { RecommendCocktail } from '../types/types';
import Link from 'next/link';

function DetailList() {
  const { id } = useParams();
  const url = new URL(`${getApi}/cocktails/recommend/related`);
  url.searchParams.set('cocktailId', String(id));

  const [recommendItem, setRecommendItem] = useState<RecommendCocktail[]>([]);

  const recommentFetch = async () => {
    const res = await fetch(url.toString());
    const json = await res.json();
    if (!res.ok) throw new Error('데이터 요청 실패');

    setRecommendItem(json.data);
  };
  useEffect(() => {
    recommentFetch();
  }, []);

  return (
    <ul className="grid place-content-between [grid-template-columns:repeat(3,minmax(0,250px))]  gap-4 ">
      {recommendItem.map(({ cocktailImgUrl, cocktailName, cocktailNameKo, id }) => (
        <li key={id}>
          <Link href={`/recipe/${String(id)}`}>
            <DetailRecommendList src={cocktailImgUrl} name={cocktailName} nameKo={cocktailNameKo} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default DetailList;
