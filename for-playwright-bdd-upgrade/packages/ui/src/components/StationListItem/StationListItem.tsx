import React from "react";

import { cn } from "../../tailwind/utils/cn";
import { ChevronRight } from "../Icons/ChevronRight";
import { Link, type LinkProps } from "../Link/Link";
import { StationDisc } from "../StationDisc/StationDisc";

export interface DiscListItemProps extends LinkProps {
  imgAlt: string;
  imageSrc: string;
  title: string;
  description: string;
  isSkeleton?: boolean;
}

export const StationListItem = ({
  imgAlt,
  href,
  imageSrc,
  title,
  description,
  isSkeleton,
  className,
  ...props
}: DiscListItemProps) => {
  if (isSkeleton) {
    return (
      <div className="group pointer-events-none flex w-full min-w-80 max-w-sm">
        <div className="flex w-full items-center">
          <div className="mr-3">
            <div className="size-20 animate-pulse rounded-full bg-neutral-dark" />
          </div>
          <div className="mr-auto flex flex-col gap-2 overflow-hidden">
            <div className={"h-4 w-20 animate-pulse rounded bg-neutral-dark"} />
            <div className={"h-2 w-40 animate-pulse rounded bg-neutral-dark"} />
          </div>
          <div className="mr-4 size-4 shrink-0 animate-pulse rounded-full bg-neutral-dark px-2"></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex w-[312px] hover:no-underline focus-visible:outline-primary active:no-underline md:w-[376px]",
        className,
      )}
      {...props}
    >
      <article className="flex w-full items-center">
        <div className="mr-3">
          <StationDisc
            state="idle"
            size="list"
            alt={imgAlt}
            imageSrc={imageSrc}
            imgClassName="transition-all duration-200 group-hover:scale-125 group-hover:brightness-[0.8] group-active:scale-100 group-active:brightness-100"
          />
        </div>
        <div className="mr-auto flex flex-col gap-2 overflow-hidden">
          <h2 className="truncate text-neutral body-s-bold">{title}</h2>
          <p className="truncate text-neutral-darker label-s-semibold">
            {description}
          </p>
        </div>
        <div className="shrink-0 px-2">
          <ChevronRight className="size-6 fill-neutral" />
        </div>
      </article>
    </Link>
  );
};
