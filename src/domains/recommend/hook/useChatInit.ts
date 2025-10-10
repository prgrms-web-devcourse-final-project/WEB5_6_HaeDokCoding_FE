'use client';

import { useEffect } from 'react';
import { ChatMessage } from '../types/recommend';
import { fetchChatHistory, fetchGreeting } from '../api/chat';

// 채팅 기록 불러오기 없으면 greeting api 호출
export function useChatInit(setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>) {
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await fetchChatHistory();
        if (history && history.length > 0) {
          setMessages(history.sort((a, b) => Number(a.id) - Number(b.id)));
        } else {
          const greeting = await fetchGreeting('');
          if (greeting) setMessages([greeting]);
        }
      } catch (err) {
        console.error('채팅 초기화 실패:', err);
      }
    };
    loadChatHistory();
  }, [setMessages]);
}
