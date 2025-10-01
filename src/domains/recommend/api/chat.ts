import { getApi } from '@/app/api/config/appConfig';
import { useAuthStore } from '@/domains/shared/store/auth';

export interface ChatMessage {
  id: number;
  userId: number;
  message: string;
  sender: string;
  createdAt: string;
}

interface ChatResponse {
  code: number;
  message: string;
  data: ChatMessage;
}

export const fetchChatMessage = async (message: string): Promise<ChatMessage | null> => {
  try {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) throw new Error('userId 없음.');

    const res = await fetch(`${getApi}/chatbot/greeting/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('API 요청 실패:', res.status, res.statusText);
      return null;
    }

    const data: ChatResponse = await res.json();
    console.log('Chat API response:', data);
    return data.data;
  } catch (err) {
    console.error('API 호출 에러:', err);
    return null;
  }
};
