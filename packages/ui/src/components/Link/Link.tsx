import NextLink, { type LinkProps as NextLinkProps } from "next/link";

export interface LinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof NextLinkProps
    >,
    NextLinkProps {
  href: string;
  hardNav?: boolean;
}

function Link({ hardNav, ...props }: LinkProps) {
  if (hardNav) {
    return <a {...props}></a>;
  }

  return <NextLink {...props} />;
}

export { Link };
