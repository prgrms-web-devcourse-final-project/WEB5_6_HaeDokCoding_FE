import { useEffect } from 'react';

type Props = {
  menuRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
};

function useCloseOutside({ menuRef, onClose }: Props) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, onClose]);
}

export default useCloseOutside;
