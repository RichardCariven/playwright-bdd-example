import { useCallback, useState } from "react";
import { useEventListener, useInterval } from "usehooks-ts";

import { useMediaScroller } from "../useMediaScroller/useMediaScroller";
import { useScrollEnd } from "../useScrollEnd/useScrollEnd";

// Required props for autoplay
interface AutoPlayProps {
  duration: number;
  totalSlides: number;
}

interface UseHeroCarouselScrollerProps {
  autoPlay?: AutoPlayProps;
  disableMouseDragging?: boolean;
}

export const useHeroCarouselScroller = ({
  autoPlay,
  disableMouseDragging,
}: UseHeroCarouselScrollerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState<number | null>(
    autoPlay?.duration ?? null,
  );
  const { scrollerRef, mediaScrollerClass } = useMediaScroller({
    disableMouseDragging,
  });

  const { duration, totalSlides } = autoPlay || {
    duration: null,
    totalSlides: 0,
  };

  const goToSlide = useCallback(
    (index: number) => {
      if (!scrollerRef.current || !scrollerRef.current.firstElementChild)
        return;

      const scrollWidth = scrollerRef.current.firstElementChild.clientWidth;

      scrollerRef.current.scrollTo({
        left: scrollWidth * index,
        behavior: "smooth",
      });

      setCurrentSlide(index);
    },
    [scrollerRef],
  );

  const moveToNextSlide = useCallback(() => {
    const nextSlide = (currentSlide + 1) % totalSlides;
    goToSlide(nextSlide);
    setCurrentSlide(nextSlide);
  }, [currentSlide, goToSlide, totalSlides]);

  const pauseAutoPlay = useCallback(() => {
    // setting intervalDuration to null clears the interval
    setIntervalDuration(null);
  }, []);

  const resumeAutoPlay = useCallback(() => {
    if (duration) {
      setIntervalDuration(duration);
    }
  }, [duration]);

  const updateScrollerSlideIndex = useCallback(() => {
    if (!scrollerRef.current) {
      return;
    }

    const currentIndex = Math.round(
      (scrollerRef.current.scrollLeft || 0) /
        (scrollerRef.current.firstElementChild?.clientWidth || 1),
    );

    setCurrentSlide(currentIndex);
  }, [scrollerRef]);

  useScrollEnd(updateScrollerSlideIndex, scrollerRef);
  useEventListener("mouseenter", pauseAutoPlay, scrollerRef);
  useEventListener("mouseleave", resumeAutoPlay, scrollerRef);
  useInterval(moveToNextSlide, intervalDuration);

  return {
    scrollerRef,
    currentSlide,
    mediaScrollerClass,
    goToSlide,
  };
};
