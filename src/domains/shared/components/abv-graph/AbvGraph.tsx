import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

interface Props {
  max?: number;
  abv?: number;
  type?: 'myAbv' | 'cocktail';
}

export const abvClass = cva(
  `h-3 rounded-full overflow-hidden border-[0.5px] border-gray relative`,
  {
    variants: {
      type: {
        myAbv: 'w-full md:w-55 ',
        cocktail: 'w-45',
      },
    },
  }
);

function AbvGraph({ max, abv, type = 'cocktail' }: Props) {
  if (!abv) return;
  const safeMax = Math.max(0, max || 0.0001);
  const rawPct = (abv / safeMax) * 100;
  const pct = Math.min(100, Math.max(0, Number.isFinite(rawPct) ? rawPct : 0));

  const bandClass = clsx(
    'h-full rounded-full transition-[width] duration-500',
    'bg-gradient-to-r from-[#FFCA8D] to-[#FA2424]', // 기본 그라데이션
    pct >= 80 && 'shadow-[0_0_12px_rgba(250,36,36,0.45)]'
  );

  return (
    <div
      className={tw(abvClass({ type }))}
      role="progressbar"
      aria-label="나의 알코올 도수"
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={bandClass} style={{ width: `${pct}%` }}></div>
    </div>
  );
}
export default AbvGraph;
