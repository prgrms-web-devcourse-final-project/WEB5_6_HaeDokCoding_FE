import tw from '@/shared/utills/tw';
import Button from '../button/Button';
import { Ref } from 'react';
import { resizeTextarea } from '@/shared/utills/textareaResize';

interface Props {
  placeholder: string;
  ref?: Ref<HTMLTextAreaElement | null>;
  size?: 'default' | 'lg';
  onChange?: () => void;
  className?: string;
  id: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => Promise<void>;
  onClick?: () => void;
}

function Textarea({
  placeholder,
  ref,
  size,
  id,
  className,
  onChange,
  onKeyDown,
  onClick,
  ...rest
}: Props) {
  const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    resizeTextarea(textarea);
    if (onChange) onChange();
  };

  return (
    <div className="pl-4 pr-2 w-full rounded-lg bg-white text-primary flex items-center gap-2 placeholder:text-gray-dark min-h-10 max-h-[150px]">
      <textarea
        id={id}
        spellCheck={false}
        placeholder={placeholder}
        className={tw(
          `outline-none w-full flex-1 leading-[1.2] resize-none text-md h-[24px] py-[0.8px] no-scrollbar`,
          className
        )}
        ref={ref}
        onChange={handleResize}
        onKeyDown={onKeyDown}
        {...rest}
      />
      <Button
        color="purple"
        type="submit"
        size="auto"
        className="w-12 h-7 text-xs px-1.5 py-[1px] mt-[0.5px] rounded-sm shadow-md mb-1 absolute bottom-[1.2px] right-2"
        onClick={onClick}
      >
        입력
      </Button>
    </div>
  );
}

export default Textarea;
