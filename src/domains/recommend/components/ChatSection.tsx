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
  RecommendationItem,
} from '../types/recommend';
import ChatList from './ChatList';

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chatListRef, chatEndRef, showNewMessageAlert, handleCheckBottom, handleScrollToBottom } =
    useChatScroll(messages.length);
  const [userCurrentStep, setUserCurrentStep] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const selectedOptions = useRef<{
    selectedAlcoholStrength?: string;
    selectedAlcoholBaseType?: string;
    selectedCocktailType?: string;
  }>({});

  const handleSendMessage = async (payload: stepPayload | { message: string; userId: string }) => {
    const typingTimer = setTimeout(() => setIsBotTyping(true), 300);

    try {
      if (!('currentStep' in payload)) {
        const botMessage = await fetchSendTextMessage(payload);
        clearTimeout(typingTimer);
        setIsBotTyping(false);

        if (!botMessage) return;
        setTimeout(() => setMessages((prev) => [...prev, botMessage]), 500);
        return;
      }

      const botMessage = await fetchSendStepMessage(payload);
      clearTimeout(typingTimer);
      setIsBotTyping(false);

      if (!botMessage) return;
      setTimeout(() => setMessages((prev) => [...prev, botMessage]), 500);
    } catch (err) {
      clearTimeout(typingTimer);
      setIsBotTyping(false);
      console.error(err);
    }
  };

  // 일반 텍스트 보낼 시
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

    await handleSendMessage({ message, userId });
  };

  // 옵션 클릭 시
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

    const nextStep = value === 'QA' ? 0 : (stepData?.currentStep ?? 0) + 1;
    setUserCurrentStep(nextStep);

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
      currentStep: nextStep,
      ...selectedOptions.current,
    };

    await handleSendMessage(payload);
  };

  // 채팅 기록 불러오기 없으면 greeting 호출
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
  ): RecommendationItem[] => {
    if (type !== 'CARD_LIST' || !stepData?.recommendations) return [];
    return stepData.recommendations;
  };

  return (
    <section className="relative flex-1 flex flex-col w-full">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <ChatList
        messages={messages}
        userCurrentStep={userCurrentStep}
        onSelectedOption={handleSelectedOption}
        getRecommendations={getRecommendations}
        chatListRef={chatListRef}
        chatEndRef={chatEndRef}
        showNewMessageAlert={showNewMessageAlert}
        handleCheckBottom={handleCheckBottom}
        handleScrollToBottom={handleScrollToBottom}
        isBotTyping={isBotTyping}
      />
      <MessageInput onSubmit={handleSubmitText} />
    </section>
  );
}
export default ChatSection;
