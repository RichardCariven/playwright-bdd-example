import { cn } from "@rayo/ui/tailwind/utils/cn";

export const MainHeading = ({
  loading,
  heading,
  subHeading,
}: {
  loading?: boolean;
  heading: string;
  subHeading: string;
}) => {
  return (
    <>
      <h1
        className={cn("text-neutral heading-m-bold", {
          "h-[1.625rem] w-56 animate-pulse rounded bg-neutral-dark": loading,
        })}
        aria-live="polite"
      >
        {!loading && heading}
      </h1>
      <p
        className={cn("text-neutral-darker body-m-medium", {
          "h-[1.375rem] w-64 animate-pulse rounded bg-neutral-dark": loading,
        })}
        aria-live="polite"
      >
        {!loading && subHeading}
      </p>
    </>
  );
};
