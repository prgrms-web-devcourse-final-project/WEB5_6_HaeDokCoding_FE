import { StaticImageData } from "next/image"
import Image from 'next/image'

interface Props{
  src?: StaticImageData,
  name?: string,
  nameKo?:string
}

function CocktailCard({ src, name,nameKo }:Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-62.5 h-75 rounded-xl">
        <div className="bg-[#ccc] w-100% h-100%"></div>
        {/* <Image src={src} alt={name} fill /> */}
      </div>
      <div className="flex flex-col">
        <h3>{name}</h3>
        <p>{nameKo}</p>
      </div>
    </div>
  );
}
export default CocktailCard