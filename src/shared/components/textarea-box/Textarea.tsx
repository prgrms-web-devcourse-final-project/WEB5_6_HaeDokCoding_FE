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
    <div className="pl-4 pr-2 py-1 w-full rounded-lg bg-white text-primary flex items-end gap-2 placeholder:text-gray-dark">
      <label htmlFor={id} className="flex-1">
        <textarea
          id={id}
          spellCheck={false}
          placeholder={placeholder}
          className={tw(
            `outline-none w-full flex-1 leading-${size} min-h-[45px] max-h-[150px]`,
            className
          )}
          ref={ref}
          onChange={handleResize}
          onKeyDown={onKeyDown}
          {...rest}
        />
      </label>
      <Button
        color="purple"
        type="submit"
        size="auto"
        className="w-12 h-12 text-xs px-1.5 py-[1px] rounded-sm shadow-md mb-1"
        onClick={onClick}
      >
        입력
      </Button>
    </div>
  );
}

export default Textarea;
