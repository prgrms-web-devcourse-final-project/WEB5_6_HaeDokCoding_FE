import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Img from '@/shared/assets/images/dummy/exampleCocktail.png';
import Keep from '../shared/components/keep/Keep';
import tw from '@/shared/utills/tw';

interface Props {
  src?: StaticImageData;
  name?: string;
  nameKo?: string;
  keep?: boolean;
  className?: string;
  textSize1?: string;
  textSize2?: string;
}

function CocktailCard({ src, name, nameKo, keep = true, className, textSize1, textSize2 }: Props) {
  return (
    <li className="flex flex-col gap-4">
      <div
        className={tw(
          `${!className && 'w-80 h-75 md:w-62.5 '}  rounded-xl overflow-hidden relative`,
          className
        )}
      >
        {/* <Image src={src} alt={name} fill /> */}
        <Image src={Img} alt="" fill className="object-cover " />
        {keep && (
          <div className="flex justify-between absolute left-0 top-0">
            <Keep />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 font-bold font-serif">
        <h3 className={tw(`${!textSize1 && 'text-2xl'}`, textSize1)}>Old Fassioned</h3>
        <p className={tw(`${!textSize2 && 'text-base'}`, textSize2)}>올드 패션드</p>
      </div>
    </li>
  );
}
export default CocktailCard;
