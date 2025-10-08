'use client';
import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { HTMLInputTypeAttribute, Ref } from 'react';
import Search from '@/shared/assets/icons/search_32.svg';
import Button from '../button/Button';

interface Props {
  placeholder: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  ref?: Ref<HTMLInputElement | null>;
  size?: 'default' | 'lg';
  variant?: 'default' | 'search' | 'comment';
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

export const InputClass = cva(
  `px-4 py-1 w-80 rounded-lg bg-white text-primary flex items-center gap-2 placeholder:text-gray-dark`,
  {
    variants: {
      size: {
        default: 'h-10',
        lg: 'h-13',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

function Input({
  placeholder,
  type,
  ref,
  size,
  variant = 'default',
  className,
  value,
  id,
  onChange,
  ...rest
}: Props) {
  return (
    <div className={tw(InputClass({ size, className }))}>
      <label htmlFor={id} className="flex-1">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          className={`outline-none w-full flex-1 leading-${size}`}
          ref={ref}
          onChange={onChange}
          {...rest}
        />
      </label>
      {variant === 'search' ? (
        <button type="button">
          <Search aria-label="검색버튼" />
        </button>
      ) : variant === 'comment' ? (
        <Button
          color="purple"
          type="submit"
          size="auto"
          className="w-10 h-6 flex-center text-xs px-1.5 py-[1px] rounded-sm shadow-md"
        >
          입력
        </Button>
      ) : null}
    </div>
  );
}
export default Input;
