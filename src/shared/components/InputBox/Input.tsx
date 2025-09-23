import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { HTMLInputTypeAttribute, Ref } from 'react';

// select나올떄 자연스러운 처리 화살표 로테이트 
// 인풋 타입받을 수 있게 수정
// 인풋접근성 라벨이 중요함 라벨 을 div에 묶어서 하거나 label로 인풋감싸거나 div로 묶고 같은 선상에두게 
// div안에 라벨이랑감싸기

interface Props {
  placeholder: string;
  type?: HTMLInputTypeAttribute
  ref?: Ref<HTMLInputElement | null>;
  size?: 'default' | 'lg';
  className?: string;
  onChange?: () => void;
}

export const InputClass = cva(
  `px-4 py-1 rounded-lg w-80 bg-white text-primary outline-none placeholder:text-gray-dark`,
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

function Input({ placeholder, ref, size, className, onChange, ...rest }: Props) {
  return (
    <input
      type="text"
      className={tw(InputClass({ size, className }))}
      placeholder={placeholder}
      ref={ref}
      onChange={onChange}
      {...rest}
    />
  );
}
export default Input;
