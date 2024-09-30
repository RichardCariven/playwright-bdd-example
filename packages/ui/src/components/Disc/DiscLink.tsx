import { cn } from "../../tailwind/utils/cn";
import { Link, type LinkProps } from "../Link/Link";
import { DiscBase } from "./DiscBase";
import { DiscSkeleton } from "./DiscSkeleton";

export interface DiscLinkProps extends LinkProps {
  isSkeleton?: boolean;
  imageSrc: string;
  title: string;
}

export function DiscLink({
  isSkeleton,
  imageSrc,
  title,
  className,
  ...props
}: DiscLinkProps) {
  if (isSkeleton) {
    return <DiscSkeleton className={className} />;
  }

  return (
    <Link
      className={cn("group flex flex-col items-center outline-none", className)}
      {...props}
    >
      <DiscBase imageSrc={imageSrc} title={title} />
    </Link>
  );
}
