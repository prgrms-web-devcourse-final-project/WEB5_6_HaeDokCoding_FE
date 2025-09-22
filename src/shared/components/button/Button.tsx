import { ButtonHTMLAttributes, Ref } from 'react';
// 버튼속성을 다 받을 수 있게
// 클래스네임, 기본적인건 다 props로 받을 수 있게
// 버튼 보여질 경우 arial hidden을 넣고 아이콘의경우 aria-label넣는다
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm';
  type: 'submit' | 'button';
  disable?: boolean;
  variant?: 'default' | 'purple' | 'disable';
  children?: React.ReactNode
  ref?: Ref<HTMLButtonElement | null>;
}

const SIZE = {
  default: 'py-1 px-2 h-10 rounded-lg text-base font-bold min-w-25 flex-center hover:inset-shadow-lg',
  sm: 'py-1 px-2 rounded-lg text-base font-bold min-w-20 flex-center',
};

const VARIANT = {
  default: 'bg-secondary text-navy cursor-pointer',
  purple: 'bg-tertiary text-bold text-secondary cursor-pointer',
  disable: 'bg-gray text-navy ',
};

function Button({
  size = 'default',
  type = 'submit',
  disable = false,
  variant = 'default',
  children,
  ref,
  ...rest }: Props) {
  return (
    <button className={`${SIZE[size]} ${VARIANT[variant]}`} type={type} disabled={disable} {...rest} ref={ref}>
      {children}
    </button>
  );
}
export default Button;
