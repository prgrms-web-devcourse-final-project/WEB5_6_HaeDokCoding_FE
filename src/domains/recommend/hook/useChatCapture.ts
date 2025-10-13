import { RefObject } from 'react';
import * as htmlToImage from 'html-to-image';

export function useChatCapture(chatRef: RefObject<HTMLDivElement | null>) {
  const capture = async () => {
    if (!chatRef.current) return;

    const chatEl = chatRef.current;
    const originalHeight = chatEl.style.height;

    chatEl.style.height = chatEl.scrollHeight + 'px';

    try {
      const dataUrl = await htmlToImage.toPng(chatEl, {
        backgroundColor: '#1A1A1A',
        cacheBust: true,
        includeQueryParams: true,
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'chat.png';
      link.click();
    } catch (err) {
      console.error('채팅 캡처 실패:', err);
    } finally {
      chatEl.style.height = originalHeight;
    }
  };

  return { capture };
}
