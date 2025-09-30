'use client';

import { useEffect, useRef, useState } from 'react';
import BotMessage from './bot/BotMessage';
import UserMessage from './user/UserMessage';
import NewMessageAlert from './bot/NewMessageAlert';
import MessageInput from './user/MessageInput';

// TODOS : 아직 api 몰라서 임시 type
interface ChatMessage {
  id: number;
  message: string;
  sender: 'user' | 'bot';
}

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = useRef(true);
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);

  const handleSubmit = (message: string) => {
    // 사용자 메시지
    setMessages((prev) => [...prev, { id: prev.length + 1, message, sender: 'user' }]);
  };

  // 쑤리 임시 메시지
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMessages((prev) => [
  //       ...prev,
  //       { id: prev.length + 1, message: `새 메시지 ${prev.length + 1}`, sender: 'bot' },
  //     ]);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // 스크롤 제일 아래인지 체크
  const handleCheckBottom = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    isScrollBottom.current = scrollTop + clientHeight >= scrollHeight - 10;

    if (isScrollBottom.current) setShowNewMessageAlert(false);
  };

  // 새 메시지가 들어오면 자동 스크롤
  useEffect(() => {
    if (isScrollBottom.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowNewMessageAlert(false); // 새메세지 숨김
    } else {
      setShowNewMessageAlert(true); // 새메세지 보여줌
    }
  }, [messages]);

  // 스크롤 제일 아래로
  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      isScrollBottom.current = true;
    }
  };

  return (
    <section className="mx-auto w-full flex-1">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div
        ref={chatListRef}
        onScroll={handleCheckBottom}
        className="flex flex-col gap-10 pt-12 px-3 overflow-y-auto max-h-[calc(100vh-116px)]  md:max-h-[calc(100vh-144px)]"
      >
        {messages.map(({ id, message, sender }) =>
          sender === 'user' ? (
            <UserMessage key={id} message={message} />
          ) : (
            <BotMessage key={id} messages={[{ id, type: 'text', message }]} />
          )
        )}

        <div ref={chatEndRef}></div>
        {showNewMessageAlert && <NewMessageAlert onClick={handleScrollToBottom} />}
      </div>
      <MessageInput onSubmit={handleSubmit} />
    </section>
  );
}
export default ChatSection;
