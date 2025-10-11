'use client';

import { useIdleLogout } from '../hook/useIdleLogout';

function IdleHandler() {
  useIdleLogout();
  return null;
}
export default IdleHandler;
