import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../tailwind/utils/cn";

const paginationButtonVariant = cva("h-4 w-4 rounded-full", {
  variants: {
    variant: {
      default:
        "border-[1px] border-solid border-neutral-darker bg-neutral hover:bg-neutral-darker",
      active: "bg-neutral-invert hover:bg-neutral-invert",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof paginationButtonVariant> {
  onClick: () => void;
}

const PaginationButton = ({
  variant,
  className,
  ...props
}: PaginationButtonProps) => {
  return (
    <button
      className={cn(paginationButtonVariant({ variant }), className)}
      {...props}
    />
  );
};

export { PaginationButton };
