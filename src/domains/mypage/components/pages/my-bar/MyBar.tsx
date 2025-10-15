'use client';


import { abvMap } from '@/domains/mypage/utills/abvMap';
import CocktailCard from '@/domains/shared/components/cocktail-card/CocktailCard';
import TextButton from '@/shared/components/button/TextButton';
import Link from 'next/link';
import { useState } from 'react';
import DeleteAllModal from '../../DeleteAllModal';
import useFetchMyBar from '@/domains/mypage/api/fetchMyBar';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/shared/hook/useToast';

interface MyCocktail {
  cocktailId: number;
  cocktailName: string;
  cocktailNameKo: string;
  id: number;
  imageUrl: string;
  alcoholStrength: string;
}

function MyBar() {
  const { toastInfo } = useToast();
  const [isModal, setIsModal] = useState(false);
  const { fetchMyBar } = useFetchMyBar();
  const { data } = useQuery({
    queryKey: ['myBar'],
    queryFn: fetchMyBar,
    staleTime: 0,
  });

  const handleDelete = () => {
    if (data.items.length == 0) {
      toastInfo('저장한 칵테일이 없습니다.');
      return;
    }
    setIsModal(!isModal);
  };

  const items = data?.items ?? [];
  const items = data?.items ?? [];

  return (
    <div>
      <div className="flex justify-end">
        {isModal && (
          <DeleteAllModal
            open={isModal}
            onClose={() => setIsModal(!isModal)}
            setIsModal={setIsModal}
            type="myBar"
          />
        )}
        <TextButton className="my-5" onClick={handleDelete}>
          전체삭제
        </TextButton>
        {isModal && (
          <DeleteAllModal
            open={isModal}
            onClose={() => setIsModal(!isModal)}
            setIsModal={setIsModal}
            type="myBar"
          />
        )}
        <TextButton className="my-5" onClick={handleDelete}>
          전체삭제
        </TextButton>
      </div>
      {items.length > 0 ? (
      {items.length > 0 ? (
        <div
          className="
           grid gap-8 md:justify-between justify-center
           [grid-template-columns:repeat(1,minmax(0,250px))]
           sm:[grid-template-columns:repeat(2,minmax(0,250px))]
           md:[grid-template-columns:repeat(3,minmax(0,250px))]
           "
        >
          {items.map(
            ({
              cocktailId,
              cocktailName,
              imageUrl,
              cocktailNameKo,
              alcoholStrength,
            }: MyCocktail) => {
          {items.map(
            ({
              cocktailId,
              cocktailName,
              imageUrl,
              cocktailNameKo,
              alcoholStrength,
            }: MyCocktail) => {
              const alcohol = abvMap(alcoholStrength);
              return (
                <Link href={`/recipe/${cocktailId}`} key={cocktailId}>
                  <CocktailCard
                    alcohol={alcohol}
                    src={imageUrl}
                    textSize1="text-xl"
                    name={cocktailName}
                    nameKo={cocktailNameKo}
                    keep={true}
                  ></CocktailCard>
                </Link>
              );
            }
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <p>아직 저장하신 칵테일이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
export default MyBar;
