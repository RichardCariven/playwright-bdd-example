import { cn } from "../../tailwind/utils/cn";
import { DiscBase } from "./DiscBase";
import { DiscSkeleton } from "./DiscSkeleton";

export interface DiscProps extends React.ButtonHTMLAttributes<HTMLElement> {
  isSkeleton?: boolean;
  imageSrc: string;
  title: string;
  handleClick?: (..._ags: unknown[]) => unknown;
}

export function Disc({
  isSkeleton,
  imageSrc,
  title,
  handleClick,
  className,
  disabled,
  ...props
}: DiscProps) {
  if (isSkeleton) {
    return <DiscSkeleton className={className} />;
  }

  return (
    <button
      onClick={handleClick}
      className={cn("group flex flex-col items-center outline-none", className)}
      disabled={disabled}
      {...props}
    >
      <DiscBase imageSrc={imageSrc} title={title} />
    </button>
  );
}
