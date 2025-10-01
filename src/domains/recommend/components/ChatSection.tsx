'use client';

import { useEffect, useState } from 'react';
import BotMessage from './bot/BotMessage';
import UserMessage from './user/UserMessage';
import NewMessageAlert from './bot/NewMessageAlert';
import MessageInput from './user/MessageInput';
import { useChatScroll } from '../hook/useChatScroll';
import {
  fetchChatHistory,
  fetchGreeting,
  fetchSendStepMessage,
  fetchSendTextMessage,
} from '../api/chat';
import { useAuthStore } from '@/domains/shared/store/auth';
import { ChatMessage, stepPayload } from '../types/recommend';

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chatListRef, chatEndRef, showNewMessageAlert, handleCheckBottom, handleScrollToBottom } =
    useChatScroll(messages.length);

  const handleSubmitText = async (message: string) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const tempId = Date.now().toString();
    const tempCreatedAt = new Date().toISOString();

    // 유저 메시지 낙관적 업데이트
    setMessages((prev) => [
      ...prev,
      { id: tempId, userId, message, sender: 'USER', type: 'text', createdAt: tempCreatedAt },
    ]);

    const botMessage = await fetchSendTextMessage({ message, userId });
    if (botMessage) setMessages((prev) => [...prev, botMessage]);
  };

  const handleSelectedOption = async (value: string) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const tempId = Date.now().toString();
    const tempCreatedAt = new Date().toISOString();

    const lastMessage = messages[messages.length - 1];
    const stepData = lastMessage?.stepData;

    if (!stepData) {
      await handleSubmitText(value);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        userId,
        message: value,
        sender: 'USER',
        type: 'text',
        createdAt: tempCreatedAt,
      },
    ]);

    const payload: stepPayload = {
      message: value,
      userId,
      currentStep: stepData.currentStep + 1,
    };

    // step에 따라 선택값 추가
    switch (stepData.currentStep) {
      case 2:
        payload.selectedAlcoholStrength = value;
        break;
      case 3:
        payload.selectedAlcoholBaseType = value;
        break;
      case 4:
        payload.selectedCocktailType = value;
        break;
    }

    // 챗봇 API 호출
    const botMessage = await fetchSendStepMessage(payload);
    if (botMessage) setMessages((prev) => [...prev, botMessage]);
  };

  // 채팅 기록 불러오기, 없으면 greeting 호출
  useEffect(() => {
    const loadChatHistory = async () => {
      const history = await fetchChatHistory();
      if (history && history.length > 0) {
        setMessages(history.sort((a, b) => Number(a.id) - Number(b.id)));
      } else {
        const greeting = await fetchGreeting('');
        if (greeting) setMessages([greeting]);
      }
    };
    loadChatHistory();
  }, []);

  return (
    <section className="mx-auto w-full flex-1">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div
        ref={chatListRef}
        onScroll={handleCheckBottom}
        className="flex flex-col gap-10 pt-12 px-3 overflow-y-auto max-h-[calc(100vh-116px)]  md:max-h-[calc(100vh-144px)]"
      >
        {messages.map(({ id, message, type, sender, stepData }) =>
          sender === 'USER' ? (
            <UserMessage key={`${id}-${sender}`} message={message} />
          ) : (
            <BotMessage
              key={`${id}-${sender}`}
              messages={[
                {
                  id,
                  message,
                  type:
                    type === 'TEXT' || type === 'RADIO_OPTIONS' || type === 'RECOMMEND'
                      ? type
                      : 'TEXT',
                  options: stepData?.options?.map((o) => o.label) ?? [],
                },
              ]}
              onSelectedOption={handleSelectedOption}
            />
          )
        )}

        <div ref={chatEndRef}></div>
        {showNewMessageAlert && <NewMessageAlert onClick={handleScrollToBottom} />}
      </div>
      <MessageInput onSubmit={handleSubmitText} />
    </section>
  );
}
export default ChatSection;
