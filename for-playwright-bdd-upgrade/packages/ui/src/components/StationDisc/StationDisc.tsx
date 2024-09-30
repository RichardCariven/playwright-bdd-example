import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";

const discVariants = cva(
  "relative overflow-hidden rounded-full transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-none",
        hero: "size-28 shadow-disc md:size-[8.625rem]",
      },
      size: {
        xs: "size-5",
        sm: "size-8",
        md: "size-12",
        lg: "size-16",
        xl: "size-24",
        list: "size-20",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

const imageSize = {
  xs: 20,
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
  hero: 138,
  list: 80,
};

function interpolate({
  value,
  maxLength,
}: {
  value: number;
  maxLength: number;
}) {
  const circumference = Number((2 * Math.PI * 48).toFixed(1));
  const newValue = ((value - maxLength) * circumference) / -maxLength;
  return { newValue, circumference };
}

export interface StationDiscProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof discVariants> {
  loading?: boolean;
  imageSrc: string;
  alt: string;
  className?: string;
  state?: "buffering" | "playing" | "idle" | "loading";
  audioLength?: number;
  audioPosition?: number;
  imgClassName?: string;
}

export function StationDisc({
  imageSrc,
  size,
  className,
  alt,
  variant,
  state = "idle",
  audioLength = 0,
  audioPosition = 0,
  imgClassName,
  ...props
}: StationDiscProps) {
  const isBuffering = state === "buffering";
  const isPlaying = state === "playing";
  const isLoading = state === "loading";
  const isHeroDisc = variant === "hero";
  const _imageSize = isHeroDisc ? imageSize[variant] : imageSize[size || "md"];

  const { newValue: strokePosition, circumference } = interpolate({
    value: audioPosition ?? 0,
    maxLength: audioLength ?? 0,
  });
  const strokeDashoffset = isBuffering ? 250 : strokePosition;
  const showBorder = isHeroDisc && (isBuffering || isPlaying);

  return (
    <div className="relative">
      <div
        className={cn(
          discVariants({ size, variant }),
          {
            "animate-pulse bg-neutral-dark shadow-none": isLoading,
            "border-4 border-neutral-0": showBorder,
          },
          className,
        )}
        {...props}
      >
        {!isLoading && (
          <>
            <Image
              width={_imageSize}
              height={_imageSize}
              src={imageSrc}
              alt={alt}
              className={imgClassName}
            />
          </>
        )}
      </div>

      {showBorder && (
        <div
          className={cn(
            "absolute left-0 top-0 z-10 w-full -rotate-90 text-pink-500",
          )}
        >
          <svg
            viewBox="0 0 100 100"
            className={cn({
              "animate-spin": isBuffering,
            })}
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              strokeDashoffset={strokeDashoffset}
              strokeDasharray={circumference}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
