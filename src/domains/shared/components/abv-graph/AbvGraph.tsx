import clsx from 'clsx';

interface Props {
  max: number;
  abv: number;
}

function AbvGraph({ max, abv }: Props) {
  const safeMax = Math.max(0, max || 0.0001);
  const rawPct = (abv / safeMax) * 100;
  const pct = Math.min(100, Math.max(0, Number.isFinite(rawPct) ? rawPct : 0));

  const bandClass = clsx(
    'h-full rounded-full transition-[width] duration-500',
    'bg-gradient-to-r from-amber-300 to-red-500', // 기본 그라데이션
    pct >= 80 && 'shadow-[0_0_12px_rgba(250,36,36,0.45)]'
  );

  return (
    <div
      className="w-45 h-3 rounded-full overflow-hidden border-[0.5px] border-gray relative"
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
