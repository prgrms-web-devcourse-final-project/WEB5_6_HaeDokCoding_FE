import { ButtonHTMLAttributes, Ref } from 'react';
// 버튼속성을 다 받을 수 있게
// 클래스네임, 기본적인건 다 props로 받을 수 있게
// 버튼 보여질 경우 arial hidden을 넣고 아이콘의경우 aria-label넣는다
// 언더라인 버튼도 만들기
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm';
  variant?: 'default' | 'purple' | 'disable';
  ref?: Ref<HTMLButtonElement | null>;
  disabled?: boolean;
  type: 'submit' | 'button';
  children?: React.ReactNode;
  className?: string;
}

const SIZE = {
  default: 'py-1 px-2 h-10 rounded-lg text-base font-bold min-w-25 flex-center',
  sm: 'py-1 px-2 rounded-lg text-base font-bold min-w-20 flex-center',
};

const VARIANT = {
  default: 'bg-secondary text-navy duration-300 hover:inset-shadow-black',
  purple: 'bg-tertiary text-bold text-secondary duration-300 hover:inset-shadow-white',
  disable: 'bg-gray text-navy cursor-not-allowed',
};

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
      className={`${SIZE[size]} ${VARIANT[variant]} ${className}`}
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
