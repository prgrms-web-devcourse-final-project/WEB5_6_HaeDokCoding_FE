'use client';

import Close from '@/shared/assets/icons/close_32.svg';
import Portal from './Portal';
import tw from '@/shared/utills/tw';
import { useEffect } from 'react';

interface Props {
  ref?: React.Ref<HTMLDivElement>;
  size?: 'sm' | 'md';
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  buttons?: React.ReactNode;
}

function ModalLayout({
  ref,
  size = 'md',
  open,
  onClose,
  title,
  description,
  children,
  buttons,
}: Props) {
  // ESC키 모달 닫기
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/80 flex-center " onClick={onClose} aria-hidden="true">
        <div
          className={tw(
            'relative w-[calc(100%-1.5rem)] p-8 rounded-lg bg-bg-pop shadow-[0_4px_9px_0_rgba(255,255,255,0.25)]',
            size === 'sm' && 'p-5 max-w-[18.75rem]',
            size === 'md' && 'max-w-[31.25rem]'
          )}
          ref={ref}
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={tw('flex items-center flex-col gap-2')}>
            {title && (
              <h1
                id="modal-title"
                className={tw('text-2xl font-bold text-white', size === 'sm' && 'text-xl')}
              >
                {title}
              </h1>
            )}
            {description && (
              <p id="modal-description" className="text-white">
                {description}
              </p>
            )}
          </div>

          {children && <div className="mt-5 py-2 text-white">{children}</div>}

          {buttons && (
            <div className={tw('flex justify-center gap-2 pt-8', size === 'sm' && 'pt-5')}>
              {buttons}
            </div>
          )}
          <button onClick={onClose} aria-label="팝업 닫기" className="absolute top-2 right-2">
            <Close aria-hidden className="w-8 h-8" />
          </button>
        </div>
      </div>
    </Portal>
  );
}
export default ModalLayout;
