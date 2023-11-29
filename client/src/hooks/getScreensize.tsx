import { useCallback, useEffect, useState } from 'react';

// Define your enum
export enum ScreenSizeEnum {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

// Define your breakpoints
enum Breakpoints {
  xs = 320,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280
}

const useGetScreensize = () => {
  const [screenSize, setScreenSize] = useState<string | undefined>();

  const getScreenSize = useCallback((width: number) => {
    if (width < Breakpoints.xs) {
      return ScreenSizeEnum.XS;
    }
    if (width < Breakpoints.sm) {
      return ScreenSizeEnum.SM;
    }
    if (width < Breakpoints.md) {
      return ScreenSizeEnum.MD;
    }
    if (width < Breakpoints.lg) {
      return ScreenSizeEnum.LG;
    }
    return ScreenSizeEnum.XL;
  }, []);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenSize(getScreenSize(newWidth));
    };

    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [getScreenSize]);

  return screenSize;
};

export default useGetScreensize;
