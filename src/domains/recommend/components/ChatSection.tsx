'use client';

import { useEffect, useRef, useState } from 'react';
import MessageInput from './user/MessageInput';
import {
  fetchChatHistory,
  fetchGreeting,
  fetchSendStepMessage,
  fetchSendTextMessage,
} from '../api/chat';
import { useAuthStore } from '@/domains/shared/store/auth';
import { ChatMessage, stepPayload } from '../types/recommend';
import ChatList from './ChatList';
import { useChatInit } from '../hook/useChatInit';

function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userCurrentStep, setUserCurrentStep] = useState(0);
  const selectedOptions = useRef<{
    selectedSearchType?: string;
    selectedAlcoholStrength?: string;
    selectedAlcoholBaseType?: string;
    selectedCocktailType?: string;
  }>({});

  const isInputDisabled =
    selectedOptions.current.selectedSearchType !== 'QA' && userCurrentStep < 3;

  const handleSendMessage = async (payload: stepPayload | { message: string; userId: string }) => {
    const tempTypingId = `typing-${Date.now()}`;

    // Typing 메시지 임시 추가
    setMessages((prev) => [
      ...prev,
      {
        id: tempTypingId,
        sender: 'CHATBOT',
        type: 'TYPING',
        message: '',
        createdAt: new Date().toISOString(),
      },
    ]);

    try {
      const botMessage =
        'currentStep' in payload
          ? await fetchSendStepMessage(payload)
          : await fetchSendTextMessage(payload);

      if (!botMessage) return;

      setMessages((prev) => prev.map((msg) => (msg.id === tempTypingId ? botMessage : msg)));
    } catch (err) {
      console.error(err);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempTypingId));
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

    const nextStep = userCurrentStep === 3 ? userCurrentStep + 1 : userCurrentStep;

    const payload: stepPayload = {
      currentStep: nextStep,
      message,
      userId,
      ...selectedOptions.current,
    };

    await handleSendMessage(payload);
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

    // 0단계에서 QA 선택 시
    if (stepData.currentStep === 0 && value === 'QA') {
      selectedOptions.current.selectedSearchType = 'QA';
    }

    switch (stepData.currentStep + 1) {
      case 2:
        selectedOptions.current.selectedAlcoholStrength = value;
        break;
      case 3:
        selectedOptions.current.selectedAlcoholBaseType = value;
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

  useChatInit(setMessages);

  return (
    <section className="relative flex-1 flex flex-col items-center w-full">
      <h2 className="sr-only">대화 목록 및 입력 창</h2>
      <ChatList
        messages={messages}
        userCurrentStep={userCurrentStep}
        onSelectedOption={handleSelectedOption}
      />
      <MessageInput onSubmit={handleSubmitText} disabled={isInputDisabled} />
    </section>
  );
}
export default ChatSection;
