"use client";

import { useCrowdin } from "@rayo/localisation";
import { SectionHeader } from "@rayo/ui/components";
import { useMediaScroller } from "@rayo/ui/hooks";
import { cn } from "@rayo/ui/tailwind/utils/cn";

export const MediaScrollerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    scrollerRef,
    moveLeft,
    moveRight,
    mediaScrollerClass,
    canScroll,
    canScrollLeft,
    canScrollRight,
  } = useMediaScroller({ scrollFullWidth: true });
  const t = useCrowdin(["client-common"]);
  return (
    <section className="flex flex-col gap-2">
      <SectionHeader
        onLeftClick={moveLeft}
        onRightClick={moveRight}
        hideButtons={!canScroll}
        rightDisabled={!canScrollRight}
        leftDisabled={!canScrollLeft}
        variant="default"
        ariaLabelLeft={t("scroller-slide-left")}
        ariaLabelRight={t("scroller-slide-right")}
        className="px-4 lg:px-8"
      />
      <div
        ref={scrollerRef}
        className={cn(
          mediaScrollerClass,
          "no-scrollbar w-full max-w-[100vw] gap-4 px-4 pt-4 md:gap-10 lg:px-8",
        )}
      >
        {children}
      </div>
    </section>
  );
};
