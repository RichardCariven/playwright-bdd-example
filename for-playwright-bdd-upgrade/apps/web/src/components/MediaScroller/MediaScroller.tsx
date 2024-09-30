"use client";

/*
 * This is a placeholder component to be used as demonstration purposes
 * */
import { useMediaScroller } from "@rayo/ui/hooks";
import { cn } from "@rayo/ui/tailwind/utils/cn";

interface MediaScrollerProps {
  children: React.ReactNode[];
}

export function MediaScroller({ children }: MediaScrollerProps) {
  const {
    isDragging,
    scrollerRef,
    moveLeft,
    moveRight,
    mediaScrollerClass,
    canScroll,
    canScrollLeft,
    canScrollRight,
  } = useMediaScroller();

  return (
    <div>
      <h1 className="heading-l-bold">Placeholder component: DO NOT USE</h1>
      <p className="body-m-bold">Dragging: {isDragging ? "true" : "false"}</p>
      <div className={cn({ hidden: !canScroll })}>
        <button
          className="mr-4 rounded-full bg-primary-light px-4 py-2 disabled:opacity-40"
          onClick={moveLeft}
          disabled={!canScrollLeft}
        >
          Left
        </button>
        <button
          className="rounded-full bg-primary-light px-4 py-2 disabled:opacity-40"
          onClick={moveRight}
          disabled={!canScrollRight}
        >
          Right
        </button>
      </div>
      <section
        ref={scrollerRef}
        className={cn(mediaScrollerClass, "no-scrollbar w-screen gap-10 p-10")}
      >
        {children}
      </section>
    </div>
  );
}
