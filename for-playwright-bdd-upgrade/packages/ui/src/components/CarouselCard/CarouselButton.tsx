import { cn } from "../../tailwind/utils/cn";
import { Button, type ButtonProps } from "../Button/Button";
import { type LinkProps } from "../Link/Link";
import { LinkButton, type LinkButtonProps } from "../LinkButton/LinkButton";

export type CarouselButtonProps =
  | ({
      type: "link";
      variant?: LinkButtonProps["variant"];
      label: string;
    } & LinkProps)
  | ({
      type: "button";
      variant?: ButtonProps["variant"];
      label: string;
    } & ButtonProps);

function CarouselButton({ ...props }: CarouselButtonProps) {
  if (props.type === "button") {
    return (
      <Button {...props} onClick={props.onClick}>
        {props.label}
      </Button>
    );
  }

  return (
    <LinkButton
      {...props}
      className={cn("ring-0", props.className, {
        "bg-neutral-invert": props.variant === "secondary",
      })}
    >
      {props.label}
    </LinkButton>
  );
}

export { CarouselButton };
