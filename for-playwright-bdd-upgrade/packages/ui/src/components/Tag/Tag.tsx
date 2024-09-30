import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";
import { BroadcastFilledIcon } from "../Icons/Broadcast";

const tagVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-neutral label-s-semibold [&>svg]:size-3",
  {
    variants: {
      variant: {
        grey: "bg-neutral-light",
        white: "bg-neutral-invert",
        transparent:
          "p-0 text-neutral-darker [&>svg]:size-4 [&>svg]:fill-neutral-darker",
        "on-air":
          "bg-aqua-500 text-neutral-1000 [&>svg]:size-4 [&>svg]:fill-neutral-1000",
      },
    },
    defaultVariants: {
      variant: "grey",
    },
  },
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
}

function Tag({ className, variant, children, Icon, ...props }: TagProps) {
  if (props.isLoading) {
    return (
      <div
        className={cn(
          "h-5 w-16 animate-pulse rounded-full bg-neutral-dark",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      {variant === "on-air" ? (
        <BroadcastFilledIcon className="mr-1" />
      ) : Icon ? (
        <Icon className="mr-1 fill-neutral" />
      ) : null}
      {children}
    </div>
  );
}

export { Tag, tagVariants };
