"use client";

import { Children } from "react";

import { PaginationButton } from "@rayo/ui/components";
import { useHeroCarouselScroller } from "@rayo/ui/hooks";
import { cn } from "@rayo/ui/tailwind/utils/cn";

export const HeroCarouselScrollerWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const slidesArray = Children.toArray(children);

  const { scrollerRef, mediaScrollerClass, currentSlide, goToSlide } =
    useHeroCarouselScroller({
      disableMouseDragging: true,
      autoPlay: {
        duration: 5000,
        totalSlides: slidesArray.length,
      },
    });

  return (
    <section className="content-wrapper relative z-0 mx-auto mb-10 scroll-px-0 px-0 lg:mb-20 lg:content-wrapper-padding">
      <div
        ref={scrollerRef}
        className={cn(
          mediaScrollerClass,
          "no-scrollbar grid w-full auto-cols-[90%] gap-6 content-wrapper-padding lg:scroll-px-0 lg:auto-cols-[100%] lg:px-0",
        )}
      >
        {children}
        {slidesArray.length > 1 && (
          <div className="absolute bottom-3 left-2/4 z-10 hidden -translate-x-2/4 gap-2 md:flex">
            {slidesArray.map((_, index) => (
              <PaginationButton
                key={index}
                onClick={() => goToSlide(index)}
                variant={index === currentSlide ? "active" : "default"}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
