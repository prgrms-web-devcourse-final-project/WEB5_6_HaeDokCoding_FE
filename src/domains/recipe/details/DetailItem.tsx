import Image from 'next/image';
import Short from '@/shared/assets/icons/short_36.svg';
import Label from '@/domains/shared/components/label/Label';
import AbvGraph from '@/domains/shared/components/abv-graph/AbvGraph';
import { labelTitle } from '../utill/labelTitle';

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

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-full gap-3 relative md:flex-row md:justify-between md:w-150 md:gap-20 lg:mr-15 lg:w-187.5 h-50">
        <div className="flex flex-col gap-1 items-center md:items-end md:w-1/2">
          <span>{alcoholTitle && <Label title={alcoholTitle} />}</span>
          <h2 className="w-fit font-serif font-bold  text-right text-3xl lg:text-4xl text-secondary ">
            {name}
          </h2>
          <h2 className="font-serif font-bold text-right text-xl lg:text-4xl text-secondary">
            {nameKo}
          </h2>
        </div>

        <p className=" text-base self-center w-3/4 md:text-sm md:self-end text-secondary md:w-70 lg:text-base lg:w-80">
          {story}
        </p>

        <span className="absolute w-0.5 h-11 -bottom-37 md:-bottom-3 left-1/2 -translate-x-1/2 z-2 bg-secondary md:bg-transparent"></span>
        <span className="absolute w-3 h-3 rounded-full -bottom-38 z-2 left-1/2 -translate-x-1/2 bg-secondary md:bg-transparent"></span>
      </div>

      <div
        className="rounded-2xl overflow-hidden mt-32 md:mt-4 lg::mt-7
           [filter:drop-shadow(0_0_20px_rgba(255,255,255,0.3))]
          "
      >
        <Image src={src} alt={`${nameKo}사진`} width="300" height="375" />
      </div>

      <dl className="flex flex-col mt-5 gap-3 w-75">
        <div className="flex gap-3 items-center">
          <dt className="flex gap-2">
            <p className="text-base text-nowrap">도수</p>
            <span>|</span>
          </dt>
          <dd className="flex gap-3 items-center">
            <p className="text-xs">{abv}</p>
            <AbvGraph />
          </dd>
        </div>
        <div className="flex items-center gap-3">
          <dt className="flex gap-2 items-center">
            <p>글래스 타입</p>
            <span>|</span>
          </dt>
          <dd className="flex items-center gap-2">
            <Short />
            <p>{glassType} 드링크</p>
          </dd>
        </div>
      </dl>
    </div>
  );
}
export default DetailItem;
