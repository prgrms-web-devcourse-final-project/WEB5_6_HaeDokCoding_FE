import { navItem } from '@/shared/utills/navigation';
import LogoDark from '../../../public/logoDark.svg';
import Close from '@/shared/assets/icons/close_32.svg';
import User from '@/shared/assets/icons/user_24.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DropdownMenu({ setIsClicked }: { setIsClicked: (state: boolean) => void }) {
  const pathname = usePathname();

  return (
    <div
      className="w-full h-screen bg-secondary absolute top-0 left-0 px-[12px] font-serif block sm:hidden"
      role="menu"
      aira-label="메인 네비게이션 메뉴"
      tabIndex={-1}
      id="mobile-dropdown-menu"
    >
      <div className="flex items-center h-[36px] w-full  justify-center mt-3">
        <LogoDark width={76} height={25} />
      </div>
      <div className="my-5">
        <ul className="flex flex-col gap-[12px] text-black px-2">
          {navItem.map(({ label, href }, idx) => (
            <li className={`font-normal ${pathname === href ? '' : 'px-3 py-[12px]'}`} key={href}>
              <Link
                href={href}
                onNavigate={() => setIsClicked(false)}
                className={`items-start ${pathname === href ? 'bg-tertiary/70 inline-flex pr-5 p-2 rounded-md text-secondary' : 'hover:text-black/70 flex'}`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                <span className="text-[20px] mr-3">{idx + 1}. </span>
                <h1 className="text-[28px]">{label}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-t-[1px] border-t-gray flex py-[32px] gap-4">
        <User width={32} height={32} />
        <button type="button" className="text-black font-light text-xl hover:text-black/70">
          로그인/회원가입
        </button>
      </div>
      <div className="absolute top-4 left-5">
        <button
          type="button"
          onClick={() => {
            setIsClicked(false);
          }}
        >
          <Close stroke={'black'} />
        </button>
      </div>
    </div>
  );
}

export default DropdownMenu;
