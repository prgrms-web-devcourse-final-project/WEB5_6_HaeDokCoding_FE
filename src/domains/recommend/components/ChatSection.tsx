'use client';

import { useEffect, useRef, useState } from 'react';
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
import {
  ChatMessage,
  stepPayload,
  StepRecommendation,
  StepRecommendationItem,
} from '../types/recommend';

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chatListRef, chatEndRef, showNewMessageAlert, handleCheckBottom, handleScrollToBottom } =
    useChatScroll(messages.length);

  const selectedOptions = useRef<{
    selectedAlcoholStrength?: string;
    selectedAlcoholBaseType?: string;
    selectedCocktailType?: string;
  }>({});

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

    const selectedLabel = stepData.options?.find((opt) => opt.value === value)?.label ?? value;

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        userId,
        message: selectedLabel,
        sender: 'USER',
        type: 'text',
        createdAt: tempCreatedAt,
      },
    ]);

    switch (stepData.currentStep + 1) {
      case 2:
        selectedOptions.current.selectedAlcoholStrength = value;
        break;
      case 3:
        selectedOptions.current.selectedAlcoholBaseType = value;
        break;
      case 4:
        selectedOptions.current.selectedCocktailType = value;
        break;
    }

    const payload: stepPayload = {
      message: selectedLabel,
      userId,
      currentStep: stepData.currentStep + 1,
      ...selectedOptions.current,
    };

    console.log('payload to API', payload);

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

  const getRecommendations = (
    type: string | undefined,
    stepData?: StepRecommendation | null
  ): StepRecommendationItem[] => {
    if (type !== 'CARD_LIST' || !stepData?.recommendations) return [];
    return stepData.recommendations;
  };

  return (
    <section className="flex-1 flex flex-col w-full  overflow-hidden">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <div
        ref={chatListRef}
        onScroll={handleCheckBottom}
        className="absolute top-0 left-0 right-0 bottom-16 px-3 pt-12 pb-5 overflow-y-auto"
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
                  type: type ?? 'TEXT',
                  options: type === 'RADIO_OPTIONS' ? (stepData?.options ?? []) : [],
                  recommendations: getRecommendations(type, stepData),
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
