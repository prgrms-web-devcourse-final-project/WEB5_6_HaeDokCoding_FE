import { useEffect, useRef, useState } from 'react';

export const useChatScroll = (lastMessageId: string) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatListRef = useRef<HTMLDivElement>(null);
  const isScrollBottom = useRef(true);
  const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);

  // 스크롤 제일 아래인지 체크
  const handleCheckBottom = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    isScrollBottom.current = scrollTop + clientHeight >= scrollHeight - 10;

    if (isScrollBottom.current) setShowNewMessageAlert(false);
  };

  // 새 메시지또는 로딩중 변화 시 자동 스크롤
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      isScrollBottom.current = true;
      setShowNewMessageAlert(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [lastMessageId]);

  // 스크롤 제일 아래로
  const handleScrollToBottom = () => {
    if (chatListRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      isScrollBottom.current = true;
    }
  };

  return {
    chatListRef,
    chatEndRef,
    showNewMessageAlert,
    handleCheckBottom,
    handleScrollToBottom,
  };
};
