import { cn } from "../../tailwind/utils/cn";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
}

export default function Label({
  label,
  className,
  required,
  ...props
}: LabelProps) {
  return (
    <label className={cn("text-neutral body-m-bold", className)} {...props}>
      {label}
      {required && <span className="text-system-red">*</span>}
    </label>
  );
}
