// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let lastCall = 0;
  return function (...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
