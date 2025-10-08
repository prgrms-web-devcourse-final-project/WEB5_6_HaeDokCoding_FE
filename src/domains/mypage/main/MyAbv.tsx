'use client';
import Help from '@/shared/assets/icons/help_24.svg';
import ToolTip from '@/shared/components/tool-tip/ToolTip';
import useMedia from '../hook/useMedia';

function MyAbv({ abv }: { abv: number }) {
  const isMd = useMedia('(min-width:768px)');
  const position = isMd ? 'leftTop' : 'top';
  const viewPoint = isMd ? 'web' : 'mobileLongText';
  const fixedAbv = abv.toFixed(1);

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
        <span className="text-2xl md:text-4xl font-bold">{fixedAbv}</span>%
      </dd>
    </dl>
  );
}
export default MyAbv;
