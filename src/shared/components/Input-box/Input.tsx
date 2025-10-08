'use client';
import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { HTMLInputTypeAttribute, Ref } from 'react';
import Search from '@/shared/assets/icons/search_32.svg';
import Button from '../button/Button';
// select나올떄 자연스러운 처리 화살표 로테이트 [x]
// 인풋 타입받을 수 있게 수정 [x]
// 인풋접근성 라벨이 중요함 라벨 을 div에 묶어서 하거나 label로 인풋감싸거나 div로 묶고 같은 선상에두게 [x]
// div안에 라벨이랑감싸기 [x]
// 텍스트 에어리어 버전도 만들기
// 인풋 잘림 = 라인height 인풋 높이랑 맞춰두기 [x]

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
  value,

  size,
  variant = 'default',
  className,
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
          placeholder={placeholder}
          className={`outline-none w-full flex-1 leading-${size}`}
          ref={ref}
          value={value}
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
