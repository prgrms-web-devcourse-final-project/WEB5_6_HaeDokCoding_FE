import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Img from '@/shared/assets/images/dummy/exampleCocktail.png';
import Label from '../shared/components/label/Label';
import Keep from '../shared/components/keep/Keep';

interface Props {
  src?: StaticImageData;
  name?: string;
  nameKo?: string;
  type?: 'default' | 'myBar';
}

function CocktailCard({ src, name, nameKo, type = 'default' }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] rounded-xl overflow-hidden max-w-80 max-h-75 lg:max-w-62.5 relative">
        {/* <Image src={src} alt={name} fill /> */}
        <Image src={Img} alt="" fill className="w-full object-cover h-auto " />
        {type == 'default' && (
          <div className="flex w-full pl-4 pr-3 py-1 justify-between items-center absolute left-0 top-0">
            <div>
              <Label title="레시피" />
            </div>
            <Keep />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 font-bold font-serif">
        <h3 className={type == 'myBar' ? 'text-xl sm:text-2xl' : 'text-2xl'}>Old Fassioned</h3>
        <p className="text-base">올드 패션드</p>
      </div>
    </div>
  );
}
export default CocktailCard;
