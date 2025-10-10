'use client';

import { useEffect } from 'react';
import { ChatMessage } from '../types/recommend';
import { fetchGreeting } from '../api/chat';

export function useChatInit(setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>) {
  useEffect(() => {
    const loadGreeting = async () => {
      try {
        const greeting = await fetchGreeting('');
        if (greeting) setMessages([greeting]);
      } catch (err) {
        console.error('채팅 초기화 실패:', err);
      }
    };
    loadGreeting();

    // 새로고침/브라우저 닫기 confirm
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [setMessages]);
}
