export const resizeTextarea = (textarea: HTMLTextAreaElement) => {
  if (!textarea) return;
  textarea.style.height = '';
  textarea.style.height = `${textarea.scrollHeight}px`;
};
