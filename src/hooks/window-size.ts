import { useEffect, useState } from 'react';

export default () => {
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });

  const windowResizeHandler = () => {
    setWindowSize({
      x: window.innerWidth,
      y: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', windowResizeHandler);

    return () => { window.removeEventListener('resize', windowResizeHandler); };
  }, []);

  return windowSize;
};
