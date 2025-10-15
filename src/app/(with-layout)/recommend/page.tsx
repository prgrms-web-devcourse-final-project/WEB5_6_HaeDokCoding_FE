'use client';

import ChatSection from '@/domains/recommend/components/ChatSection';
import Bg from '@/shared/assets/images/recommend_bg.webp';
import { useAuthStore } from '@/domains/shared/store/auth';
import ChatPreview from '@/domains/recommend/components/ChatPreview';

function Page() {
  const { user } = useAuthStore();

  return (
    <div
      className="relative bg-repeat bg-auto w-full flex flex-col"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <h1 className="sr-only">취향추천하기</h1>
      {user ? <ChatSection /> : <ChatPreview />}
    </div>
  );
}
export default Page;
