import Image from 'next/image';

import tw from '@/shared/utills/tw';

import Label from '../label/Label';
import Keep from '../keep/Keep';
import { labelTitle } from '@/domains/recipe/utills/labelTitle';

interface Props {
  id?: number;
  src: string;
  name: string;
  nameKo?: string;
  keep?: boolean;
  alcohol?: string;
  title?: string;
  className?: string;
  textSize1?: string;
  textSize2?: string;
  favor?:boolean
}

function CocktailCard({
  src,
  name,
  nameKo,
  keep = true,
  className,
  textSize1,
  textSize2,
  alcohol,
  id,
  favor
}: Props) {
  const alcoholTitle = labelTitle(alcohol);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={tw(
          `${!className && 'w-full max-w-[15.625rem] h-75'} rounded-xl overflow-hidden relative`,
          className
        )}
      >
        <Image src={src} alt={name} fill className="object-cover" sizes="320px" priority />
        {keep && (
          <div className="flex w-full pl-4 px-3 py-2 items-center justify-between absolute left-0 top-0">
            <div>{alcoholTitle && <Label title={alcoholTitle} />}</div>
            {id && <Keep cocktailId={id} favor={favor} />}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 font-bold font-serif">
        <h3 className={tw(`${!textSize1 && 'text-2xl'}`, textSize1)}>{name}</h3>
        <p className={tw(`${!textSize2 && 'text-base'}`, textSize2)}>{nameKo}</p>
      </div>
    </div>
  );
}
export default CocktailCard;
