import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Img from '@/shared/assets/images/exampleCocktail.png';
import Keep from '@/shared/components/keep/Keep';

interface Props {
  src?: StaticImageData;
  name?: string;
  nameKo?: string;
}

function CocktailCard({ src, name, nameKo }: Props) {
  return (
    <li className="flex flex-col gap-4">
      <div className="w-80 h-75 rounded-xl overflow-hidden md:w-62.5  relative">
        {/* <Image src={src} alt={name} fill /> */}
        <Image src={Img} alt="" fill className="object-cover " />
        <div className="flex justify-between absolute left-0 top-0">
          <Keep />
        </div>
      </div>
      <div className="flex flex-col gap-1 font-bold font-serif">
        <h3 className="text-2xl">Old Fassioned</h3>
        <p className="text-base">올드 패션드</p>
      </div>
    </li>
  );
}
export default CocktailCard;
