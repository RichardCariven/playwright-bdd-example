import { cn } from "../../tailwind/utils/cn";
import { Button } from "../Button/Button";

interface SignUpBanner extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description: string;
  signInBtnText: string;
  signUpBtnText: string;
}

const SignUpBanner = ({
  heading,
  description,
  signInBtnText,
  signUpBtnText,
  className,
  ...props
}: SignUpBanner) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col justify-between rounded-full bg-primary px-8 py-2 lg:flex-row",
        className,
      )}
      {...props}
    >
      <div className="mb-2 text-center text-neutral-0 lg:mb-0 lg:text-left">
        <p className="text-neutral-invert heading-s-bold">{heading}</p>
        <p className="mt-1 hidden text-neutral-invert body-s-bold lg:block">
          {description}
        </p>
      </div>
      <div className="flex flex-row gap-2 self-center">
        <Button size="sm">{signUpBtnText}</Button>
        <Button variant="secondary" size="sm">
          {signInBtnText}
        </Button>
      </div>
    </div>
  );
};

export { SignUpBanner };
