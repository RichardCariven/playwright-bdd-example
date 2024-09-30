import { Link } from "@rayo/ui/components";
import { cn } from "@rayo/ui/tailwind/utils/cn";

export default function NavLinkButtonItem({
  href,
  target,
  label,
  className,
  Icon,
  IconHover,
}: {
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
  label: string;
  className?: string;
  Icon: React.ComponentType<{ className: string }>;
  IconHover?: React.ComponentType<{ className: string }>;
}) {
  return (
    <Link
      href={href}
      target={target}
      title={label}
      className={cn(
        "group grid size-8 grid-flow-col items-center justify-center gap-2 rounded-full ring-1 ring-neutral-dark xl:size-max xl:p-2 xl:ring-0",
        className,
      )}
    >
      <Icon
        className={cn(
          "size-4 fill-neutral xl:size-5 xl:fill-neutral-darker",
          IconHover && "group-hover:hidden",
        )}
      />
      {IconHover && (
        <IconHover className="hidden size-4 fill-neutral group-hover:block xl:size-5" />
      )}
      <span className="sr-only text-neutral-darker action-s-semibold group-hover:text-neutral xl:not-sr-only">
        {label}
      </span>
    </Link>
  );
}
