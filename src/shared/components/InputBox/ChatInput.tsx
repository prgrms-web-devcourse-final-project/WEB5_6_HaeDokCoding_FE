import { keyDown } from '@/shared/utills/keyDown';
import { Ref } from 'react';

interface Props {
  id: string;
  placeholder: string;
  className?: string;
  ref?: Ref<HTMLTextAreaElement | null>;
}

function ChatInput({ id, placeholder, className, ref }: Props) {
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;

    if (target.value == '') {
      target.style.height = '';
    }
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        입력창
      </label>
      <textarea
        id={id}
        name={id}
        ref={ref}
        onKeyDown={(e)=>keyDown(e)}
        onInput={(e) => handleInput(e)}
        placeholder={placeholder}
        className={` px-4 py-1 rounded-lg h-13 bg-white text-primary leading-11 placeholder:text-gray-dark resize-none outline-none ${className}`}
      />
    </div>
  );
}
export default ChatInput;
