'use client';

import { useState } from 'react';
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

function ChatSection() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (message: string) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <section className="page-layout max-w-1024 py-12 ">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div className="flex flex-col gap-10 pb-20">
        <BotMessage />
        <TypingIndicator />
        {messages.map((msg, i) => (
          <UserMessage key={i} message={msg} />
        ))}
      </div>
      <MessageInput onSubmit={handleSubmit} />
    </section>
  );
}
export default ChatSection;
