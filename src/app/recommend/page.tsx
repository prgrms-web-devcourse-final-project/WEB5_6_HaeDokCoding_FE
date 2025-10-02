import ChatSection from '@/domains/recommend/components/ChatSection';
import Bg from '@/shared/assets/images/recommend_bg.webp';

function Page() {
  return (
    <div
      className="relative bg-repeat bg-auto w-full flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <h1 className="sr-only">취향추천하기</h1>
      <ChatSection />
    </div>
  );
}
export default Page;
