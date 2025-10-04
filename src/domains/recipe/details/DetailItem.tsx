import Image from 'next/image';
import Label from '@/domains/shared/components/label/Label';
import AbvGraph from '@/domains/shared/components/abv-graph/AbvGraph';
import { labelTitle } from '../utills/labelTitle';
import useGlass from './hook/useGlass';

interface Props {
  name: string;
  nameKo: string;
  story: string;
  abv: string;
  src: string;
  glassType: string;
}

function DetailItem({ name, nameKo, story, src, abv, glassType }: Props) {
  const alcoholTitle = labelTitle(abv);
  const abvNum = abv
    .replace(/\(([^)]*)\)/g, '$1')
    .split(' ')
    .reverse()
    .slice(0, 1)
    .toString();
  const maxAbv = abvNum
    .replace(/[~%]/g, ' ')
    .split(' ')
    .filter((str) => str.trim() !== '')
    .map(Number);

  const glassIcon = useGlass(glassType);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full gap-3 relative md:flex-row md:justify-between md:w-150 md:gap-20  lg:w-187.5 h-50">
        <div className="flex flex-col gap-1 items-center md:items-end md:w-1/2">
          <span>{alcoholTitle && <Label title={alcoholTitle} />}</span>
          <h2 className="w-fit font-serif font-bold  text-right text-3xl lg:text-4xl text-secondary ">
            {name}
          </h2>
          <h2 className="font-serif font-bold text-right text-xl lg:whitespace-nowrap lg:text-4xl text-secondary">
            {nameKo}
          </h2>
        </div>

        <p className=" text-base self-center w-3/4 md:text-sm md:self-end text-secondary md:w-70 lg:text-base lg:w-100">
          {story}
        </p>

        <span className="absolute w-0.5 h-11 -bottom-37 md:-bottom-3 left-1/2 -translate-x-1/2 z-2 bg-secondary md:bg-transparent"></span>
        <span className="absolute w-3 h-3 rounded-full -bottom-38 z-2 left-1/2 -translate-x-1/2 bg-secondary md:bg-transparent"></span>
      </div>

      <div className="rounded-2xl overflow-hidden w-75 h-93.75 mt-32 md:mt-4 lg:mt-7 [filter:drop-shadow(0_0_20px_rgba(255,255,255,0.3))] relative">
        <Image
          src={src}
          alt={`${nameKo}사진`}
          fill
          className="object-cover"
          sizes="300px"
          priority
        />
      </div>

      <dl className="flex flex-col mt-5 gap-3 w-75">
        <div className="flex gap-3 items-center">
          <dt className="flex gap-2">
            <p className="text-base text-nowrap">도수</p>
            <span>|</span>
          </dt>
          <dd className="flex gap-3 items-center">
            <p className="text-xs">{abvNum}</p>
            <AbvGraph abv={Math.max(...maxAbv)} max={40} />
          </dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="flex gap-2 items-center">
            <p>글래스 타입</p>
            <span>|</span>
          </dt>
          <dd className="flex items-center ">
            {glassIcon}
            <p>
              {glassType == '숏' || glassType == '롱'
                ? `${glassType} 드링크`
                : `${glassType} 칵테일`}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
export default DetailItem;
