import { useEffect, useRef, useState } from 'react';
import { getApi } from '@/app/api/config/appConfig';

export function useSSENotification(isLoggedIn: boolean) {
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    // 로그인 안 했으면 연결 안 함
    if (!isLoggedIn) {
      if (eventSourceRef.current) {
        console.log('🔌 로그아웃으로 인한 SSE 연결 종료');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        isConnectingRef.current = false;
      }
      return;
    }

    // 이미 연결 중이거나 연결되어 있으면 중복 방지
    if (isConnectingRef.current || eventSourceRef.current) {
      console.log('⚠️ 이미 SSE 연결 중 또는 연결됨');
      return;
    }

    isConnectingRef.current = true;
    console.log('🔌 SSE 연결 시작...');

    const eventSource = new EventSource(`${getApi}/me/subscribe`, {
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log('✅ SSE 연결 성공!');
      isConnectingRef.current = false;
    };

    eventSource.onmessage = (event) => {
      console.log('📢 새 알림 도착:', event.data);
      setHasNewNotification(true);
    };

    eventSource.onerror = (error) => {
      console.error('❌ SSE 에러:', error);
      console.log('연결 상태:', eventSource.readyState);

      isConnectingRef.current = false;

      if (eventSource.readyState === EventSource.CLOSED) {
        console.log('🔄 SSE 연결이 닫혔습니다');
        eventSourceRef.current = null;
      }
    };

    // cleanup 함수
    return () => {
      console.log('🔌 컴포넌트 언마운트로 인한 SSE 연결 종료');
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      isConnectingRef.current = false;
    };
  }, [isLoggedIn]); // isLoggedIn만 의존성으로

  const clearNotification = () => {
    setHasNewNotification(false);
  };

  return { hasNewNotification, clearNotification };
}
