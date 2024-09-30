"use client";

import { Children, type ReactElement } from "react";

import { useMediaScroller } from "../../hooks";
import { cn } from "../../tailwind/utils/cn";
import { EpisodeCard } from "../EpisodeCard/EpisodeCard";
import { IconButton } from "../IconButton/IconButton";
import { IconLinkButton } from "../IconLinkButton/IconLinkButton";
import { ChevronLeft } from "../Icons/ChevronLeft";
import { ChevronRight } from "../Icons/ChevronRight";
import { type LinkProps } from "../Link/Link";

const defaultBgSrc =
  'data:image/svg+xml,<svg width="1160" height="374" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23a)"><path fill="%23DEDCE0" d="M0-36h1160v448H0z"/><path opacity=".2" d="M1394 615.853H492.401c69.104-668.75 274.378-898.689 505.828-900.916C1273.24-287.736 1394 85.206 1394 615.853ZM162.359 1251c185.912 0 289.599-243.75 330.042-635.147h-667.154C-136.985 1026.41-34.253 1251 162.359 1251Zm-998.79-1954C-1232.65-703-1402-105.402-1402 615.853h1227.247C-270.989-430.676-570.588-703-836.431-703Z" fill="%236E6678"/></g><defs><clipPath id="a"><path fill="%23fff" transform="translate(0 -36)" d="M0 0h1160v448H0z"/></clipPath></defs></svg>';

export interface CollectionCardProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  title: string;
  titleLink?: Pick<LinkProps, "locale" | "href">;
  children:
    | ReactElement<typeof EpisodeCard>
    | ReactElement<typeof EpisodeCard>[];
  bgSrc?: string;
  bgLayerSrc?: string;
  ariaLoadingText: string;
  ariaMoveLeft: string;
  ariaMoveRight: string;
  isSkeleton?: boolean;
}

const CollectionCard = ({
  className,
  title,
  titleLink,
  bgSrc,
  bgLayerSrc,
  isSkeleton,
  ariaLoadingText,
  ariaMoveLeft,
  ariaMoveRight,
  children,
  ...props
}: CollectionCardProps) => {
  const {
    scrollerRef,
    moveLeft,
    moveRight,
    mediaScrollerClass,
    canScroll,
    canScrollLeft,
    canScrollRight,
  } = useMediaScroller();

  const Skeleton = () => (
    <>
      <div className="grid auto-cols-auto grid-flow-col p-6 md:px-20 xl:px-10">
        <div className="h-[40px] w-1/2 animate-pulse rounded bg-neutral-dark xl:h-[60px]" />
        <h1 className="sr-only">{ariaLoadingText}</h1>
      </div>
      <div className="grid auto-cols-[minmax(280px,300px)] grid-flow-col items-end gap-3 overflow-hidden px-6 md:px-20 xl:px-10">
        <EpisodeCardLoading />
        <EpisodeCardLoading />
        <EpisodeCardLoading />
      </div>
    </>
  );

  return (
    <article
      className={cn(
        "relative z-10 grid h-[375px] w-full grid-flow-row auto-rows-auto bg-cover bg-center pb-6 xl:w-[1280px] xl:rounded-2xl",
        { className, "animate-pulse bg-neutral-light bg-none": isSkeleton },
      )}
      style={{
        backgroundImage: isSkeleton
          ? undefined
          : `url('${bgSrc || defaultBgSrc}')`,
      }}
      aria-busy={isSkeleton}
      {...props}
    >
      {isSkeleton ? (
        <Skeleton />
      ) : (
        <>
          <div className="grid auto-cols-auto grid-flow-col place-content-between gap-6 p-6 md:px-20 xl:px-10">
            <h1 className="line-clamp-4 text-pretty text-neutral-1000 heading-l-bold xl:line-clamp-3 xl:heading-xl-bold">
              {title}
            </h1>
            {titleLink && (
              <IconLinkButton
                className="bg-neutral-1000 [&>svg]:fill-neutral-0"
                Icon={ChevronRight}
                title={title}
                href={titleLink.href}
              />
            )}
          </div>
          <section
            ref={scrollerRef}
            className={cn(
              mediaScrollerClass,
              "no-scrollbar grid auto-cols-[minmax(280px,300px)] grid-flow-col items-end gap-3 px-6 pb-[2px] md:px-20 xl:px-10 [&_article]:snap-center",
              {
                "auto-cols-[minmax(auto,300px)] overflow-visible":
                  Children.count(children) === 1,
              },
            )}
          >
            {children}
          </section>
          <div
            className={cn("invisible absolute bottom-6 z-10 w-full", {
              "xl:visible": canScroll,
            })}
          >
            <IconButton
              Icon={ChevronLeft}
              className="absolute bottom-9 left-10"
              aria-label={ariaMoveLeft}
              size="sm"
              variant="secondary"
              onClick={moveLeft}
              disabled={!canScrollLeft}
            />
            <IconButton
              Icon={ChevronRight}
              className="absolute bottom-9 right-10"
              aria-label={ariaMoveRight}
              size="sm"
              variant="secondary"
              onClick={moveRight}
              disabled={!canScrollRight}
            />
          </div>
          {bgLayerSrc && (
            <div
              className="absolute bottom-0 -z-10 h-3/4 w-full bg-contain bg-[right_2rem_top] bg-no-repeat md:bg-center xl:h-5/6 xl:rounded-2xl xl:bg-[right_20%_top]"
              style={{
                backgroundImage: `url('${bgLayerSrc}')`,
              }}
            />
          )}
        </>
      )}
    </article>
  );
};

const EpisodeCardLoading = () => (
  <EpisodeCard
    isLoading
    href=""
    title=""
    imageSrc=""
    stationImageSrc=""
    durationLabel=""
  />
);

export { CollectionCard };
