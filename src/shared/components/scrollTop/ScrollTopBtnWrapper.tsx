'use client';

import { usePathname } from 'next/navigation';
import ScrollTopBtn from './ScrollTopBtn';

function ScrollTopBtnWrapper() {
  const pathname = usePathname();
  const showScroll = pathname !== '/recommend';

  return showScroll ? <ScrollTopBtn /> : null;
}
export default ScrollTopBtnWrapper;
