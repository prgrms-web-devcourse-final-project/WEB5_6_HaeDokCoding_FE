'use client';
import tw from '@/shared/utills/tw';
import { cva } from 'class-variance-authority';
import { Ref, useState } from 'react';

interface Props {
  position:
    | 'left'
    | 'leftTop'
    | 'top'
    | 'rightTop'
    | 'right'
    | 'leftBottom'
    | 'bottom'
    | 'rightBottom';
  viewPoint?: 'web' | 'mobile' | 'mobileLongText';

  message: string;
  children: React.ReactNode;
  ref?: Ref<HTMLDivElement | null>;
}
/* 화살표랑 물음표랑 정렬맞추기 탑은 더 위로 
카드 헤더 좀 더 내리기 좀 더 모으기
*/
export const ToolTipClass = cva(
  'text-white inline-block w-auto absolute rounded-lg p-2 bg-gray-dark filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] text-sm',
  {
    variants: {
      position: {
        left: `
          right-full top-1/2 -translate-y-1/2 mr-3
          after:content-[''] after:absolute after:top-1/2 after:left-full after:-translate-y-1/2
          after:border-y-8 after:border-l-10 after:border-transparent after:border-l-gray-dark
        `,
        top: `
          bottom-full left-1/2 -translate-x-1/2 mb-2
          after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
          after:border-8 after:border-transparent after:border-t-gray-dark`,

        right: `
          left-full top-1/2 -translate-y-1/2 ml-3
          after:content-[''] after:absolute after:top-1/2 after:right-full after:-translate-y-1/2
          after:border-y-8 after:border-r-10 after:border-transparent after:border-r-gray-dark
        `,
        bottom: `
          top-full left-1/2 -translate-x-1/2 mt-2
          after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2
          after:border-8 after:border-transparent after:border-b-gray-dark
        `,
        leftTop: `
          bottom-full right-0 mb-4
          after:content-[''] after:absolute after:top-full after:right-[8px] after:-mt-[1px]
          after:border-9 after:border-transparent after:border-t-gray-dark
        `,
        leftBottom: `
          top-full right-0 mt-4
          after:content-[''] after:absolute after:bottom-full after:right-[8px] after:-mb-[1px]
          after:border-9 after:border-transparent after:border-b-gray-dark
        `,
        rightTop: `
          bottom-full left-0 mb-4
          after:content-[''] after:absolute after:top-full after:left-[8px] after:-mt-[1px]
          after:border-9 after:border-transparent after:border-t-gray-dark
        `,
        rightBottom: `
          top-full left-0 mt-4
          after:content-[''] after:absolute after:bottom-full after:left-[8px] after:-mb-[1px]
          after:border-9 after:border-transparent after:border-b-gray-dark
        `,
      },
      viewPoint: {
        web: `whitespace-nowrap`,
        mobile: `w-auto max-w-[min(0,50rem)] whitespace-pre-line break-keep`,
        mobileLongText: `min-w-60 break-keep text-xs`,
      },
    },
  }
);

function ToolTip({ position, message, viewPoint = 'web', children, ref }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div
      className="relative w-fit"
      aria-expanded={isVisible}
      ref={ref}
      onMouseLeave={() => setIsVisible(false)}
      onMouseEnter={handleClick}
    >
      {children}
      {isVisible && (
        <span
          role="tooltip"
          aria-hidden={!isVisible}
          className={tw(ToolTipClass({ position, viewPoint }))}
        >
          {message}
        </span>
      )}
    </div>
  );
}
export default ToolTip;
