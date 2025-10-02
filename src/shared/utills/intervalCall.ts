export const intervalCall = (interval: number) => {
  // interval 시간 안에 다시 호출된 함수 콜은 무시한다
  let elapsed = true;
  return async (fn: () => void) => {
    if (!elapsed) {
      return; // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
    }
    elapsed = false;
    try {
      await fn(); // async 함수 실행을 기다려줌
    } catch (err) {
      console.error('intervalCall 내 함수 실행 중 에러', err);
    } finally {
      setTimeout(() => {
        elapsed = true;
      }, interval);
    }
  };
};
