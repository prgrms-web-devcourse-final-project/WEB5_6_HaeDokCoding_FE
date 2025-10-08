'use client';
import Help from '@/shared/assets/icons/help_24.svg';
import ToolTip from '@/shared/components/tool-tip/ToolTip';
import useMedia from '../hook/useMedia';

function MyAbv({ abv }: { abv: number }) {
  const isMd = useMedia('(min-width:768px)');
  const position = isMd ? 'leftTop' : 'top';
  const viewPoint = isMd ? 'web' : 'mobileLongText';
  const fixedAbv = abv.toFixed(1);

  const t = Math.min(1, Math.max(0, abv / 100));

  // HEX → RGB
  const from = [255, 202, 141]; // FFCA8D
  const to = [250, 36, 36]; // FA2424

  // RGB
  const r = Math.round(from[0] + (to[0] - from[0]) * t);
  const g = Math.round(from[1] + (to[1] - from[1]) * t);
  const b = Math.round(from[2] + (to[2] - from[2]) * t);
  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <dl className="flex justify-between items-center text-gray-dark gap-2">
      <dt className="flex gap-1 items-center">
        <p className="text-base md:text-lg text-bold">나의 알콜 도수</p>

        <ToolTip
          message="알콜도수는 SSOUL 커뮤니티 활동을 종합해서 만든 활동 지표예요."
          viewPoint={viewPoint}
          position={position}
        >
          <Help />
        </ToolTip>
      </dt>
      <dd className="text-base">
        <span className="text-2xl md:text-4xl font-bold" style={{ color }}>
          {fixedAbv}
        </span>
        %
      </dd>
    </dl>
  );
}
export default MyAbv;
