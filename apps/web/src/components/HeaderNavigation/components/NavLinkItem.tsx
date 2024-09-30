"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@rayo/ui/tailwind/utils/cn";

export default function NavLinkItem({
  label,
  href,
  Icon,
  IconHover,
  mobile,
}: {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className: string }>;
  IconHover: React.ComponentType<{ className: string }>;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <div className={cn("grid justify-end", !mobile && "xl:auto-cols-max")}>
      <Link
        className="group grid grid-flow-col items-center justify-end gap-2 rounded-full p-2"
        href={href}
      >
        <Icon
          className={cn(
            "size-6 fill-neutral-darker group-hover:hidden",
            !mobile && "xl:size-5",
            active && "hidden",
          )}
        />
        <IconHover
          className={cn(
            "hidden size-6 fill-neutral group-hover:block",
            !mobile && "xl:size-5",
            active && "block",
          )}
        />
        <span
          className={cn(
            "text-neutral-darker heading-m-bold group-hover:text-neutral",
            !mobile && "xl:action-s-semibold",
            active && "text-neutral",
          )}
        >
          {label}
        </span>
      </Link>
    </div>
  );
}
