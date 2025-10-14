import Image, { StaticImageData } from 'next/image';

interface Props {
  src: StaticImageData;
  abv: number;
}
function MainSsuryDrunk({ src, abv }: Props) {
  const className = (abv: number) => {
    switch (abv) {
      case 5:
        return 'text-stone-100';
      case 11:
        return 'text-rose-100';
      case 26:
        return 'text-rose-50';
      case 46:
        return 'text-rose-200';
      case 66:
        return 'text-rose-300';
      case 86:
        return 'text-red-600';
    }
  };
  return (
    <div className="flex flex-col items-center gap-1">
      <p className={`text-lg sm:text-3xl font-bold ${className(abv)}`}>
        {abv}
        {abv !== 86 ? (
          <span className="text-xs text-primary">%</span>
        ) : (
          <span className="text-xs text-primary">%~</span>
        )}
      </p>
      <Image src={src} alt="" width={60} height={60} className="object-contain"/>
    </div>
  );
}
export default MainSsuryDrunk;
