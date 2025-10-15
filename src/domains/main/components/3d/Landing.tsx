'use client';

import HomeModel from './HomeModel';
import HomeLogo from './HomeLogo';
import HomeText from './HomeText';
import Scroll from './Scroll';
import { useEffect, useState } from 'react';
import ModelImage from './ModelImage';

interface Props {
  setIsLoading: (value: boolean) => void;
  isDesktop: boolean;
}

function Landing({ setIsLoading, isDesktop }: Props) {
  const [modelLoaded, setModelLoaded] = useState(false);
  useEffect(() => {
    if (modelLoaded) setIsLoading(false);
  }, [modelLoaded, setIsLoading]);
  return (
    <>
      <div className="page-layout max-w-full">
        <div className="relative w-full h-screen">
          {isDesktop ? (
            <HomeModel onLoaded={() => setModelLoaded(true)} />
          ) : (
            <ModelImage onLoaded={() => setModelLoaded(true)} />
          )}
          {modelLoaded && (
            <>
              <HomeLogo isDesktop={isDesktop} />
              <HomeText isDesktop={isDesktop} />
              <Scroll isDesktop={isDesktop} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
