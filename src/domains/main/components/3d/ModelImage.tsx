import { useEffect } from 'react';
import MobileCocktailDrop from '../../../../../public/mobileCocktail.webp';
import Image from 'next/image';

interface Props {
  onLoaded: () => void;
}

function ModelImage({ onLoaded }: Props) {
  useEffect(() => {
    onLoaded();
  });
  return (
    <div className="w-full flex justify-center items-center absolute bottom-0 left-1/2 -translate-x-1/2">
      <div className="relative w-[85%] h-[60vh] rounded-tr-4xl rounded-tl-4xl overflow-hidden">
        <Image
          src={MobileCocktailDrop}
          alt="모바일 칵테일 드랍"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default ModelImage;
