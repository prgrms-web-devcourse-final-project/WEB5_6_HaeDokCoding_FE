'use client';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

export default function Portal({ children }: Props) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('modal-root');
    setTarget(el);
  }, []);

  if (!target) return null;
  return createPortal(children, target);
}
