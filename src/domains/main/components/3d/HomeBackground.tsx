import { useEffect, useRef } from 'react';

function HomeBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const percentage = 6 + x * 70;
      if (bgRef.current) {
        bgRef.current.style.background = `linear-gradient(128deg, rgba(26, 26, 26, 0.7) ${percentage}%, rgba(42, 42, 42, 0.3) ${percentage + 10}%, rgba(60, 70, 78, 0) 100%)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="absolute inset-0 z-1 top-0 left-0 transition-all duration-100 will-change-auto"
    />
  );
}

export default HomeBackground;
