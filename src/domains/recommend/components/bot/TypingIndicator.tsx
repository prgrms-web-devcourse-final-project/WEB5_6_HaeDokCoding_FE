import Image from 'next/image';
import shaker from '@/shared/assets/images/shaker.png';

function TypingIndicator() {
  return (
    <div className="relative flex items-center w-fittext-black">
      <p className="inline-block animate-fade-in">준비 중…</p>
      <div className="relative w-10 h-10 animate-shake">
        <Image
          src={shaker}
          alt=""
          width={40}
          height={40}
          className="object-contain"
          priority
          aria-hidden
        />
      </div>
    </div>
  );
}
export default TypingIndicator;
