import { cn } from "@rayo/ui/tailwind/utils/cn";

export default function NavButtonItem({
  label,
  className,
  Icon,
  IconHover,
  onClick,
}: {
  label: string;
  className?: string;
  Icon: React.ComponentType<{ className: string }>;
  IconHover?: React.ComponentType<{ className: string }>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
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
    </button>
  );
}
