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
  } = useMediaScroller();
  const t = useCrowdin(["client-common"]);
  return (
    <section className="content-wrapper mx-auto flex flex-col gap-6">
      <SectionHeader
        heading={t("shows-on-air")}
        onLeftClick={moveLeft}
        onRightClick={moveRight}
        hideButtons={!canScroll}
        rightDisabled={!canScrollRight}
        leftDisabled={!canScrollLeft}
        variant="default"
        ariaLabelLeft={t("scroller-slide-left")}
        ariaLabelRight={t("scroller-slide-right")}
        className="content-wrapper-padding"
      />
      <div className="content-wrapper-padding-scrim">
        <div
          ref={scrollerRef}
          className={cn(
            mediaScrollerClass,
            "no-scrollbar gap-6 content-wrapper-padding",
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
