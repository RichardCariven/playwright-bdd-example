import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";
import { Link, type LinkProps } from "../Link/Link";

const linkButtonVariants = cva(
  "ring-offset-background focus-visible:ring-ring visible-active:ring-primary-dark inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:shadow-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral text-neutral-light hover:shadow-lg focus:ring-primary focus-visible:shadow-lg active:ring-2 disabled:bg-neutral-darker disabled:text-neutral-dark",
        secondary:
          "text-neutral ring-2 ring-neutral-dark hover:shadow-lg focus:ring-offset-primary focus-visible:shadow-lg active:ring-0 active:ring-offset-2 disabled:text-neutral-darker disabled:ring-neutral-dark",
        text: "text-primary hover:underline focus-visible:text-primary-dark active:text-primary-dark active:underline disabled:text-primary-dark",
      },
      size: {
        sm: "px-4 py-2 action-s-semibold",
        md: "px-6 py-4 action-m-bold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof linkButtonVariants> {
  href: string;
}

const LinkButton = ({
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      {...props}
      className={cn(linkButtonVariants({ variant, size, className }))}
    >
      {children}
    </Link>
  );
};

LinkButton.displayName = undefined;

export { LinkButton, linkButtonVariants };
