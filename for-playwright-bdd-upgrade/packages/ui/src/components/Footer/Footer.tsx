import { type ReactElement } from "react";

import { IconLinkButton, Link } from "../../components";
import Logo from "../Logos/Logo";

type FooterFollowUs = {
  followUsTitle: string;
  followUs: {
    title: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};

type FooterBase = {
  links: {
    title: string;
    href: string;
  }[];
  legal?: string | ReactElement;
};

// eslint-disable-next-line no-unused-vars
type AllOrNone<T> = T | { [K in keyof T]?: never };

export type FooterProps = FooterBase & AllOrNone<FooterFollowUs>;

const defaultBgSrc =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIxMzQ0IiB2aWV3Qm94PSIwIDAgMTQ0MCAxMzQ0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfNDkyOV8yNTEyNSkiPgo8ZyBvcGFjaXR5PSIwLjgiIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2ZfNDkyOV8yNTEyNSkiPgo8cGF0aCBkPSJNODgxLjEyNSA4NjIuODJMNTk5LjE5IDU0MS4wMDRMMzg0IDEwNzMuMDdMMTI2NC44NiA3MTguMzU5TDE0NjUuMjEgMTc3LjE5TDg4MS4xMjUgODYyLjgyWiIgZmlsbD0iIzg2MUFFRSIvPgo8cGF0aCBkPSJNMzg0IDEwNzMuMDdMNTk5LjE5IDEwMzcuNkgxMTM4LjM1SDEzMTguMDdMMTQ2NS4yMSAxNzcuMTlMMTI2NC44NiA3MTguMzU5TDM4NCAxMDczLjA3WiIgZmlsbD0iIzdGMUVFOCIvPgo8cGF0aCBkPSJNMTMxOC4wNyAxMDM3LjZIMTQ5Ny43OVYzMTUuOTExTDE0NjUuMjEgMTc3LjE5TDEzMTguMDcgMTAzNy42WiIgZmlsbD0iIzdGMUVFOCIvPgo8cGF0aCBkPSJNMTQ5Ny43OSAxMzlMODgxLjEyNSA4NjIuODJMMTQ2NS4yMSAxNzcuMTlMMTQ5Ny43OSAzMTUuOTExVjEzOVoiIGZpbGw9IiM4NjFBRUUiLz4KPC9nPgo8cGF0aCBkPSJNMTU0OS4zNSA2MDYuNDc4SDEzNDEuODZDMTM1Ny43NiA0NTUuNDQ1IDE0MDUgNDAzLjUxNSAxNDU4LjI3IDQwMy4wMTJDMTUyMS41NiA0MDIuNDA5IDE1NDkuMzUgNDg2LjYzNSAxNTQ5LjM1IDYwNi40NzhaTTEyNjUuOSA3NDkuOTIyQzEzMDguNjkgNzQ5LjkyMiAxMzMyLjU1IDY5NC44NzMgMTM0MS44NiA2MDYuNDc4SDExODguMzJDMTE5Ny4wMiA2OTkuMTk5IDEyMjAuNjYgNzQ5LjkyMiAxMjY1LjkgNzQ5LjkyMlpNMTAzNi4wNSAzMDguNjI0Qzk0NC44NjggMzA4LjYyNCA5MDUuODk1IDQ0My41ODggOTA1Ljg5NSA2MDYuNDc4SDExODguMzJDMTE2Ni4xOCAzNzAuMTI3IDEwOTcuMjMgMzA4LjYyNCAxMDM2LjA1IDMwOC42MjRaIiBmaWxsPSIjMTYwRTIxIi8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZl80OTI5XzI1MTI1IiB4PSIyNC43MTA4IiB5PSItMjIwLjI4OSIgd2lkdGg9IjE4MzIuMzciIGhlaWdodD0iMTY1Mi42NSIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxNzkuNjQ1IiByZXN1bHQ9ImVmZmVjdDFfZm9yZWdyb3VuZEJsdXJfNDkyOV8yNTEyNSIvPgo8L2ZpbHRlcj4KPGNsaXBQYXRoIGlkPSJjbGlwMF80OTI5XzI1MTI1Ij4KPHJlY3Qgd2lkdGg9IjE0NDAiIGhlaWdodD0iMTM0NCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";

export const Footer = (props: FooterProps) => {
  return (
    <footer
      className="relative w-full bg-neutral-1000 bg-[length:40rem] bg-[right_bottom_-8rem] bg-no-repeat px-8 py-12 md:bg-[right_20%] lg:bg-[length:70rem] lg:bg-[right_35%] lg:py-16"
      style={{
        backgroundImage: `url('${defaultBgSrc}')`,
      }}
    >
      <div className="mx-auto grid max-w-[900px] justify-items-center gap-8">
        <Link
          href="/"
          className="rounded outline-none outline-offset-8 focus-visible:outline-2 focus-visible:outline-primary"
        >
          <Logo className="h-auto w-32 fill-neutral-0 lg:w-64" mono />
        </Link>
        {props.followUs?.length && (
          <div className="grid justify-items-center gap-4">
            <p className="text-neutral-0 body-m-medium">
              {props.followUsTitle}
            </p>
            <div className="grid grid-flow-col gap-1 sm:gap-2">
              {props.followUs.map((item) => (
                <IconLinkButton
                  key={item.href}
                  title={item.title}
                  href="item.href"
                  target="_blank"
                  Icon={item.icon}
                  variant="unstyled"
                  className="[&>svg]:fill-neutral-0"
                  hardNav
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col flex-wrap items-center justify-center gap-5 md:flex-row">
          {props.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target="_blank"
              className="rounded text-purple-300 outline-none outline-offset-4 action-m-bold hover:text-purple-100 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
              hardNav
            >
              {item.title}
            </Link>
          ))}
        </div>
        {props.legal && (
          <p className="mt-2 text-center text-neutral-150 label-s-semibold">
            {props.legal}
          </p>
        )}
      </div>
    </footer>
  );
};
