import { useEffect } from 'react';

type Props = {
  menuRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

function useCloseOutside({ menuRef, onClose }: Props) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef, onClose]);
}

export default useCloseOutside;
