import Ssury1 from '@/shared/assets/ssury/ssury_level1.webp';
import Ssury2 from '@/shared/assets/ssury/ssury_level2.webp';
import Ssury3 from '@/shared/assets/ssury/ssury_level3.webp';
import Ssury4 from '@/shared/assets/ssury/ssury_level4.webp';
import Ssury5 from '@/shared/assets/ssury/ssury_level5.webp';
import Ssury6 from '@/shared/assets/ssury/ssury_level6.webp';
import  { StaticImageData } from 'next/image';

const SSURY_MAP: Record<number, StaticImageData> = {
  1: Ssury1,
  2: Ssury2,
  3: Ssury3,
  4: Ssury4,
  5: Ssury5,
  6: Ssury6,
};

function useProfileSsury(level: number) {
  const src = SSURY_MAP[level] ?? Ssury1;
  return src;
}
export default useProfileSsury;
