import { cn } from "../../tailwind/utils/cn";
import { TickLine } from "../Icons/Tick";
import Image from "../Image/Image";

export interface OnBoardDiscProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  loading?: boolean;
  imageSrc: string;
  title: string;
}

/**
 * TODO: Controlled input state if it requires setting checked from external store, e.g. subscriptions API
 */

export function OnboardingDisc({
  id,
  loading,
  imageSrc,
  title,
  className,
  defaultChecked,
  disabled,
  ...props
}: OnBoardDiscProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center",
        {
          "animate-pulse": loading,
        },
        className,
      )}
    >
      <input
        className="peer appearance-none"
        type="checkbox"
        id={id}
        checked={defaultChecked}
        name={id}
        disabled={disabled}
        {...props}
      />
      <label
        className={cn("group relative flex flex-col items-center", {
          "cursor-pointer": !loading && !disabled,
        })}
        htmlFor={id}
      >
        <div className={cn("peer-checked:group-[]:animate-selected")}>
          <span
            className={cn(
              "absolute -right-1 -top-1 flex h-[34px] w-[34px] scale-0 items-center justify-center rounded-full bg-primary opacity-0 transition-all duration-200 ease-out-back peer-checked:group-[]:scale-100 peer-checked:group-[]:opacity-100 peer-checked:group-[]:delay-200",
            )}
          >
            <TickLine
              className={cn(
                "h-5 w-5 text-neutral-invert peer-checked:group-[]:animate-fill",
                {},
              )}
            />
          </span>
          <div
            className={cn(
              "h-24 w-24 overflow-hidden rounded-full shadow-none ring-0 ring-primary ring-offset-0 ring-offset-neutral-invert transition-all duration-200 hover:shadow-sm peer-checked:group-[]:ring-4 peer-checked:group-[]:ring-offset-2 peer-checked:group-[]:delay-200 peer-focus-visible:group-[]:shadow-focus",
              {
                "bg-neutral-dark": loading,
              },
            )}
          >
            {!loading && <Image width={96} height={96} src={imageSrc} alt="" />}
          </div>
        </div>
        <div
          className={cn(`text-neutral body-s-semibold`, {
            "mt-3 h-[14px] w-[70px] rounded-[4px] bg-neutral-dark": loading,
            "mt-2 w-24 text-center": !loading,
          })}
        >
          {!loading && title}
        </div>
      </label>
    </div>
  );
}
