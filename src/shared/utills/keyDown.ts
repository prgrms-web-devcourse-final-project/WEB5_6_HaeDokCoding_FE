export const keyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (e.nativeEvent.isComposing) {
      return;
    }
  }
};
