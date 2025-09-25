import { Ref } from 'react';

interface Props {
  size?: 'default' | 'sm';
  type?: 'button' | 'submit';
  ref?: Ref<HTMLButtonElement | null>;
  children: React.ReactNode;
  className?: string;
}

const SIZE = {
  default: 'text-base flex flex-col justfy-center',
  sm: 'text-sm flex flex-col justfy-center',
};

function TextButton({
  type = 'button',
  children,
  className,
  ref,
  size = 'default',
  ...rest
}: Props) {
  return (
    <button className={`${SIZE[size]} ${className}`} type={type} ref={ref} {...rest}>
      {children}
      <div className="h-[1px] w-100% bg-white"></div>
    </button>
  );
}
export default TextButton;
