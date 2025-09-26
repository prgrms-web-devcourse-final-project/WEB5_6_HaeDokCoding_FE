import ChatForm from '@/domains/recommend/components/ChatForm';
import MyChat from '@/domains/recommend/components/MyChat';
import SsuryChat from '@/domains/recommend/components/SsuryChat';
import Bg from '@/shared/assets/images/recommend_bg.webp';

function Page() {
  return (
    <div
      className="relative bg-repeat-y bg-top bg-auto w-full flex"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <h1 className="sr-only">취향추천하기</h1>
      <div className="page-layout max-w-1024 py-12 ">
        <div className="flex flex-col gap-10 pb-20">
          <SsuryChat />
          <MyChat></MyChat>
        </div>
      </div>
      <ChatForm />
    </div>
  );
}
export default Page;
