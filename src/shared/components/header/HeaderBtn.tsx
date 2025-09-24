import Bell from '@/shared/assets/icons/bell_24.svg';
import User from '@/shared/assets/icons/user_24.svg';
// import SignOut from '@/shared/assets/icons/sign_out_24.svg';
import SignIn from '@/shared/assets/icons/sign_in_24.svg';
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
      className: `${pathname === '/mypage' ? 'text-tertiary' : 'text-current'}`,
      onClick: (router: RouterType) => {
        //   console.log('유저 클릭');
        router.push('/mypage');
      },
    },
    {
      icon: SignIn,
      label: '로그인',
      className: `${pathname === '/login' ? 'text-tertiary' : ''}`,
      onClick: () => {
        //   console.log('로그아웃 클릭');
        router.push('/login');
      },
    },
  ];

  return (
    <div className="flex gap-3">
      {headerBtn.map(({ icon: Icon, label, onClick, className }) => (
        <button
          key={label}
          aria-label={label}
          onClick={() => onClick(router)}
          className={tw(
            'flex-center rounded-full w-7 h-7 hover:bg-secondary/30 transition-colors duration-200',
            className
          )}
        >
          <Icon width={24} height={24} className="text-current" />
        </button>
      ))}
    </div>
  );
}

export default HeaderBtn;
