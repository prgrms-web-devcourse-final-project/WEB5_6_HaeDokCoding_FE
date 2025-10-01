import Image from 'next/image';
import Label from '../shared/components/label/Label';
import Keep from '../shared/components/keep/Keep';
import tw from '@/shared/utills/tw';

interface Props {
  src: string;
  name: string;
  nameKo?: string;
  keep?: boolean;
  alcohol?: string;
  title?: string;
  className?: string;
  textSize1?: string;
  textSize2?: string;
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
}: Props) {
  const alcoholTitle = alcohol?.replace(/\(\d+(~\d+)?%\~?\)/g, '').trim();

  console.log(alcoholTitle);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={tw(
          `${!className && 'w-80 h-75 md:w-62.5 '}  rounded-xl overflow-hidden relative`,
          className
        )}
      >
        <Image src={src} alt={name} fill className="object-cover" sizes="250px" />
        {keep && (
          <div className="flex w-full pl-4 px-3 py-2 items-center justify-between absolute left-0 top-0">
            <div>{alcoholTitle && <Label title={alcoholTitle} />}</div>
            <Keep />
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
