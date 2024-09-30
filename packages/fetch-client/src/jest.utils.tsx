import React, { type PropsWithChildren, type ReactElement } from "react";
import { SWRConfig } from "swr";

export function SwrWrapper({ children }: PropsWithChildren): ReactElement {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
  );
}
