import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

// Custom hook to handle scroll end detection with a fallback for browsers without native scrollend support.
export const useScrollEnd = (
  scrollEndCb: () => void,
  elementRef: React.RefObject<HTMLElement>,
  delay: number = 200,
) => {
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [supportsScrollEnd, setSupportsScrollEnd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSupportsScrollEnd("onscrollend" in window);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      scrollEndCb();
    }, delay); // Delay to simulate scrollend
  }, [scrollEndCb, delay]);

  useEventListener(
    supportsScrollEnd ? "scrollend" : "scroll",
    supportsScrollEnd ? scrollEndCb : handleScroll,
    elementRef,
  );
};
