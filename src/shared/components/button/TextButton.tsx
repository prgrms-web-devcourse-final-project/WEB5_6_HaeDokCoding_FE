import clsx from 'clsx';
import { Ref } from 'react';

interface Props {
  size?: 'default' | 'sm';
  type?: 'button' | 'submit';
  ref?: Ref<HTMLButtonElement | null>;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SIZE = {
  default:
    'text-base flex flex-col justfy-center duration-200 border-b-1 border-gray hover:border-white hover:text-white',
  sm: 'text-sm flex flex-col justfy-center duration-200 border-b-1 border-gray hover:border-white hover:text-whites',
};

function TextButton({
  type = 'button',
  children,
  className,
  onClick,
  ref,
  size = 'default',
  ...rest
}: Props) {
  return (
    <button
      className={clsx(`text-gray hover:text-white,${SIZE[size]} ${className}`)}
      type={type}
      ref={ref}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default TextButton;
