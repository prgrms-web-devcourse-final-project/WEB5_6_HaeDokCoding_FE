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
        console.error('채팅 첫 시작 실패:', err);
      }
    };
    loadGreeting();
  }, [setMessages]);
}
