'use client';

import KeepIcon from '@/shared/assets/icons/keep_36.svg';
import KeepIconActive from '@/shared/assets/icons/keep_active_36.svg';
import { useEffect, useState } from 'react';
import { deleteKeep,  postKeep } from '../../api/keep/keep';
import { getApi } from '@/app/api/config/appConfig';

interface Props {
  className?: string;
  cocktailId?: number;
}
// ID는 커뮤니티 공유할때 id 타입보고 옵셔널 체크 풀어주세요!
// 만약 타입 안맞는다면 그냥 두셔도 됩니다.

function Keep({ className, cocktailId }: Props) {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const getKeep = async () => {
      const res = await fetch(`${getApi}/me/bar`, {
        credentials:'include'
      })
      const json = await res.json()
      json.data.items.keptAt ? setIsClick(true) :  setIsClick(false)
    }
    getKeep()
  },[])

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsClick(!isClick);

    try {
      if (!cocktailId) return;
      if (!isClick) {
        await postKeep(cocktailId);
      } else {
        await deleteKeep(cocktailId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick} aria-label="킵 버튼">
      {isClick ? (
        <KeepIconActive
          fill="transparent"
          className="   
          [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.8))]
         [&_*]:duration-200
         &_g>g>path[stroke]]:stroke-black
          [&_g>path[fill='black']]:black
          hover:[&_g>g>path]:fill-secondary/60
          "
          aria-hidden
        />
      ) : (
        <KeepIcon
          fill="transparent"
          className="[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.8))] [&_*]:duration-100 hover:[&_*]:fill-secondary/60"
          aria-hidden
        />
      )}
    </button>
  );
}
export default Keep;
