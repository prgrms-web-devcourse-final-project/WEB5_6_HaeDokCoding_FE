import Image from 'next/image';
import Ssury from '@/shared/assets/ssury/ssury_shaker.webp';
import clsx from 'clsx';
import MainSlideDummyCard from './MainSlideDummyCard';
type Dummy = {
  id: number,
  message: string,
  active:boolean
}

interface Props{
  message?: React.ReactNode
  option?: Dummy[]
  type:'text'|'option'
}

const DUMMY_CARD = [
  {
    id: 1,
    src: 'https://www.thecocktaildb.com/images/media/drink/fwpd0v1614006733.jpg',
    cocktailName: '윈터 리타',
  },
  {
    id: 2,
    src: 'https://www.thecocktaildb.com/images/media/drink/lnjoc81619696191.jpg',
    cocktailName: '핑크 문',
  },
  {
    id: 3,
    src: 'https://www.thecocktaildb.com/images/media/drink/pbw4e51606766578.jpg',
    cocktailName: '피기 타임',
  },
];

function MainTestDummy({ message, option, type}:Props) {
  return (
    <li className="flex flex-col justify-end gap-2">
      <header className="flex items-end">
        <div className="relative ">
          <Image
            src={Ssury}
            alt="쑤리아바타"
            width={40}
            height={40}
            className="object-cover w-10 h-10 "
          />
        </div>
        <p className="tesx-xs">쑤리</p>
      </header>
      {message && (
        <div className="flex flex-col w-fit  min-w-[120px] p-3 rounded-2xl rounded-tl-none bg-white text-black gap-2">
          <p className="text-xs">{message}</p>

          <div className="flex flex-col gap-2">
            {type == 'option' &&
              option &&
              option.map(({ id, message, active }) => (
                <span
                  key={id}
                  className={clsx(
                    'w-full rounded-3xl px-2 py-1 text-center',
                    active ? 'bg-secondary' : 'bg-gray-light'
                  )}
                >
                  <span className="text-xs">{message}</span>
                </span>
              ))}
          </div>
        </div>
      )}
      {type == 'text' && (
        <div className="flex flex-col sm:flex-row gap-2">
          {DUMMY_CARD.map(({ id, src, cocktailName }) => (
            <MainSlideDummyCard key={id} id={id} src={src} cocktailName={cocktailName} />
          ))}
        </div>
      )}
    </li>
  );
}
export default MainTestDummy;
