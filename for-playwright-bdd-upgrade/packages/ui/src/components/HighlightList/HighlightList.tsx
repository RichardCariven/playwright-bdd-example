import { cn } from "../../tailwind/utils/cn";

interface HighlightListProps extends React.HTMLAttributes<HTMLDListElement> {}

interface HighlightListItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle: string;
}

export function HighlightList({ className, ...props }: HighlightListProps) {
  return <dl className={cn(className)} {...props} />;
}

export function HighlightListItem({
  Icon,
  title,
  subtitle,
}: HighlightListItemProps) {
  return (
    <div className="flex gap-3">
      <Icon className="size-6 flex-shrink-0 fill-primary" />
      <div>
        <dt className="text-neutral body-m-bold">{title}</dt>
        <dd className="mt-1 text-neutral-darker body-s-medium">{subtitle}</dd>
      </div>
    </div>
  );
}
