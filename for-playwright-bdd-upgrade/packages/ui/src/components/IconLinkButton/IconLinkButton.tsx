import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";
import { Link, type LinkProps } from "../Link/Link";

const iconLinkButtonVariants = cva(
  "ring-offset-background focus-visible:ring-ring visible-active:ring-primary-dark inline-flex items-center justify-center rounded-full outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-primary active:shadow-none",
  {
    variants: {
      variant: {
        primary:
          "bg-neutral focus:ring-primary focus-visible:shadow-lg active:ring-2 disabled:bg-neutral-darker [&:disabled>svg]:fill-neutral-dark [&>svg]:fill-neutral-invert",
        secondary:
          "bg-neutral-invert ring-1 ring-neutral-dark focus:ring-offset-primary focus-visible:shadow-lg active:ring-0 active:ring-offset-2 disabled:ring-neutral-dark [&:disabled>svg]:fill-neutral-dark [&>svg]:fill-neutral",
        unstyled:
          "bg-none hover:shadow-none focus-visible:shadow-none [&>svg]:fill-neutral",
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

export interface IconLinkButtonProps
  extends LinkProps,
    VariantProps<typeof iconLinkButtonVariants> {
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const IconLinkButton = ({
  className,
  variant,
  size,
  Icon,
  ...props
}: IconLinkButtonProps) => {
  return (
    <Link
      {...props}
      className={cn(iconLinkButtonVariants({ variant, size }), className)}
    >
      <Icon />
    </Link>
  );
};

IconLinkButton.displayName = undefined;

export { IconLinkButton, iconLinkButtonVariants };
