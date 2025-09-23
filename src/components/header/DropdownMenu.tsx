import { navItem } from '@/shared/utills/navigation';
import LogoDark from '../../../public/logoDark.svg';
import Close from '@/shared/assets/icons/close_32.svg';
import User from '@/shared/assets/icons/user_24.svg';
import Link from 'next/link';

function DropdownMenu({ setIsClicked }: { setIsClicked: (state: boolean) => void }) {
  return (
    <div className="w-full h-screen bg-secondary absolute top-0 left-0 px-[12px] font-serif block sm:hidden">
      <div className="flex items-center h-[36px] w-full  justify-between mt-3">
        <button
          type="button"
          onClick={() => {
            setIsClicked(false);
          }}
        >
          <Close stroke={'black'} />
        </button>
        <LogoDark width={76} height={25} />
        <div className="w-10 h-full"></div>
      </div>
      <div className="my-5">
        <ul className="flex flex-col gap-[12px] text-black px-2">
          {navItem.map(({ label, href }, idx) => (
            <Link href={href} key={label} onNavigate={() => setIsClicked(false)}>
              <li className="px-3 py-[12px] flex font-normal hover:text-black/70">
                <span className="text-[20px] mr-3">{idx + 1}. </span>
                <h1 className="text-[28px]">{label}</h1>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="border border-t-[1px] border-t-gray flex py-[32px] gap-4">
        <User width={32} height={32} />
        <button type="button" className="text-black font-light text-xl hover:text-black/70">
          로그인/회원가입
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
