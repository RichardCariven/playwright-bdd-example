import React from "react";

import { cn } from "../../../tailwind/utils/cn";
import Label from "../Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  id: string;
  icon?: React.ReactElement;
  label: string;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, icon, label, description, errorMessage, ...props },
    ref,
  ) => {
    const errorID = `err-${props.id}`;
    const descID = `desc-${props.id}`;

    return (
      <div role="group">
        <Label htmlFor={props.id} label={label} required={props.required} />
        <div className="relative mt-2 bg-neutral-invert">
          {icon && (
            <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            type={type}
            data-testid={props.id}
            className={cn(
              "w-full rounded-md border-2 border-neutral-dark bg-neutral-invert px-3 py-4 text-neutral outline-none transition-colors body-m-medium placeholder:text-neutral-darker invalid:border-system-red hover:border-neutral focus-visible:border-neutral disabled:cursor-not-allowed disabled:border-neutral-dark disabled:opacity-50",
              { "border-system-red": errorMessage },
              className,
            )}
            ref={ref}
            aria-describedby={descID}
            aria-errormessage={errorID}
            {...props}
          />
        </div>
        {description && (
          <p id={descID} className="mt-2 text-neutral-darker label-s-semibold">
            {description}
          </p>
        )}
        {errorMessage ? (
          <p id={errorID} className="mt-2 text-system-red label-s-semibold">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
