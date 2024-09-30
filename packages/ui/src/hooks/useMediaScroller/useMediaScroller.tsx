import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

import { useScrollEnd } from "../useScrollEnd/useScrollEnd";

interface UseMediaScrollerProps {
  scrollFullWidth?: boolean;
  disableMouseDragging?: boolean;
}

export const useMediaScroller = ({
  scrollFullWidth,
  disableMouseDragging,
}: UseMediaScrollerProps = {}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !scrollerRef.current) return;

      scrollerRef.current.classList.add("pointer-events-none");
      scrollerRef.current.scrollLeft -= e.clientX - startX;
      setStartX(e.clientX);
    },
    [isDragging, startX],
  );

  const mouseDown = useCallback(
    (e: MouseEvent) => {
      if (!(e.target instanceof Element) || disableMouseDragging) {
        return;
      }

      if (!scrollerRef.current?.contains(e.target)) {
        return;
      }

      scrollerRef.current.classList.remove("snap-x", "snap-mandatory");
      setIsDragging(true);
      setStartX(e.clientX);
      e.preventDefault();
    },
    [disableMouseDragging],
  );

  const mouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      scrollerRef.current?.classList.remove("pointer-events-none");
    }
  }, [isDragging]);

  const handleScroll = ({
    direction,
    scrollFullWidth,
  }: {
    direction: "back" | "forward";
    scrollFullWidth?: boolean;
  }) => {
    if (!scrollerRef.current || !scrollerRef.current.firstElementChild) return;

    scrollerRef.current?.classList.add("snap-x", "snap-mandatory");

    if (scrollFullWidth) {
      const scrollWidth =
        scrollerRef.current.clientWidth -
        scrollerRef.current.firstElementChild.clientWidth * 0.6;

      scrollerRef.current?.scrollBy({
        left: direction === "back" ? -scrollWidth : scrollWidth,
        behavior: "smooth",
      });
    } else {
      // Half a child elements width to trigger scroll snapping going forward
      // When going back, this wasn't enough to trigger the next snapping point
      // Going forward by the full amount fron the initial position skipped too far ahead and snapped on the 3rd child
      const scrollWidth = scrollerRef.current.firstElementChild.clientWidth;

      scrollerRef.current?.scrollBy({
        left: direction === "back" ? -scrollWidth : scrollWidth / 2,
        behavior: "smooth",
      });
    }
  };

  // function to show and hide buttons based on number of slides visible, start position, end potision, etc.
  const checkForOverflow = useCallback(() => {
    if (!scrollerRef.current) {
      return;
    }

    if (scrollerRef.current.clientWidth < scrollerRef.current.scrollWidth) {
      if (!canScroll) setCanScroll(true);
    } else {
      if (canScroll) setCanScroll(false);
    }
  }, [canScroll]);

  const checkScrollEdges = useCallback(() => {
    if (!scrollerRef.current || isDragging) {
      return;
    }

    setCanScrollLeft(scrollerRef.current.scrollLeft !== 0);
    setCanScrollRight(
      scrollerRef.current.scrollLeft + scrollerRef.current.clientWidth !==
        scrollerRef.current.scrollWidth,
    );
  }, [isDragging]);

  useEventListener("mousedown", mouseDown);
  useEventListener("mouseup", mouseUp);
  useEventListener("mousemove", mouseMove);
  useScrollEnd(checkScrollEdges, scrollerRef);
  useEventListener("resize", checkForOverflow);

  useLayoutEffect(() => {
    if (isDragging) return;

    checkForOverflow();
    checkScrollEdges();
  }, [isDragging, checkForOverflow, checkScrollEdges]);

  return {
    moveLeft: useCallback(
      () => handleScroll({ direction: "back", scrollFullWidth }),
      [scrollFullWidth],
    ),
    moveRight: useCallback(
      () => handleScroll({ direction: "forward", scrollFullWidth }),
      [scrollFullWidth],
    ),
    scrollerRef,
    canScroll,
    canScrollLeft,
    canScrollRight,
    isDragging,
    mediaScrollerClass:
      "grid snap-x snap-mandatory auto-cols-min grid-flow-col overflow-x-auto overscroll-x-contain",
  };
};
