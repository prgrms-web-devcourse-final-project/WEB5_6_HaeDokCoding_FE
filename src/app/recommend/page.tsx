import Bg from '@/shared/assets/images/recommend_bg.webp';
import ChatForm from './ChatForm';

function Page() {
  return (
    <div
      className="bg-repeat-y bg-top bg-auto w-full flex"
      style={{ backgroundImage: `url(${Bg.src})` }}
    >
      <div className="relative page-layout max-w-1024 py-12 ">
        <ChatForm />
      </div>
    </div>
  );
}
export default Page;
