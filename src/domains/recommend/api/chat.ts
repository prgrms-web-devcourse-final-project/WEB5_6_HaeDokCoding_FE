import { getApi } from '@/app/api/config/appConfig';
import { useAuthStore } from '@/domains/shared/store/auth';
import { ChatHistoryItem, ChatMessage, stepPayload, TextPayload } from '../types/recommend';

// 첫 시작 api
export const fetchGreeting = async (message: string): Promise<ChatMessage | null> => {
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

    const data = await res.json();

    return {
      id: data.data.timestamp ?? Date.now().toString(), // 임시: id가 항상 존재하도록 fallback 추가
      userId,
      message: data.data.message ?? '',
      sender: 'CHATBOT',
      type: data.data.type ?? 'text', // 임시: type이 없으면 기본 'text'
      stepData: data.data.stepData ?? null,
      createdAt: data.data.timestamp ?? new Date().toISOString(), // 임시: createdAt 추가
    };
  } catch (err) {
    console.error('Greeting API 호출 에러:', err);
    return null;
  }
};

// 유저 메시지 전송 (일반 텍스트)
export const fetchSendTextMessage = async (payload: TextPayload): Promise<ChatMessage | null> => {
  try {
    const res = await fetch(`${getApi}/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    const data = await res.json();

    return {
      id: data.data.timestamp ?? Date.now().toString(),
      userId: data.data.userId ?? payload.userId,
      message: data.data.message ?? '',
      sender: 'CHATBOT',
      type: data.data.type ?? 'text',
      stepData: data.data.stepData ?? null,
      createdAt: data.data.timestamp ?? new Date().toISOString(),
    };
  } catch (err) {
    console.error('Text 메시지 전송 실패:', err);
    return null;
  }
};

// 단계별 옵션 메시지 전송
export const fetchSendStepMessage = async (payload: stepPayload): Promise<ChatMessage | null> => {
  try {
    const res = await fetch(`${getApi}/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    const data = await res.json();

    return {
      id: data.data.timestamp ?? Date.now().toString(),
      userId: data.data.userId ?? payload.userId,
      message: data.data.message ?? '',
      sender: 'CHATBOT',
      type: data.data.type ?? 'text',
      stepData: data.data.stepData ?? null,
      createdAt: data.data.timestamp ?? new Date().toISOString(),
    };
  } catch (err) {
    console.error('Step 메시지 전송 실패:', err);
    return null;
  }
};

export const fetchChatHistory = async (): Promise<ChatMessage[] | null> => {
  try {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) throw new Error('userId 없음');

    const res = await fetch(`${getApi}/chatbot/history/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      console.error('History API 요청 실패:', res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    return data.data.map((item: ChatHistoryItem) => ({
      id: String(item.id), // number → string
      userId: item.userId,
      message: item.message,
      sender: item.sender,
      stepData: item.stepData ?? null,
      createdAt: item.timestamp,
    }));
  } catch (err) {
    console.error('History API 호출 에러:', err);
    return null;
  }
};
