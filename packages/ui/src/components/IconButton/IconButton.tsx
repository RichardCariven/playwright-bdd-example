import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";

const iconButtonVariants = cva(
  "ring-offset-background focus-visible:ring-ring visible-active:ring-primary-dark inline-flex items-center justify-center rounded-full outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-primary active:shadow-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral focus:ring-primary focus-visible:shadow-lg active:ring-2 disabled:bg-neutral-darker [&:disabled>svg]:fill-neutral-dark [&>svg]:fill-neutral-invert",
        secondary:
          "bg-neutral-invert ring-1 ring-neutral-dark focus:ring-offset-primary focus-visible:shadow-lg active:ring-0 active:ring-offset-2 disabled:ring-neutral-dark [&:disabled>svg]:fill-neutral-dark [&>svg]:fill-neutral",
      },
      size: {
        xs: "size-6 hover:shadow-lg [&>svg]:size-3",
        sm: "size-8 hover:shadow-md [&>svg]:size-4",
        md: "size-12 hover:shadow-lg [&>svg]:size-6",
        lg: "size-14 hover:shadow-sm [&>svg]:size-[26px]",
        xl: "size-16 hover:shadow-md [&>svg]:size-[30px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label">,
    VariantProps<typeof iconButtonVariants> {
  isLoading?: boolean;
  "aria-label": string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, isLoading, disabled, Icon, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        <Icon />
      </button>
    );
  },
);
IconButton.displayName = undefined;

export { IconButton, iconButtonVariants };
