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
  color?: 'default' | 'purple';
  ref?: Ref<HTMLButtonElement | null>;
  disable?: boolean;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
}

export const ButtonClass = cva(
  `
  py-1 px-2 rounded-lg text-base flex-center text-navy duration-300 disabled:bg-gray disabled:cursor-not-allowed disabled:text-primary
  `,
  {
    variants: {
      color: {
        default: 'bg-secondary text-navy enabled:hover:inset-shadow-black',
        purple: 'bg-tertiary text-secondary enabled:hover:inset-shadow-white',
      },
      size: {
        default: 'h-10, min-w-25',
        sm: 'h-8 min-w-20',
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'default',
    },
  }
);

function Button({
  size,
  type = 'button',
  color,
  children,
  className,
  ref,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={tw(ButtonClass({ color, size, className }))}
      type={type}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
