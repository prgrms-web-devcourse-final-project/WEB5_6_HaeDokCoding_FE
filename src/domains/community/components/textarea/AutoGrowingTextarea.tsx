import gsap from 'gsap';
import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function AutoGrowingTextarea({ value, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto'; // 높이 초기화
    textarea.style.height = textarea.scrollHeight + 'px'; // 스크롤 높이만큼 늘리기

    const handleInput = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };

    textarea.addEventListener('input', handleInput);
    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, []);

  useEffect(() => {
    if (!textareaRef.current) return;
    gsap.fromTo(
      textareaRef.current,
      { autoAlpha: 0, y: -15 },
      { duration: 0.4, autoAlpha: 1, y: 0, ease: 'power2.out' }
    );
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      className="w-full resize-none overflow-hidden bg-white py-2 px-4 text-primary rounded-lg outline-none"
      rows={1}
      spellCheck={false}
      onChange={(e) => onChange(e)}
    />
  );
}

export default AutoGrowingTextarea;
