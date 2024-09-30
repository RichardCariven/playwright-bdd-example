import { ChevronDown } from "@rayo/ui/icons/ChevronDown";
import { cn } from "@rayo/ui/tailwind/utils/cn";
import { MenuButton } from "@reach/menu-button";

export default function NavProfileButton({
  label,
  ariaLabel,
  className,
  Icon,
  IconHover,
}: {
  label: string;
  ariaLabel: string;
  className?: string;
  Icon: React.ComponentType<{ className: string }>;
  IconHover?: React.ComponentType<{ className: string }>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <MenuButton
      title={label}
      aria-label={ariaLabel}
      data-testid="profile-menu"
      className={cn(
        "group grid size-8 grid-flow-col items-center justify-center gap-2 rounded-full ring-1 ring-neutral-dark xl:size-max xl:p-2 xl:ring-0",
        className,
      )}
    >
      <Icon
        className={cn(
          "size-4 fill-neutral group-[.isExpanded]:hidden xl:size-5 xl:fill-neutral-darker",
          IconHover && "group-hover:hidden",
        )}
      />
      {IconHover && (
        <IconHover className="hidden size-4 fill-neutral group-hover:block group-[.isExpanded]:block xl:size-5" />
      )}
      <span
        aria-hidden="true"
        className="hidden text-neutral-darker action-s-semibold group-hover:text-neutral group-[.isExpanded]:text-neutral xl:block xl:overflow-hidden xl:text-ellipsis xl:whitespace-nowrap"
      >
        {label}
      </span>
      <ChevronDown className="hidden size-4 fill-neutral-darker group-hover:fill-neutral group-[.isExpanded]:fill-neutral xl:block" />
    </MenuButton>
  );
}
