import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, Ref } from 'react';

// 버튼속성을 다 받을 수 있게
// 클래스네임, 기본적인건 다 props로 받을 수 있게
// 버튼 보여질 경우 arial hidden을 넣고 아이콘의경우 aria-label넣는다
// 속성값에 disabled넣었을때 알어서 바뀔수 있게 할 수 있게 수정하기.
// Ref가 잘 되는지 확인해보기

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm';
  variant?: 'default' | 'purple' | 'disable';
  ref?:Ref<HTMLButtonElement | null>;
  disabled?: boolean;
  type: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
}

export const ButtonClass = cva(
  `
  py-1 px-2 rounded-lg text-base font-bold flex-center text-bold text-navy duration-300 
  `,
  {
    variants: {
      variant: {
        default: 'bg-secondary text-navy hover:inset-shadow-black',
        purple: 'bg-tertiary text-secondary hover:inset-shadow-white',
        disable: 'bg-gray cursor-not-allowed',
      },
      size: {
        default: 'h-10, min-w-25',
        sm: 'h-8 min-w-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size:'default'
    }
  }
);


function Button({
  size = 'default',
  type = 'button',
  disabled = false,
  variant = 'default',
  children,
  className,
  ref,
  ...rest
}: Props) {
  return (
    <button
      className={tw(ButtonClass({variant,size,className}))}
      type={type}
      disabled={disabled}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
}
export default Button;
