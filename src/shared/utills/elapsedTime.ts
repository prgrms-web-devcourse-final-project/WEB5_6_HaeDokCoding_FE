export const elapsedTime = (dateString: string): string => {
  const start = new Date(dateString);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000); // seconds

  const times: { name: string; seconds: number }[] = [
    { name: '년', seconds: 60 * 60 * 24 * 365 },
    { name: '개월', seconds: 60 * 60 * 24 * 30 },
    { name: '일', seconds: 60 * 60 * 24 },
    { name: '시간', seconds: 60 * 60 },
    { name: '분', seconds: 60 },
  ];

  for (const value of times) {
    const interval = Math.floor(seconds / value.seconds);
    if (interval >= 1) {
      return `${interval}${value.name} 전`;
    }
  }

  return '방금 전';
};
