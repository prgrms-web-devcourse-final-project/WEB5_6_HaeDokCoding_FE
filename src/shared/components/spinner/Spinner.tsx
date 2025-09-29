'use client';

import Lottie from 'lottie-react';
import spinner from '@/shared/assets/lottie/loading.json';

function Spinner() {
  const style = {
    width: 130,
    height: 130,
  };

  return (
    <div
      className="page-layout max-w-full flex justify-center items-center"
      role="status"
      aria-label="페이지를 불러오는 중입니다"
    >
      <Lottie animationData={spinner} style={style} aria-hidden loop={true} />
    </div>
  );
}

export default Spinner;
