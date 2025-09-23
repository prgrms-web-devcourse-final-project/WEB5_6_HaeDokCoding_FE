'use client';
import Naver from '@/shared/assets/icons/naver.svg';
import Kakao from '@/shared/assets/icons/kakao.svg';
import Google from '@/shared/assets/icons/google.svg';
import tw from '@/shared/utills/tw';

// TODO: 백엔드 연동 로직 구현 필요
function SocialLoginButtons() {
  const socialButtons = [
    {
      id: 'naver',
      label: 'Naver 로그인',
      icon: <Naver />,
      style: 'bg-[#00C73C]',
    },
    {
      id: 'kakao',
      label: 'Kakao 로그인',
      icon: <Kakao />,
      style: 'bg-[#FEE500] text-primary',
    },
    {
      id: 'google',
      label: 'Google 로그인',
      icon: <Google />,
      style: 'bg-[#EBEBEB] text-primary',
    },
  ];

  return (
    <div className="flex flex-col gap-5 mt-12 px-3 w-full max-w-[23.75rem]">
      {socialButtons.map(({ id, label, icon, style }) => (
        <button
          key={id}
          type="button"
          onClick={() => console.log(id)}
          className={tw('flex-center gap-2 px-5 py-1 w-full rounded-lg', style)}
        >
          {icon}
          <span className="text-xl">{label}</span>
        </button>
      ))}
    </div>
  );
}
export default SocialLoginButtons;
