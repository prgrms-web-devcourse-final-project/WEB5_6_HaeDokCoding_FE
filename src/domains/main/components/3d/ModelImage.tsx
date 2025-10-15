import { useEffect } from 'react';

interface Props {
  onLoaded: () => void;
}

function ModelImage({ onLoaded }: Props) {
  useEffect(() => {
    onLoaded();
  });
  return <div className="w-full"></div>;
}

export default ModelImage;
