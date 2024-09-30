"use client";

import React from "react";

import { cn } from "../../tailwind/utils/cn";
import { IconButton } from "../IconButton/IconButton";
import { ChevronLeft } from "../Icons/ChevronLeft";
import { ChevronRight } from "../Icons/ChevronRight";
import Image from "../Image/Image";
import { Link, type LinkProps } from "../Link/Link";

interface BaseSectionHeaderProps {
  heading?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  hideButtons?: boolean;
  isSkeleton?: boolean;
  className?: string;
  ariaLabelLeft: string;
  ariaLabelRight: string;
}

interface DefaultVariantProps extends BaseSectionHeaderProps {
  variant: "default";
  linkName?: string;
  link?: LinkProps;
}

interface WithImageVariantProps extends BaseSectionHeaderProps {
  variant: "withImage";
  subHeading: string;
  imgAlt: string;
  imgSrc: string;
}

export type SectionHeaderProps = DefaultVariantProps | WithImageVariantProps;

const DefaultHeader = ({ heading }: Pick<DefaultVariantProps, "heading">) => {
  return (
    <h2 className="mr-auto text-neutral heading-m-bold lg:heading-l-bold">
      {heading}
    </h2>
  );
};

const WithImageHeader = ({
  heading,
  subHeading,
  imgAlt,
  imgSrc,
}: Pick<
  WithImageVariantProps,
  "heading" | "subHeading" | "imgAlt" | "imgSrc"
>) => {
  return (
    <div className="mr-auto flex items-center gap-4 overflow-hidden">
      <div className="flex-shrink-0 overflow-hidden rounded">
        <Image width={42} height={42} alt={imgAlt || ""} src={imgSrc || ""} />
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="body-s-medium">{subHeading}</p>
        <h2 className="body-m-bold">{heading}</h2>
      </div>
    </div>
  );
};

const Header = ({ ...props }: SectionHeaderProps) => {
  const isDefault = props.variant === "default";
  return (
    <>
      {isDefault ? (
        <DefaultHeader heading={props.heading} />
      ) : (
        <WithImageHeader
          heading={props.heading}
          subHeading={props.subHeading}
          imgSrc={props.imgSrc}
          imgAlt={props.imgAlt}
        />
      )}
    </>
  );
};

export const SectionHeader = ({ ...props }: SectionHeaderProps) => {
  const isDefault = props.variant === "default";
  const {
    heading,
    onLeftClick,
    onRightClick,
    leftDisabled,
    rightDisabled,
    hideButtons,
    isSkeleton,
    ariaLabelLeft,
    ariaLabelRight,
    className,
  } = props;

  if (isSkeleton) {
    return (
      <div className="flex w-full items-center gap-4">
        {isDefault ? (
          <div className="mr-auto h-8 w-full max-w-lg animate-pulse rounded bg-neutral-dark" />
        ) : (
          <div className="mr-auto flex items-center gap-4">
            <div className="size-[2.625rem] animate-pulse rounded bg-neutral-dark" />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-28 animate-pulse rounded bg-neutral-dark" />
              <div className="h-5 w-20 animate-pulse rounded bg-neutral-dark" />
            </div>
          </div>
        )}
        {isDefault && (
          <div className="h-5 w-11 animate-pulse rounded bg-neutral-dark" />
        )}
        <div className="hidden gap-2 sm:flex">
          <div className="size-8 animate-pulse rounded-full bg-neutral-dark" />
          <div className="size-8 animate-pulse rounded-full bg-neutral-dark" />
        </div>
      </div>
    );
  }

  const handleLeftClick = () => {
    onLeftClick && onLeftClick();
  };

  const handleRightClick = () => {
    onRightClick && onRightClick();
  };

  return (
    <header className={cn("flex w-full items-center gap-4", className)}>
      {heading && <Header {...props} />}
      {isDefault && props.link && (
        <Link
          href={props.link.href}
          className="text-end text-primary action-m-bold first:ml-auto"
        >
          {props.linkName}
        </Link>
      )}
      {!hideButtons && (
        <div className="hidden gap-2 first:ml-auto sm:flex">
          <IconButton
            aria-label={ariaLabelLeft}
            Icon={ChevronLeft}
            onClick={handleLeftClick}
            variant="secondary"
            size="sm"
            disabled={leftDisabled}
          />
          <IconButton
            aria-label={ariaLabelRight}
            Icon={ChevronRight}
            onClick={handleRightClick}
            variant="secondary"
            size="sm"
            disabled={rightDisabled}
          />
        </div>
      )}
    </header>
  );
};
