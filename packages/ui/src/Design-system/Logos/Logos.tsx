import { type ReactElement } from "react";

import DefaultLogo from "../../components/Logos/Logo";

function Logo({ title, children }: { title: string; children: ReactElement }) {
  return (
    <div className="flex flex-col items-center p-5">
      <div className="mb-2 p-4">{children}</div>
      <div className="text-center text-neutral">{title}</div>
    </div>
  );
}

export default function Logos() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-3 gap-4 [&>*:nth-child(odd)]:bg-neutral-light">
        <Logo title="Logo">
          <DefaultLogo />
        </Logo>
        <Logo title="Logo Mono Colour">
          <DefaultLogo className="fill-neutral" mono />
        </Logo>
      </div>
    </div>
  );
}
