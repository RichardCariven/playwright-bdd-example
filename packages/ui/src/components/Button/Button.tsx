import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../tailwind/utils/cn";
import Loader from "../Icons/Loader";

const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring visible-active:ring-primary-dark inline-flex items-center justify-center whitespace-nowrap rounded-full outline-none ring-inset transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-primary active:shadow-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral text-neutral-light hover:shadow-lg focus:ring-primary focus-visible:shadow-lg active:ring-2 disabled:bg-neutral-darker disabled:text-neutral-dark",
        secondary:
          "bg-neutral-invert text-neutral ring-2 ring-neutral-dark hover:shadow-lg focus:ring-offset-primary focus-visible:shadow-lg active:ring-0 active:ring-offset-2 disabled:text-neutral-darker disabled:ring-neutral-dark",
        text: "text-primary hover:underline focus-visible:text-primary-dark active:text-primary-dark active:underline disabled:text-primary-dark",
      },
      size: {
        sm: "h-[32px] px-4 action-s-semibold",
        md: "h-[48px] px-6 action-m-bold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading,
      disabled,
      children,
      loadingText,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader
            aria-label={loadingText}
            className="absolute h-4 w-4 animate-spin fill-secondary-pink"
          />
        )}
        <span className={cn(isLoading && "opacity-0")}>{children}</span>
      </Comp>
    );
  },
);
Button.displayName = undefined;

export { Button, buttonVariants };
