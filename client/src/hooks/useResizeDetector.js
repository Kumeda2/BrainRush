import { useEffect, useState } from "react";

const useResizeDetector = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {isMobile, width};
};

export default useResizeDetector;
