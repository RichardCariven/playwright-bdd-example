import { cn } from "../../tailwind/utils/cn";
import Edit from "../Icons/Edit";
import { DiscSkeleton } from "./DiscSkeleton";

interface DiscProps extends React.ButtonHTMLAttributes<HTMLElement> {
  title: string;
  isSkeleton?: boolean;
  handleClick?: (..._ags: unknown[]) => unknown;
}

export function EditDisc({
  title,
  isSkeleton,
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
      className={cn(
        "group relative flex flex-col items-center outline-none",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <div className="flex size-[80px] items-center justify-center overflow-hidden rounded-full bg-primary-light/40 shadow-none outline-none transition-all duration-200 hover:shadow-sm group-focus-visible:shadow-focus md:size-[140px]">
        <Edit className="size-6 fill-neutral md:size-10" />
      </div>
      <div className="mt-2 text-neutral body-s-semibold">{title}</div>
    </button>
  );
}
