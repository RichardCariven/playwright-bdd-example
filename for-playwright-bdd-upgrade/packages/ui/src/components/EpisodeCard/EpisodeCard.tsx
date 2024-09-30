import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";
import { PremiumIcon } from "../Icons/Premium";
import Image from "../Image/Image";
import { Link, type LinkProps } from "../Link/Link";
import { StationDisc } from "../StationDisc/StationDisc";
import { Tag } from "../Tag/Tag";

const episodeCardVariants = cva(
  "group grid grid-cols-[max-content_1fr] gap-3 rounded-lg p-2",
  {
    variants: {
      variant: {
        primary: "bg-neutral-invert",
        secondary: "secondary bg-neutral-light",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface EpisodeCardProps
  extends LinkProps,
    VariantProps<typeof episodeCardVariants> {
  title: string;
  imageSrc: string | [string, string, string, string];
  stationImageSrc: string;
  durationLabel: string;
  isPremium?: boolean;
  isLoading?: boolean;
}

const EpisodeCard = ({
  className,
  variant,
  title,
  imageSrc,
  stationImageSrc,
  durationLabel,
  isPremium,
  isLoading,
  ...props
}: EpisodeCardProps) => {
  if (isLoading) {
    return (
      <div
        className={cn(
          episodeCardVariants({ variant, className }),
          "animate-pulse bg-neutral-light",
        )}
      >
        <div className="size-[88px] animate-pulse rounded bg-neutral-dark" />
        <div className="grid grid-flow-row">
          <div className="grid gap-1">
            <div className="h-[20px] animate-pulse rounded bg-neutral-dark" />
            <div className="h-[20px] w-2/3 animate-pulse rounded bg-neutral-dark" />
          </div>
          <div className="right grid h-full auto-cols-max grid-flow-col items-end gap-2">
            <div className="size-5 animate-pulse rounded-full bg-neutral-dark" />
            <div className="size-5 w-[40px] animate-pulse rounded bg-neutral-dark" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <Link
      {...props}
      className="group rounded-lg hover:no-underline focus-visible:outline-primary active:no-underline"
    >
      <article className={cn(episodeCardVariants({ variant, className }))}>
        <div className="relative overflow-hidden rounded duration-300 ease-in-out group-hover:brightness-[.8] group-active:brightness-100">
          {!Array.isArray(imageSrc) && (
            <Image
              src={imageSrc}
              alt=""
              width={88}
              height={88}
              className="size-[88px] object-cover duration-300 ease-in-out group-hover:scale-125 group-active:scale-100"
            />
          )}
          {Array.isArray(imageSrc) && (
            <div className="grid size-[88px] grid-cols-2 duration-300 ease-in-out group-hover:scale-125 group-active:scale-100">
              {imageSrc.map((image) => (
                <Image
                  key={image}
                  src={image}
                  alt=""
                  width={44}
                  height={44}
                  className="size-[44px] object-cover"
                />
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-flow-row auto-rows-fr">
          <h2 className="center line-clamp-2 text-pretty text-neutral body-m-bold">
            {isPremium && (
              <span className="relative inline-block w-5">
                <PremiumIcon className="absolute -bottom-[6px] -left-1 size-6" />
              </span>
            )}
            {title}
          </h2>
          <div className="right grid h-full auto-cols-max grid-flow-col items-end gap-2">
            <StationDisc alt="" size="xs" imageSrc={stationImageSrc} />
            <Tag className="group-[.secondary]:bg-neutral-invert">
              {durationLabel}
            </Tag>
          </div>
        </div>
      </article>
    </Link>
  );
};

EpisodeCard.displayName = undefined;

export { EpisodeCard, episodeCardVariants };
