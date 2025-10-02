import Image from 'next/image';

interface Props{
  src: string,
  name: string,
  nameKo:string
}


function DetailRecommendList({src,name,nameKo}:Props) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="
          relative overflow-hidden rounded-2xl
          w-full max-w-62.5 aspect-[5/6]               
        "
      >
        <Image src={src} alt={`${nameKo} 사진`} fill className="object-cover" sizes="250px" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-serif  text-base truncate lg:text-lg">{name}</h4>
        <p className="font-serif text-sm sm:text-base">{nameKo}</p>
      </div>
    </div>
  );
}
export default DetailRecommendList;
