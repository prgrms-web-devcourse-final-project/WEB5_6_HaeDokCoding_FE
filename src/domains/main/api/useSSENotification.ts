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
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        isConnectingRef.current = false;
      }
      return;
    }

    // 이미 연결 중이거나 연결되어 있으면 중복 방지
    if (isConnectingRef.current || eventSourceRef.current) {
      return;
    }

    isConnectingRef.current = true;

    const eventSource = new EventSource(`${getApi}/me/subscribe`, {
      withCredentials: true,
    });

    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      isConnectingRef.current = false;
    };

    eventSource.onmessage = () => {
      setHasNewNotification(true);
    };

    eventSource.onerror = () => {
      isConnectingRef.current = false;

      if (eventSource.readyState === EventSource.CLOSED) {
        eventSourceRef.current = null;
      }
    };

    // cleanup 함수
    return () => {
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
