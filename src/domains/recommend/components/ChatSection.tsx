import ChatForm from './ChatForm';
import MyChat from './MyChat';
import SsuryChat from './SsuryChat';

function ChatSection() {
  return (
    <section className="page-layout max-w-1024 py-12 ">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div className="flex flex-col gap-10 pb-20">
        <SsuryChat />
        <MyChat></MyChat>
      </div>
      <ChatForm />
    </section>
  );
}
export default ChatSection;
