'use client';

import KeepIcon from '@/shared/assets/icons/keep_36.svg';
import KeepIconActive from '@/shared/assets/icons/keep_active_36.svg';
import { useState } from 'react';
import { deleteKeep, postKeep } from '../../api/keep/keep';
import { useToast } from '@/shared/hook/useToast';
import { useAuthStore } from '../../store/auth';

interface Props {
  className?: string;
  cocktailId?: number;
  favor?: boolean;
}
// ID는 커뮤니티 공유할때 id 타입보고 옵셔널 체크 풀어주세요!
// 만약 타입 안맞는다면 그냥 두셔도 됩니다.

function Keep({ className, cocktailId, favor }: Props) {
  const user = useAuthStore()
  const {toastInfo, toastSuccess } = useToast();
  const [isClick, setIsClick] = useState(favor);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toastInfo('로그인 후 이용 가능합니다.')
      return
    }

    setIsClick(!isClick);
    try {
      if (!cocktailId) return;
      if (!isClick) {
        await postKeep(cocktailId);
        toastSuccess('저장에 성공하셨습니다.');
      } else {
        await deleteKeep(cocktailId);
        toastSuccess('저장을 취소하셨습니다.');
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
