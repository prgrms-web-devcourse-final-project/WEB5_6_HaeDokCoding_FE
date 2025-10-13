'use client';

import { useState } from 'react';
import HomeModel from './HomeModel';
import StarMain from './StarMain';
import Spinner from '@/shared/components/spinner/Spinner';

function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="page-layout max-w-full">
        <div className="relative w-full h-[1000px]">
          <HomeModel onLoaded={() => setIsLoading(false)} />
          {!isLoading && <StarMain />}
        </div>
      </div>
    </>
  );
}

export default Landing;
