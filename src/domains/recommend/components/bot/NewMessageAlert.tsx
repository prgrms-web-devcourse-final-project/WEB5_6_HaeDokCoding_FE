'use client';
import Down from '@/shared/assets/icons/selectDown_24.svg';

interface Props {
  onClick: () => void;
}

function NewMessageAlert({ onClick }: Props) {
  return (
    <button
      className="absolute left-1/2 bottom-[90px] -translate-x-1/2 flex-center gap-1 
           bg-white text-primary rounded-full px-2 py-1 shadow-[0_2px_4px_rgba(255,255,255,0.3)] 
           hover:bg-tertiary hover:text-white active:bg-tertiary active:text-white
           transition-colors duration-200 ease-in-out"
      onClick={onClick}
      aria-label="새 메시지로 이동"
    >
      <span className="text-sm">새 메시지</span>
      <Down className="w-6 h-6 text-inherit" />
    </button>
  );
}
export default NewMessageAlert;
