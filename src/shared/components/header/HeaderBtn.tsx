'use client';

import Bell from '@/shared/assets/icons/bell_24.svg';
import User from '@/shared/assets/icons/user_24.svg';
import { useRouter } from 'next/navigation';
import tw from '@/shared/utills/tw';
import { useAuthStore } from '@/domains/shared/store/auth';
import { setPreLoginPath } from '@/domains/shared/auth/utils/setPreLoginPath';
import {  useEffect, useState } from 'react';
import LogoutConfirm from '@/domains/login/components/LogoutConfirm';
import { getApi } from '@/app/api/config/appConfig';


function HeaderBtn({ pathname }: { pathname: string }) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [hasNewNotification,setHasNotification] = useState(false)

 useEffect(() => {
   if (!isLoggedIn) return;

   console.log('🔌 SSE 연결 시작...');
   const eventSource = new EventSource(`${getApi}/me/subscribe`, { withCredentials: true });

   eventSource.onopen = () => {
     console.log('✅ SSE 연결 성공!');
   };

   eventSource.onmessage = (event) => {
     console.log('📢 새 알림 도착:', event.data);
     setHasNotification(true);
   };

   eventSource.onerror = (error) => {
     console.error('❌ SSE 에러:', error);
     console.log('연결 상태:', eventSource.readyState); // 0: CONNECTING, 1: OPEN, 2: CLOSED
     eventSource.close();
   };

   return () => {
     console.log('🔌 SSE 연결 종료');
     eventSource.close();
   };
 }, [isLoggedIn]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🧪 테스트 알림 발생');
      setHasNotification(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const navButtons = [
    {
      icon: Bell,
      label: '알림',
      className: pathname === '/mypage/my-alarm' ? 'text-tertiary' : 'text-current',
      hiddenMobile: true,
      onClick: () => {
        setHasNotification(false)
        router.push('/mypage/my-alarm')
      },
      showBadge:true
    },
    {
      icon: User,
      label: '마이 페이지',
      className: pathname === '/mypage' ? 'text-tertiary' : 'text-current',
      hiddenMobile: true,
      onClick: () => router.push('/mypage'),
      showBadge:false
    },
  
  ];

  const authButton = isLoggedIn
    ? {
        label: 'Logout',
        onClick: () => setLogoutModalOpen(true),
      }
    : {
        label: 'Login',
        className: pathname === '/login' ? 'bg-white text-primary' : 'bg-transparent text-white',
        onClick: async () => {
          await setPreLoginPath(window.location.pathname);
          router.push('/login');
        },
      };
  return (
    <>
      <div className="flex gap-2 items-center">
        {/* 아이콘 버튼들 */}
        <div className="flex gap-2">
          {isLoggedIn &&
            navButtons.map(({ icon: Icon, label, onClick, className, hiddenMobile, showBadge }) => (
              <button
                key={label}
                aria-label={label}
                onClick={onClick}
                className={tw(
                  className,
                  hiddenMobile ? 'hidden sm:flex' : '',
                  'relative items-center justify-center rounded-full w-7 h-7 hover:bg-secondary/10 transition-colors duration-200'
                )}
              >
                <Icon width={24} height={24} className="text-current" />
                {showBadge && hasNewNotification && (
                  <span
                    className=" absolute items-center justify-center top-1 right-1 w-2 h-2 bg-red-500
                    rounded-full"
                  ></span>
                )}
              </button>
            ))}
        </div>

        {/* 로그인/로그아웃 버튼 */}
        <button
          onClick={authButton.onClick}
          className={tw(
            'text-base font-serif border-1 px-2 py-1/2 rounded-xl border-white bg-primary  hover:bg-white/50 hover:text-primary transition-colors duration-200',
            authButton.className
          )}
        >
          {authButton.label}
        </button>
      </div>

      {/* 로그아웃 확인 모달 */}
      {logoutModalOpen && (
        <LogoutConfirm open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
      )}
    </>
  );
}

export default HeaderBtn;
