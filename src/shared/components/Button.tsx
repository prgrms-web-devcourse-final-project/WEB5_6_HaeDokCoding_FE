import { ButtonHTMLAttributes, Ref } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'sm';
  variant?: 'default' | 'purple' | 'disable';
  children: string;
  ref?: Ref<HTMLButtonElement | null>;
}

const SIZE = {
  default: 'py-1 px-2 h-10 rounded-lg text-base font-bold min-w-25 cursor-pointer flex-center',
  sm: 'py-1 px-2 rounded-lg text-base font-bold min-w-20 cursor-pointer flex-center',
};

const VARIANT = {
  default: 'bg-secondary',
  purple: 'bg-tertiary text-bold text-secondary',
  disable: 'bg-gray',
};

function Button({ size = 'default', variant = 'default', children, ref, ...rest }: Props) {
  return (
    <button className={`${SIZE[size]} ${VARIANT[variant]}`} {...rest} ref={ref}>
      {children}
    </button>
  );
}
export default Button;
