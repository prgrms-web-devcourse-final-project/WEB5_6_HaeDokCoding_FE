'use client';

import Naver from '@/shared/assets/icons/naver.svg';
import Kakao from '@/shared/assets/icons/kakao.svg';
import Google from '@/shared/assets/icons/google.svg';
import tw from '@/shared/utills/tw';
import Welcome from './Welcome';
import { useState } from 'react';
import { useAuthStore } from '@/shared/@store/auth';

function SocialLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();

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

  // TODO: 백엔드 연동 로직 구현 필요
  const handleLogin = (id: string) => {
    const preLoginPath = sessionStorage.getItem('preLoginPath');
    console.log('경로, id', preLoginPath, id);

    // useAuthStore.getState().loginWithProvider(id as 'naver' | 'kakao' | 'google');
  };

  return (
    <>
      <div className="flex flex-col gap-5 mt-12 px-3 w-full max-w-[23.75rem]">
        {socialButtons.map(({ id, label, icon, style }) => (
          <button
            key={id}
            type="button"
            onClick={() => handleLogin(id)}
            className={tw('flex-center gap-2 px-5 py-1 w-full rounded-lg', style)}
          >
            {icon}
            <span className="text-xl">{label}</span>
          </button>
        ))}
      </div>

      {/* 웰컴 모달 (임시) */}
      <Welcome
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nickname={user?.nickname || '게스트'}
      />
    </>
  );
}
export default SocialLogin;
