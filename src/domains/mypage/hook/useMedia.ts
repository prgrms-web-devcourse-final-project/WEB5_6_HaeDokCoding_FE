'use client';
import { useEffect, useState } from 'react';

function useMedia(breakPoint: string) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(breakPoint);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakPoint]);

  return isMobile;
}
export default useMedia;
