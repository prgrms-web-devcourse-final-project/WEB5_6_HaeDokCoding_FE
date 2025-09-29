'use client';

import { useState } from 'react';
import ChatForm from './ChatForm';
import MyChat from './MyChat';
import SsuryChat from './SsuryChat';

function ChatSection() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <section className="page-layout max-w-1024 py-12 ">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div className="flex flex-col gap-10 pb-20">
        <SsuryChat />
        {messages.map((msg, i) => (
          <MyChat key={i} message={msg} />
        ))}
      </div>
      <ChatForm onSubmit={handleSubmit} />
    </section>
  );
}
export default ChatSection;
