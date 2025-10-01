'use client';

import { useEffect, useState } from 'react';
import BotMessage from './bot/BotMessage';
import UserMessage from './user/UserMessage';
import NewMessageAlert from './bot/NewMessageAlert';
import MessageInput from './user/MessageInput';
import { useChatScroll } from '../hook/useChatScroll';
import { fetchChatMessage } from '../api/chat';

// TODOS : 아직 api 몰라서 임시 type
interface ChatMessage {
  id: number;
  message: string;
  sender: 'user' | 'bot';
}

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chatListRef, chatEndRef, showNewMessageAlert, handleCheckBottom, handleScrollToBottom } =
    useChatScroll(messages.length);

  const handleSubmit = async (message: string) => {
    // 사용자 메시지
    setMessages((prev) => [...prev, { id: prev.length + 1, message, sender: 'user' }]);
  };

  useEffect(() => {
    const testApi = async () => {
      const data = await fetchChatMessage('테스트 메시지');
      console.log('Chat API response:', data);
    };
    testApi();
  }, []);

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
