import { cn } from "../../tailwind/utils/cn";

export const DiscSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "group flex animate-pulse flex-col items-center outline-none",
        className,
      )}
    >
      <div className="relative aspect-square w-[80px] overflow-hidden rounded-full bg-neutral-dark shadow-none transition-all duration-200 hover:shadow-sm group-focus-visible:shadow-focus md:w-[140px]" />
      <div className="mt-3 h-[14px] w-[70px] rounded-[4px] bg-neutral-dark" />
    </div>
  );
};
