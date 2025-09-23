import Bell from '@/shared/assets/icons/bell_24.svg';
import User from '@/shared/assets/icons/user_24.svg';
import SignOut from '@/shared/assets/icons/signout_24.svg';
import { useRouter } from 'next/navigation';
import tw from '@/shared/utills/tw';

type RouterType = ReturnType<typeof useRouter>;

function HeaderBtn({ pathname }: { pathname: string }) {
  const router = useRouter();

  const headerBtn = [
    {
      icon: Bell,
      label: '알림',
      onClick: () => {
        //   console.log('알림 클릭');
      },
    },
    {
      icon: User,
      label: '마이 페이지',
      className: `fill-white w-[27px] h-[27px] ${pathname === '/mypage' ? 'fill-tertiary hover:fill-tertiary' : ''}`,
      onClick: (router: RouterType) => {
        //   console.log('유저 클릭');
        router.push('/mypage');
      },
    },
    {
      icon: SignOut,
      label: '로그아웃',
      className: 'sm:block hidden',
      onClick: () => {
        //   console.log('로그아웃 클릭');
      },
    },
  ];

  return (
    <div className="flex gap-[12px]">
      {headerBtn.map(({ icon: Icon, label, onClick, className }) => (
        <button
          key={label}
          className={tw(
            'cursor-pointer fill-white hover:fill-white/80 transition-colors duration-200',
            className
          )}
          aria-label={label}
          onClick={() => onClick(router)}
        >
          <Icon />
        </button>
      ))}
    </div>
  );
}

export default HeaderBtn;
