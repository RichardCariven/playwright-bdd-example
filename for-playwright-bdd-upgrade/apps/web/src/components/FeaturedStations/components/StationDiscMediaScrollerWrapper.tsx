"use client";

import { useCrowdin } from "@rayo/localisation";
import { SectionHeader } from "@rayo/ui/components";
import { useMediaScroller } from "@rayo/ui/hooks";
import { cn } from "@rayo/ui/tailwind/utils/cn";

export const MediaScrollerWrapper = ({
  children,
  heading,
  linkName,
}: {
  children: React.ReactNode;
  heading: string;
  linkName: string;
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
    <section className="content-wrapper mx-auto flex flex-col gap-6">
      <SectionHeader
        heading={heading}
        onLeftClick={moveLeft}
        onRightClick={moveRight}
        hideButtons={!canScroll}
        rightDisabled={!canScrollRight}
        leftDisabled={!canScrollLeft}
        variant="default"
        ariaLabelLeft={t("scroller-slide-left")}
        ariaLabelRight={t("scroller-slide-right")}
        className="content-wrapper-padding"
        link={{ href: "/stations" }}
        linkName={linkName}
      />
      <div className="content-wrapper-padding-scrim">
        <div
          ref={scrollerRef}
          className={cn(
            mediaScrollerClass,
            "no-scrollbar grid-rows-2 gap-x-4 gap-y-[18px] content-wrapper-padding md:gap-y-4 lg:gap-y-3",
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
};
