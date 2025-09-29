export const handleTextareaSubmit = (
  e: React.KeyboardEvent<HTMLTextAreaElement> | null,
  textarea: HTMLTextAreaElement | null,
  onSubmit: (value: string) => void
) => {
  if (!textarea) return;

  if (!e) {
    const value = textarea.value.trim();
    if (!value) return;

    onSubmit(value);
    textarea.value = '';
    textarea.style.height = '';
    return;
  }

  // 엔터 처리
  if (e.key === 'Enter') {
    if (e.shiftKey) return; // Shift+Enter

    e.preventDefault();

    // mac OS 일때는 Composing 방지
    if (e.nativeEvent.isComposing) return;

    const value = textarea.value.trim();
    if (!value) return;

    onSubmit(value);
    textarea.value = '';
    textarea.style.height = '';
  }
};
