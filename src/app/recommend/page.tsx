import Bg from '@/shared/assets/images/recommend_bg.webp';
import ChatForm from './components/ChatForm';
import SsuryChat from './components/SsuryChat';
import MyChat from './components/MyChat';

function Page() {
  return (
    <div
      className="bg-repeat-y bg-top bg-auto w-full flex"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <h1 className="sr-only">취향추천하기</h1>
      <div className="relative page-layout max-w-1024 py-12 ">
        <div className="flex flex-col gap-10 pb-20">
          <SsuryChat />
          <MyChat></MyChat>
        </div>

        <ChatForm />
      </div>
    </div>
  );
}
export default Page;
