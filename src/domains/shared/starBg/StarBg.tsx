import Star from '@/shared/assets/images/star_bg.webp';

interface Props {
  className: string;
  children?: React.ReactNode;
}

function StarBg({ className, children }: Props) {
  return (
    <div
      className={`w-full bg-repeat ${className}`}
      style={{
        backgroundImage: `url(${Star.src})`,
      }}
    >
      {children}
    </div>
  );
}
export default StarBg;
