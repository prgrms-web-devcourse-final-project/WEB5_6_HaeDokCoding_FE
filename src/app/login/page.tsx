import Image from 'next/image';
import type { Metadata } from 'next';
import loginBg from '@/shared/assets/images/login_bg.webp';
import SocialLogin from './SocialLogin';

export const metadata: Metadata = {
  title: 'SSOUL | 로그인',
  description: '칵테일을 좋아하는 사람들을 위한 서비스 로그인 페이지',
};

function Page() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-4 min-h-screen">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[75rem] h-full -z-10"
        aria-hidden
      >
        <Image src={loginBg} alt="" fill className="object-cover md:object-contain object-bottom" />
      </div>

      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-bold">로그인</h1>
        <p>3초 로그인으로 SSOUL을 가볍게 즐겨보세요🍸</p>
      </div>

      <SocialLogin />
    </div>
  );
}
export default Page;
