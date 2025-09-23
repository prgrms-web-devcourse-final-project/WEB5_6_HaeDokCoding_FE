import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, Ref } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm' | 'auto'
  color?: 'default' | 'purple';
  ref?: Ref<HTMLButtonElement | null>;
  disable?: boolean;
  type?: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ButtonClass = cva(
  `
  py-1 px-2 rounded-lg text-base flex-center text-primary duration-300 disabled:bg-gray disabled:cursor-not-allowed disabled:text-primary enabled:hover:inset-shadow-black
  `,
  {
    variants: {
      color: {
        default: 'bg-secondary text-primary',
        purple: 'bg-tertiary text-secondary',
      },
      size: {
        default: 'h-10 min-w-25',
        sm: 'h-8 min-w-20',
        auto:'w-auto'
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
  onClick,
  ...rest
}: Props) {
  return (
    <button
      className={tw(ButtonClass({ color, size, className }))}
      type={type}
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
